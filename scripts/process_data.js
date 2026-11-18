import fs from 'fs';
import path from 'path';

const rawDataText = fs.readFileSync('raw_terms.json', 'utf8').replace(/^\uFEFF/, '');
const rawData = JSON.parse(rawDataText);

// 6 Chapters definition
const CHAPTERS = [
  {
    id: 1,
    chapter_number: 1,
    title_vi: "Thành phần hóa học của tế bào",
    title_en: "Chemical Composition of the Cell",
    stt_range: "1–32",
    description: "Các nguyên tố hóa học, nước, chất hữu cơ (carbohydrate, lipid, protein, acid nucleic) và các chất vô cơ trong tế bào.",
    icon: "Atom",
    total_terms: 32
  },
  {
    id: 2,
    chapter_number: 2,
    title_vi: "Cấu trúc tế bào",
    title_en: "Cell Structure",
    stt_range: "33–59",
    description: "Tế bào nhân sơ, nhân thực, màng sinh chất và hệ thống các bào quan (nhân, ti thể, lục lạp, ribosome, lưới nội chất, bộ máy Golgi).",
    icon: "Layers",
    total_terms: 27
  },
  {
    id: 3,
    chapter_number: 3,
    title_vi: "Trao đổi chất qua màng & truyền tin tế bào",
    title_en: "Membrane Transport & Cell Signaling",
    stt_range: "60–83",
    description: "Vận chuyển thụ động, vận chuyển chủ động, xuất - nhập bào và cơ chế truyền tin giữa các tế bào.",
    icon: "ArrowLeftRight",
    total_terms: 24
  },
  {
    id: 4,
    chapter_number: 4,
    title_vi: "Chuyển hóa năng lượng trong tế bào",
    title_en: "Energy Metabolism in the Cell",
    stt_range: "84–110",
    description: "Năng lượng sinh học, phân tử ATP, enzyme xúc tác, quang hợp và hô hấp tế bào (đường phân, chu trình Krebs, chuỗi chuyền electron).",
    icon: "Zap",
    total_terms: 27
  },
  {
    id: 5,
    chapter_number: 5,
    title_vi: "Chu kì tế bào và phân bào",
    title_en: "Cell Cycle and Cell Division",
    stt_range: "111–135",
    description: "Kì trung gian, nguyên phân, giảm phân, cơ chế nhân đôi NST và kiểm soát chu kì tế bào.",
    icon: "GitFork",
    total_terms: 25
  },
  {
    id: 6,
    chapter_number: 6,
    title_vi: "Sinh học vi sinh vật và virus",
    title_en: "Microbiology & Virology",
    stt_range: "136–179",
    description: "Vi sinh vật nhân sơ, dinh dưỡng, sinh trưởng, cấu trúc hạt virus, vòng đời xâm nhiễm và đáp ứng miễn dịch.",
    icon: "Bug",
    total_terms: 44
  }
];

// Curated contextual examples database mapped by canonical English term
const EXAMPLES_MAP = {
  "Chemical composition of the cell": {
    en: "The chemical composition of the cell includes both organic and inorganic substances.",
    vi: "Thành phần hóa học của tế bào bao gồm cả các chất hữu cơ và vô cơ."
  },
  "Chemical element": {
    en: "Carbon is the primary chemical element forming the backbone of biological macromolecules.",
    vi: "Carbon là nguyên tố hóa học chính tạo nên bộ khung của các đại phân tử sinh học."
  },
  "Atom": {
    en: "An atom is the smallest unit of ordinary matter that forms a chemical element.",
    vi: "Nguyên tử là đơn vị nhỏ nhất của vật chất thông thường cấu thành nên nguyên tố hóa học."
  },
  "Molecule": {
    en: "A water molecule consists of two hydrogen atoms bonded to one oxygen atom.",
    vi: "Một phân tử nước gồm hai nguyên tử hydrogen liên kết với một nguyên tử oxygen."
  },
  "Ion": {
    en: "Calcium ions play an essential role in muscle contraction and cell signaling.",
    vi: "Các ion calcium đóng vai trò thiết yếu trong sự co cơ và truyền tín hiệu tế bào."
  },
  "Macronutrient elements": {
    en: "Macronutrient elements such as C, H, O, and N make up over 96% of the mass of living organisms.",
    vi: "Các nguyên tố đại lượng như C, H, O và N chiếm hơn 96% khối lượng của cơ thể sinh vật."
  },
  "Trace element": {
    en: "Iron is an important trace element required for the synthesis of hemoglobin.",
    vi: "Sắt là một nguyên tố vi lượng quan trọng cần thiết cho quá trình tổng hợp hemoglobin."
  },
  "Water": {
    en: "Water serves as a universal solvent and reaction medium in all living cells.",
    vi: "Nước đóng vai trò là dung môi hòa tan phổ quát và môi trường phản ứng trong mọi tế bào sống."
  },
  "Organic compound": {
    en: "Proteins, nucleic acids, carbohydrates, and lipids are the four major classes of organic compounds in cells.",
    vi: "Protein, acid nucleic, carbohydrate và lipid là bốn nhóm hợp chất hữu cơ chính trong tế bào."
  },
  "Inorganic compound": {
    en: "Mineral salts are inorganic compounds essential for maintaining cellular osmotic pressure.",
    vi: "Muối khoáng là các hợp chất vô cơ thiết yếu giúp duy trì áp suất thẩm thấu của tế bào."
  },
  "Monosaccharide": {
    en: "Glucose is the most abundant monosaccharide metabolized during cellular respiration.",
    vi: "Glucose là loại đường đơn phổ biến nhất được chuyển hóa trong quá trình hô hấp tế bào."
  },
  "Disaccharide": {
    en: "Sucrose is a disaccharide formed by the condensation of glucose and fructose.",
    vi: "Sucrose là một loại đường đôi được hình thành qua phản ứng ngưng tụ giữa glucose và fructose."
  },
  "Polysaccharide": {
    en: "Cellulose is an insoluble polysaccharide that provides structural rigidity to plant cell walls.",
    vi: "Cellulose là một polysaccharide không tan giúp tạo nên độ cứng cáp cho thành tế bào thực vật."
  },
  "Glucose": {
    en: "Cells break down glucose molecules to harvest energy in the form of ATP.",
    vi: "Tế bào phân giải các phân tử glucose để thu nhận năng lượng dưới dạng ATP."
  },
  "Fructose": {
    en: "Fructose is a simple fruit sugar with the same chemical formula as glucose.",
    vi: "Fructose là một loại đường đơn có trong hoa quả, có cùng công thức phân tử với glucose."
  },
  "Galactose": {
    en: "Galactose combines with glucose to form lactose, the sugar found in milk.",
    vi: "Galactose kết hợp với glucose để tạo thành lactose, loại đường có trong sữa."
  },
  "Sucrose": {
    en: "Plants transport carbohydrates mainly in the form of sucrose through the phloem.",
    vi: "Thực vật vận chuyển carbohydrate chủ yếu dưới dạng sucrose qua mạch rây."
  },
  "Lactose": {
    en: "Lactose is hydrolyzed into glucose and galactose by the enzyme lactase.",
    vi: "Lactose bị thủy phân thành glucose và galactose nhờ enzyme lactase."
  },
  "Maltose": {
    en: "Maltose is a disaccharide consisting of two linked glucose units.",
    vi: "Maltose là một loại đường đôi bao gồm hai đơn vị glucose liên kết với nhau."
  },
  "Starch": {
    en: "Starch is the primary energy storage polysaccharide in green plant tissues.",
    vi: "Tinh bột là polysaccharide dự trữ năng lượng chủ yếu trong các mô thực vật xanh."
  },
  "Glycogen": {
    en: "Excess glucose is stored as glycogen in animal liver and muscle tissues.",
    vi: "Lượng glucose dư thừa được dự trữ dưới dạng glycogen trong mô gan và cơ động vật."
  },
  "Cellulose": {
    en: "Cellulose fibers cannot be digested by human enzymes due to their beta-glycosidic bonds.",
    vi: "Các sợi cellulose không bị tiêu hóa bởi enzyme của người do có các liên kết beta-glycosidic."
  },
  "Chitin": {
    en: "Chitin forms the tough exoskeleton of arthropods and the cell walls of fungi.",
    vi: "Chitin tạo nên lớp vỏ ngoài cứng cáp của chân khớp và thành tế bào của nấm."
  },
  "Lipid": {
    en: "Lipids are hydrophobic macromolecules that serve in energy storage and membrane formation.",
    vi: "Lipid là các đại phân tử kị nước có vai trò dự trữ năng lượng và cấu tạo màng sinh học."
  },
  "Fat": {
    en: "Triglycerides are the main type of fat stored in adipose cells.",
    vi: "Triglyceride là loại chất béo chính được tích trữ trong các tế bào mỡ."
  },
  "Phospholipid": {
    en: "Phospholipids self-assemble into a bilayer with hydrophilic heads and hydrophobic tails.",
    vi: "Phospholipid tự sắp xếp thành lớp kép với đầu ưa nước và đuôi kị nước."
  },
  "Steroid": {
    en: "Cholesterol is an important steroid stabilizing animal cell membrane fluidity.",
    vi: "Cholesterol là một steroid quan trọng giúp ổn định tính lỏng của màng tế bào động vật."
  },
  "Protein": {
    en: "Proteins perform nearly all cellular tasks, from structural support to enzymatic catalysis.",
    vi: "Protein đảm nhận hầu như mọi nhiệm vụ tế bào, từ nâng đỡ cấu trúc đến xúc tác enzyme."
  },
  "Amino acid": {
    en: "Twenty different standard amino acids are linked by peptide bonds to form polypeptides.",
    vi: "Hai mươi loại amino acid tiêu chuẩn khác nhau liên kết qua liên kết peptide tạo chuỗi polypeptide."
  },
  "Polypeptide": {
    en: "A polypeptide chain folds into a unique three-dimensional conformation to become a functional protein.",
    vi: "Một chuỗi polypeptide gấp cuộn thành cấu trúc không gian 3 chiều đặc thù để trở thành protein hoạt động."
  },
  "Nucleic acid": {
    en: "DNA and RNA are nucleic acids responsible for storing and transferring genetic information.",
    vi: "DNA và RNA là các acid nucleic chịu trách nhiệm lưu trữ và truyền đạt thông tin di truyền."
  },
  "Nucleotide": {
    en: "Each nucleotide consists of a nitrogenous base, a pentose sugar, and a phosphate group.",
    vi: "Mỗi nucleotide gồm một gốc base nitơ, một đường 5 carbon và một nhóm phosphate."
  },
  "DNA": {
    en: "DNA contains the genetic blueprint that directs all cellular synthesis and heredity.",
    vi: "DNA chứa bản thiết kế di truyền điều hành mọi hoạt động tổng hợp và tính di truyền của tế bào."
  },
  "RNA": {
    en: "Messenger RNA carries the genetic code from the nucleus to the cytoplasm for translation.",
    vi: "RNA thông tin mang mã di truyền từ nhân ra tế bào chất để dịch mã tổng hợp protein."
  },
  "Cell": {
    en: "The cell is the basic structural and functional unit of all living organisms.",
    vi: "Tế bào là đơn vị cấu trúc và chức năng cơ bản của mọi sinh vật sống."
  },
  "Plasma membrane": {
    en: "The plasma membrane selectively regulates what nutrients enter and wastes leave the cell.",
    vi: "Màng sinh chất kiểm soát chọn lọc các chất dinh dưỡng đi vào và chất thải ra khỏi tế bào."
  },
  "Cytoplasm": {
    en: "The cytoplasm encompasses all contents outside the nucleus enclosed within the plasma membrane.",
    vi: "Tế bào chất bao gồm toàn bộ thành phần nằm bên ngoài nhân và bên trong màng sinh chất."
  },
  "Cytosol": {
    en: "The cytosol is the semifluid aqueous component of the cytoplasm.",
    vi: "Bào tương là chất dịch bán lỏng dạng keo của tế bào chất."
  },
  "Nucleus": {
    en: "The nucleus houses the genomic DNA and orchestrates cell growth and reproduction.",
    vi: "Nhân tế bào chứa DNA bộ gen và điều hành quá trình sinh trưởng, phân chia của tế bào."
  },
  "Nuclear membrane": {
    en: "The double nuclear membrane is perforated by nuclear pores that regulate molecular traffic.",
    vi: "Màng nhân kép có các lỗ nhân giúp kiểm soát sự lưu thông của các phân tử."
  },
  "Nucleolus": {
    en: "The nucleolus is the site inside the nucleus where ribosomal RNA is synthesized and assembled.",
    vi: "Nhân con là nơi bên trong nhân diễn ra quá trình tổng hợp và lắp ráp rRNA."
  },
  "Ribosome": {
    en: "Ribosomes translate genetic instructions from mRNA into polypeptide chains.",
    vi: "Ribôxôm dịch mã chỉ dẫn di truyền từ mRNA thành các chuỗi polypeptide."
  },
  "Endoplasmic reticulum": {
    en: "The rough endoplasmic reticulum is studded with ribosomes for synthesizing secretory proteins.",
    vi: "Mạng lưới nội chất hạt có đính các ribôxôm chuyên tổng hợp protein tiết."
  },
  "Golgi apparatus": {
    en: "The Golgi apparatus modifies, sorts, and packages macromolecules for cell secretion.",
    vi: "Bộ máy Golgi biến đổi, phân loại và đóng gói các đại phân tử phục vụ cho sự bài tiết tế bào."
  },
  "Lysosome": {
    en: "Lysosomes contain digestive enzymes that break down worn-out organelles and foreign pathogens.",
    vi: "Lizôxôm chứa các enzyme tiêu hóa giúp phân hủy bào quan già cỗi và vi khuẩn gây bệnh."
  },
  "Vacuole": {
    en: "The large central vacuole in mature plant cells maintains turgor pressure.",
    vi: "Không bào trung tâm lớn ở tế bào thực vật trưởng thành giúp duy trì sức trương nước."
  },
  "Peroxisome": {
    en: "Peroxisomes contain catalase enzymes that detoxify harmful hydrogen peroxide into water and oxygen.",
    vi: "Peroxisome chứa enzyme catalase giúp khử độc hydrogen peroxide độc hại thành nước và oxygen."
  },
  "Mitochondrion": {
    en: "Mitochondria generate the bulk of cellular ATP through aerobic respiration.",
    vi: "Ti thể tạo ra phần lớn ATP của tế bào thông qua quá trình hô hấp hiếu khí."
  },
  "Chloroplast": {
    en: "Chloroplasts contain chlorophyll pigments that capture sunlight energy to synthesize sugars.",
    vi: "Lục lạp chứa sắc tố diệp lục hấp thụ năng lượng ánh sáng mặt trời để tổng hợp đường."
  },
  "Cytoskeleton": {
    en: "The cytoskeleton provides mechanical strength, establishes cell shape, and guides organelle transport.",
    vi: "Bộ khung tế bào tạo độ bền cơ học, định hình hình dạng tế bào và dẫn đường vận chuyển bào quan."
  },
  "Centriole": {
    en: "Centrioles help organize spindle fibers during animal cell mitosis.",
    vi: "Trung thể giúp hình thành thoi vô sắc trong quá trình nguyên phân ở tế bào động vật."
  },
  "Cilia": {
    en: "Cilia are hair-like projections that beat in coordination to move fluid over epithelial surfaces.",
    vi: "Lông rung là các phần lồi dạng sợi mảnh chuyển động nhịp nhàng để đẩy dịch thể qua bề mặt biểu mô."
  },
  "Flagella": {
    en: "The bacterial flagellum acts like a rotary motor allowing cells to swim toward nutrients.",
    vi: "Roi tế bào hoạt động như một động cơ xoay giúp tế bào bơi về phía nguồn dinh dưỡng."
  },
  "Cell wall": {
    en: "The rigid plant cell wall prevents cells from bursting under hypotonic conditions.",
    vi: "Thành tế bào thực vật cứng chắc giúp ngăn tế bào không bị vỡ trong môi trường nhược trương."
  },
  "Osmosis": {
    en: "Osmosis causes water molecules to diffuse across a selectively permeable membrane toward higher solute concentrations.",
    vi: "Thẩm thấu làm cho các phân tử nước khuếch tán qua màng bán thấm về phía có nồng độ chất tan cao hơn."
  },
  "Diffusion": {
    en: "Diffusion is the spontaneous net movement of particles down their concentration gradient.",
    vi: "Khuếch tán là sự chuyển động tự phát của các phân tử theo chiều gradien nồng độ."
  },
  "Active transport": {
    en: "Active transport pumps solutes against their electrochemical gradient by consuming ATP.",
    vi: "Vận chuyển chủ động bơm các chất tan ngược gradien điện hóa nhờ tiêu tốn ATP."
  },
  "Passive transport": {
    en: "Passive transport moves substances across membranes without requiring any metabolic energy.",
    vi: "Vận chuyển thụ động đưa các chất qua màng sinh chất mà không cần tiêu tốn năng lượng sinh học."
  },
  "Endocytosis": {
    en: "Through endocytosis, the cell engulfs extracellular particles by invaginating its plasma membrane.",
    vi: "Nhờ hiện tượng nhập bào, tế bào thu nhận các phần tử ngoại bào bằng cách lõm màng sinh chất."
  },
  "Exocytosis": {
    en: "Exocytosis releases hormones and digestive enzymes into the extracellular fluid.",
    vi: "Hiện tượng xuất bào giải phóng các hormone và enzyme tiêu hóa vào dịch ngoại bào."
  },
  "Phagocytosis": {
    en: "White blood cells destroy invading bacteria via phagocytosis.",
    vi: "Bạch cầu tiêu diệt vi khuẩn xâm nhập thông qua hiện tượng thực bào."
  },
  "Pinocytosis": {
    en: "Pinocytosis is the uptake of extracellular fluid and dissolved solutes by small vesicles.",
    vi: "Ẩm bào là quá trình tế bào hấp thu dịch ngoại bào và các chất tan hòa tan bằng các túi nhỏ."
  },
  "ATP": {
    en: "ATP is often referred to as the universal energy currency of the cell.",
    vi: "ATP thường được gọi là đồng tiền năng lượng phổ quát của tế bào."
  },
  "Cellular respiration": {
    en: "Cellular respiration oxidizes glucose to generate carbon dioxide, water, and ATP.",
    vi: "Hô hấp tế bào oxy hóa glucose để tạo ra carbon dioxide, nước và ATP."
  },
  "Photosynthesis": {
    en: "Photosynthesis converts light energy into chemical energy stored in organic bonds.",
    vi: "Quang hợp biến đổi năng lượng ánh sáng thành hóa năng dự trữ trong các liên kết hữu cơ."
  },
  "Krebs cycle": {
    en: "The Krebs cycle takes place in the mitochondrial matrix and completes the breakdown of glucose.",
    vi: "Chu trình Krebs diễn ra trong chất nền ti thể và hoàn tất quá trình phân giải glucose."
  },
  "Glycolysis": {
    en: "Glycolysis breaks down one glucose molecule into two molecules of pyruvate in the cytoplasm.",
    vi: "Đường phân phân giải một phân tử glucose thành hai phân tử pyruvate tại tế bào chất."
  },
  "Fermentation": {
    en: "Yeast cells carry out alcoholic fermentation when oxygen is unavailable.",
    vi: "Tế bào nấm men thực hiện quá trình lên men rượu khi môi trường thiếu oxygen."
  },
  "Cell cycle": {
    en: "The cell cycle consists of interphase, mitosis, and cytokinesis.",
    vi: "Chu kì tế bào gồm kì trung gian, nguyên phân và sự phân chia tế bào chất."
  },
  "Mitosis": {
    en: "Mitosis yields two genetically identical daughter cells from a single parent cell.",
    vi: "Nguyên phân tạo ra hai tế bào con có bộ gen giống hệt nhau từ một tế bào mẹ ban đầu."
  },
  "Meiosis": {
    en: "Meiosis produces haploid gametes with genetic variation due to crossing over.",
    vi: "Giảm phân tạo ra các giao tử đơn bội mang biến dị tổ hợp nhờ sự tiếp hợp và trao đổi chéo."
  },
  "Chromatid": {
    en: "Sister chromatids are duplicated chromosomes joined together at the centromere.",
    vi: "Nhiễm sắc tử chị em (chromatid) là các NST kép dính nhau tại tâm động."
  },
  "Centromere": {
    en: "The spindle fibers attach to the centromere during metaphase.",
    vi: "Thoi vô sắc đính vào tâm động của nhiễm sắc thể trong kì giữa."
  },
  "Microorganism": {
    en: "Microorganisms play a vital role in nutrient cycling and decomposing organic matter.",
    vi: "Vi sinh vật đóng vai trò sống còn trong việc tuần hoàn vật chất và phân giải chất hữu cơ."
  },
  "Bacterium": {
    en: "A bacterium lacks a membrane-bound nucleus and possesses circular plasmid DNA.",
    vi: "Vi khuẩn không có màng nhân và thường chứa các phân tử plasmid DNA dạng vòng."
  },
  "Yeast": {
    en: "Baker's yeast is a unicellular fungus extensively used in bread making and beer brewing.",
    vi: "Nấm men bánh mì là vi nấm đơn bào được ứng dụng rộng rãi trong làm bánh mì và ủ bia."
  },
  "Gram-positive bacteria": {
    en: "Gram-positive bacteria have a thick peptidoglycan cell wall that retains crystal violet stain.",
    vi: "Vi khuẩn gram dương có lớp thành peptidoglycan dày giúp giữ màu tím tinh thể khi nhuộm Gram."
  },
  "Gram-negative bacteria": {
    en: "Gram-negative bacteria possess an outer lipopolysaccharide membrane making them more resistant to antibiotics.",
    vi: "Vi khuẩn gram âm có lớp màng ngoài lipopolysaccharide giúp chúng kháng kháng sinh tốt hơn."
  },
  "Virus": {
    en: "A virus is an obligate intracellular parasite that requires a host cell to replicate.",
    vi: "Virus là ký sinh nội bào bắt buộc, cần tế bào chủ để nhân lên."
  },
  "Capsid": {
    en: "The viral genome is protected inside a protein shell called a capsid.",
    vi: "Hệ gen của virus được bảo vệ bên trong một lớp vỏ protein gọi là capsid."
  },
  "Envelope": {
    en: "The lipid envelope surrounding some viruses is derived from the host cell membrane.",
    vi: "Lớp vỏ ngoài lipid bao bọc một số loại virus có nguồn gốc từ màng của tế bào chủ."
  },
  "Antibody": {
    en: "Antibodies bind specifically to viral antigens to neutralize pathogens.",
    vi: "Kháng thể liên kết đặc hiệu với kháng nguyên của virus để trung hòa mầm bệnh."
  }
};

// Process each term from rawData
let currentStt = 1;
const cleanedTerms = [];

for (const item of rawData) {
  let en = item.en.trim();
  let vi = item.vi.trim();
  let rawIpa = item.ipa.trim();
  let note = item.note.trim();

  // Determine chapter_id
  let chapter_id = item.table_index;
  let section = "";
  if (item.table_index === 6) {
    chapter_id = 6;
    section = "Vi sinh vật";
  } else if (item.table_index === 7) {
    chapter_id = 6;
    section = "Virus & Miễn dịch";
  }

  // Handle alternate forms if term has "/"
  let alt_forms = [];
  let mainEn = en;
  let mainVi = vi;

  // Specific spellings & corrections
  if (en.includes("/")) {
    const parts = en.split("/").map(s => s.trim());
    mainEn = parts[0];
    
    // Split IPA if multiple slashes
    let ipaParts = rawIpa.split("//").map(s => s.trim()).filter(Boolean);
    if (ipaParts.length === 1 && rawIpa.includes("/ /")) {
      ipaParts = rawIpa.split("/ /").map(s => s.trim());
    }

    alt_forms = parts.slice(1).map((p, idx) => ({
      en: p,
      ipa: ipaParts[idx + 1] ? ipaParts[idx + 1].replace(/^\/?/, '/').replace(/\/?$/, '/') : "",
      type: "Dạng thay thế / Đồng nghĩa"
    }));
  }

  // Handle Vietnamese corrections
  if (vi.toLowerCase().includes("cromatit")) {
    vi = vi.replace(/cromatit/gi, "Chromatid (Nhiễm sắc tử)");
  }
  if (vi.toLowerCase().includes("xentriol")) {
    vi = vi.replace(/xentriol/gi, "Centriole (Trung thể)");
  }

  // Format IPA cleanly
  let cleanIpa = rawIpa;
  if (cleanIpa && !cleanIpa.startsWith("/")) cleanIpa = "/" + cleanIpa;
  if (cleanIpa && !cleanIpa.endsWith("/")) cleanIpa = cleanIpa + "/";
  // Remove duplicate slashes inside
  if (cleanIpa.includes("//")) {
    cleanIpa = cleanIpa.split("//")[0] + "/";
  }

  // Check example sentence
  let example_en = "";
  let example_vi = "";

  if (EXAMPLES_MAP[mainEn]) {
    example_en = EXAMPLES_MAP[mainEn].en;
    example_vi = EXAMPLES_MAP[mainEn].vi;
  } else {
    // Generate context-aware biology example
    example_en = `The ${mainEn.toLowerCase()} is an essential biological concept in cellular biology.`;
    example_vi = `${vi} là một khái niệm sinh học quan trọng trong sinh học tế bào.`;
  }

  // Add default note if empty
  if (!note) {
    note = `Khái niệm thuộc ${CHAPTERS[chapter_id - 1].title_vi}.`;
  }

  cleanedTerms.push({
    id: currentStt,
    stt: currentStt,
    chapter_id: chapter_id,
    section: section,
    vi: vi,
    en: mainEn,
    ipa_bre: cleanIpa,
    note: note,
    example_en: example_en,
    example_vi: example_vi,
    alt_forms: alt_forms,
    image_url: null,
    audio_url: null
  });

  currentStt++;
}

// Update total_terms in chapters
CHAPTERS.forEach(ch => {
  ch.total_terms = cleanedTerms.filter(t => t.chapter_id === ch.id).length;
});

// Create directories if needed
fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/chapters.json', JSON.stringify(CHAPTERS, null, 2), 'utf8');
fs.writeFileSync('src/data/terms.json', JSON.stringify(cleanedTerms, null, 2), 'utf8');

console.log(`Successfully processed ${cleanedTerms.length} terms across ${CHAPTERS.length} chapters.`);
