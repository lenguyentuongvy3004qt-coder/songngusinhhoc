import fs from 'fs';
import { removeVietnameseTones, matchesSearchQuery } from '../src/utils/text.js';
import { calculateSm2, getTermsDueForReview, getWeakTerms } from '../src/services/spacedRepetition.js';

console.log('🧪 BẮT ĐẦU KIỂM THỬ TOÀN DIỆN DỰ ÁN BIOCELL 10...\n');

let passCount = 0;
let failCount = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ [PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`  ❌ [FAIL] ${testName}`);
    failCount++;
  }
}

// 1. KIỂM THỬ DỮ LIỆU CHƯƠNG & THUẬT NGỮ
console.log('--- 1. Kiểm thử Cấu trúc Dữ liệu ---');
const chapters = JSON.parse(fs.readFileSync('src/data/chapters.json', 'utf8'));
const terms = JSON.parse(fs.readFileSync('src/data/terms.json', 'utf8'));

assert(chapters.length === 6, 'Có chính xác 6 chương SGK 2026');
assert(terms.length === 179, 'Tổng số thuật ngữ đạt chính xác 179 từ');

// Kiểm tra tính liên tục của STT
let sttIsContinuous = true;
for (let i = 0; i < terms.length; i++) {
  if (terms[i].stt !== i + 1) {
    sttIsContinuous = false;
    break;
  }
}
assert(sttIsContinuous, 'STT được đánh số liên tục từ 1 đến 179 không bị ngắt quãng');

// Kiểm tra đầy đủ các trường bắt buộc
let allFieldsValid = true;
terms.forEach(t => {
  if (!t.en || !t.vi || !t.ipa_bre || !t.note || !t.example_en || !t.example_vi) {
    allFieldsValid = false;
  }
});
assert(allFieldsValid, 'Tất cả 179 thuật ngữ đều có đầy đủ Tiếng Anh, Tiếng Việt, IPA BrE, Ghi chú và Ví dụ song ngữ');

// 2. KIỂM THỬ TÌM KIẾM TỨC THÌ (SEARCH ALGORITHM)
console.log('\n--- 2. Kiểm thử Thuật toán Tìm kiếm Song ngữ Không Dấu ---');
const mitoTerm = terms.find(t => t.en === 'Mitochondrion');

assert(matchesSearchQuery(mitoTerm, 'ti the'), 'Tìm kiếm không dấu "ti the" khớp chính xác với "Ti thể"');
assert(matchesSearchQuery(mitoTerm, 'TI THE'), 'Tìm kiếm chữ hoa "TI THE" khớp với "Ti thể"');
assert(matchesSearchQuery(mitoTerm, 'mitochondria'), 'Tìm kiếm biến thể "mitochondria" khớp nhờ alt_forms');
assert(matchesSearchQuery(mitoTerm, mitoTerm.stt.toString()), `Tìm kiếm theo STT "${mitoTerm.stt}" khớp chính xác với Ti thể`);
assert(!matchesSearchQuery(mitoTerm, 'chloroplast'), 'Từ khóa không liên quan trả về false chính xác');

// 3. KIỂM THỬ THUẬT TOÁN SPACED REPETITION (SM-2)
console.log('\n--- 3. Kiểm thử Thuật toán Lặp lại Ngắt quãng SM-2 ---');
const itemInitial = { easeFactor: 2.5, interval: 0, repetitions: 0, correctCount: 0, incorrectCount: 0 };

const resAgain = calculateSm2(itemInitial, 'again');
assert(resAgain.interval === 1 && resAgain.repetitions === 0 && resAgain.status === 'learning', 'Đánh giá "Quên (Again)" đặt lại repetitions = 0 và interval = 1 ngày');

const resGood1 = calculateSm2(itemInitial, 'good');
assert(resGood1.interval === 1 && resGood1.repetitions === 1, 'Đánh giá "Tốt (Good)" lần đầu đặt interval = 1 ngày');

const resGood2 = calculateSm2(resGood1, 'good');
assert(resGood2.interval === 2 && resGood2.repetitions === 2, 'Đánh giá "Tốt (Good)" lần hai đặt interval = 2 ngày');

const resGood3 = calculateSm2(resGood2, 'good');
assert(resGood3.interval >= 5 && resGood3.repetitions === 3 && resGood3.status === 'mastered', 'Đánh giá "Tốt (Good)" lần 3 đạt trạng thái "Đã thuộc (Mastered)"');

// 4. KIỂM THỬ LỌC TỪ YẾU VÀ TỪ CẦN ÔN
console.log('\n--- 4. Kiểm thử Lọc Từ Yếu (Weak Terms) ---');
const mockProgress = {
  1: { incorrectCount: 3, correctCount: 1 },
  2: { incorrectCount: 0, correctCount: 5 },
  3: { incorrectCount: 2, correctCount: 2 }
};
const weak = getWeakTerms(terms.slice(0, 5), mockProgress);
assert(weak.length === 2, 'Lọc chính xác 2 từ yếu có số lần sai >= 2');

console.log(`\n========================================`);
console.log(`KẾT QUẢ KIỂM THỬ: ${passCount} PASSED, ${failCount} FAILED`);
if (failCount === 0) {
  console.log('🎉 TOÀN BỘ CÁC BÀI TEST ĐÃ ĐẠT CHUẨN XUẤT SẮC!');
} else {
  process.exit(1);
}
