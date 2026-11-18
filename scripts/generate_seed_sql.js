import fs from 'fs';

const chapters = JSON.parse(fs.readFileSync('src/data/chapters.json', 'utf8'));
const terms = JSON.parse(fs.readFileSync('src/data/terms.json', 'utf8'));

let sql = `-- ==========================================
-- SEED DATA: 6 CHƯƠNG & 179 THUẬT NGỮ SINH HỌC 10 (SGK 2026)
-- PHẦN I: SINH HỌC TẾ BÀO & VI SINH VẬT
-- ==========================================

-- 1. Chèn danh sách 6 Chương
INSERT INTO public.chapters (id, chapter_number, title_vi, title_en, description, stt_range, icon_name, total_terms)
VALUES
`;

sql += chapters.map(c => {
  const desc = c.description.replace(/'/g, "''");
  return `  (${c.id}, ${c.chapter_number}, '${c.title_vi}', '${c.title_en}', '${desc}', '${c.stt_range}', '${c.icon}', ${c.total_terms})`;
}).join(',\n') + '\nON CONFLICT (chapter_number) DO UPDATE SET\n  title_vi = EXCLUDED.title_vi,\n  title_en = EXCLUDED.title_en,\n  description = EXCLUDED.description,\n  total_terms = EXCLUDED.total_terms;\n\n';

sql += `-- 2. Chèn 179 Thuật ngữ Sinh học\nINSERT INTO public.terms (stt, chapter_id, vi, en, ipa_bre, note, example_en, example_vi, alt_forms)\nVALUES\n`;

sql += terms.map(t => {
  const vi = t.vi.replace(/'/g, "''");
  const en = t.en.replace(/'/g, "''");
  const ipa = t.ipa_bre.replace(/'/g, "''");
  const note = (t.note || '').replace(/'/g, "''");
  const ex_en = (t.example_en || '').replace(/'/g, "''");
  const ex_vi = (t.example_vi || '').replace(/'/g, "''");
  const alt = JSON.stringify(t.alt_forms || []).replace(/'/g, "''");
  return `  (${t.stt}, ${t.chapter_id}, '${vi}', '${en}', '${ipa}', '${note}', '${ex_en}', '${ex_vi}', '${alt}'::jsonb)`;
}).join(',\n') + '\nON CONFLICT (stt) DO UPDATE SET\n  vi = EXCLUDED.vi,\n  en = EXCLUDED.en,\n  ipa_bre = EXCLUDED.ipa_bre,\n  note = EXCLUDED.note,\n  example_en = EXCLUDED.example_en,\n  example_vi = EXCLUDED.example_vi,\n  alt_forms = EXCLUDED.alt_forms;\n';

fs.mkdirSync('supabase', { recursive: true });
fs.writeFileSync('supabase/seed.sql', sql, 'utf8');
console.log('Generated supabase/seed.sql successfully.');
