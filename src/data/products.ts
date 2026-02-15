export interface Product {
  id: string;
  name: string;
  nameZh: string;
  category: "puer" | "oolong" | "gaba" | "set";
  tags: string[];
  premium: boolean;
  description: string;
  fullDescription: string;
  pricePerUnit: number;
  unit: string;
  prices: Record<string, number>;
  brewing: { temp: string; time: string; steeps: string };
  province: string;
  images: string[];
}

export const products: Product[] = [
  {
    id: "feitian", name: "Блин Шу пуэра «Фэйтянь»", nameZh: "飞天熟普洱", category: "puer",
    tags: ["pressed"], premium: false,
    description: "Классический шу пуэр, прессованный в 2020 году. Ноты спечёного хлеба, тёмного мёда и влажной земли.",
    fullDescription: "Классический шу пуэр, прессованный в 2020 году. За годы созревания его характер стал гладким и бархатистым. Ноты спечёного хлеба, тёмного мёда и влажной земли с долгим тёплым послевкусием. Прекрасно гармонизирует пищеварение.",
    pricePerUnit: 3500, unit: "шт", prices: { "блин 357г": 3500 },
    brewing: { temp: "95°C", time: "15–30с", steeps: "10–15" }, province: "Юньнань",
    images: ["/images/feitian-0.jpg","/images/feitian-1.jpg","/images/feitian-2.jpg","/images/feitian-3.jpg","/images/feitian-4.jpg","/images/feitian-5.jpg","/images/feitian-6.jpg","/images/feitian-7.jpg"],
  },
  {
    id: "gaba", name: "ГАБА медовая премиум", nameZh: "蜜香佳叶龙茶", category: "gaba",
    tags: ["premium"], premium: true,
    description: "Редкий чай с анаэробной ферментацией. Тёплые пряные ноты, полевые травы, медовый оттенок.",
    fullDescription: "Премиальный чай, созданный по уникальной технологии ферментации в бескислородной среде. Аромат — тёплый, глубокий и пряный. Вкус лёгкий: полевые травы, цветы, поджаренная хлебная корочка. Повышенное содержание ГАМК — природного нейромедиатора спокойствия.",
    pricePerUnit: 800, unit: "10г", prices: { "10г": 800, "50г": 4000, "100г": 8000 },
    brewing: { temp: "90°C", time: "20–40с", steeps: "8–10" }, province: "Фуцзянь",
    images: ["/images/gaba-0.jpg"],
  },
  {
    id: "guntin", name: "Гун Тин Шу Пуэр 1-го класса", nameZh: "宫廷熟普洱", category: "puer",
    tags: [], premium: false,
    description: "«Дворцовый» пуэр — высшая оценка качества. Баланс горчинки, фиников и карамели.",
    fullDescription: "Элитный шу пуэр, «Гун Тин» — дворцовый. Верхние листья старых деревьев Юньнани. Рубиновый настой с гармоничным балансом мягкой благородной горчинки, фиников и карамели.",
    pricePerUnit: 300, unit: "10г", prices: { "10г": 300, "50г": 1500, "100г": 3000 },
    brewing: { temp: "95°C", time: "10–25с", steeps: "12–15" }, province: "Юньнань",
    images: ["/images/guntin-0.jpg","/images/guntin-1.jpg","/images/guntin-2.jpg","/images/guntin-3.jpg"],
  },
  {
    id: "dahongpao", name: "Да Хун Пао 1-го класса", nameZh: "大红袍", category: "oolong",
    tags: [], premium: false,
    description: "Легендарный «Большой красный халат». Мощный дымно-печёный аромат, «чайное опьянение».",
    fullDescription: "Загадочный улун с самой интенсивной ферментацией. Мощный терпкий вкус с дымно-печёными нотами. Долгое сладкое послевкусие с фруктовой свежестью. Знаменитое «ча юй» — глубокое умственное расслабление.",
    pricePerUnit: 270, unit: "10г", prices: { "10г": 270, "50г": 1350, "100г": 2700 },
    brewing: { temp: "95°C", time: "15–30с", steeps: "8–10" }, province: "Фуцзянь",
    images: ["/images/dahongpao-0.jpg","/images/dahongpao-1.jpg","/images/dahongpao-2.jpg","/images/dahongpao-3.jpg"],
  },
  {
    id: "dahongpao-premium", name: "Да Хун Пао премиум", nameZh: "顶级大红袍", category: "oolong",
    tags: ["premium"], premium: true,
    description: "Императорский улун с молодых кустов 6–8 лет. Терпкий, мощный, с медово-цветочным ароматом.",
    fullDescription: "Самый элитный улун, который веками пили правители Поднебесной. Кусты 6–8 лет на высоте 550–650 м. Густой янтарно-красный настой. До 10 заварок, каждая раскрывает новые грани.",
    pricePerUnit: 450, unit: "10г", prices: { "10г": 450, "50г": 2250, "100г": 4500 },
    brewing: { temp: "95°C", time: "10–20с", steeps: "10–15" }, province: "Фуцзянь",
    images: ["/images/dahongpao-premium-0.jpg","/images/dahongpao-premium-1.jpg","/images/dahongpao-premium-2.jpg"],
  },
  {
    id: "dvortsoviy", name: "Дворцовый Шу Пуэр 1-го класса", nameZh: "宫廷一级熟普", category: "puer",
    tags: [], premium: false,
    description: "Входит в тройку самых элитных пуэров. Чёрный виноград, лесные ягоды, тёмный шоколад.",
    fullDescription: "Исторически поставлялся ко двору. Ноты чёрного винограда и лесных ягод переплетаются с тёмным шоколадом и обжаренным орехом. Шелковистое послевкусие.",
    pricePerUnit: 200, unit: "10г", prices: { "10г": 200, "50г": 1000, "100г": 2000 },
    brewing: { temp: "95°C", time: "10–25с", steeps: "15–18" }, province: "Юньнань",
    images: ["/images/dvortsoviy-0.jpg","/images/dvortsoviy-1.jpg","/images/dvortsoviy-2.jpg","/images/dvortsoviy-3.jpg"],
  },
  {
    id: "dikiy-shen", name: "Дикий Шен Пуэр 1-го класса", nameZh: "野生生普洱", category: "puer",
    tags: [], premium: false,
    description: "С диких деревьев Юньнани. Лесная свежесть, терпкость, цветочный мёд.",
    fullDescription: "Собирают вручную с диких чайных деревьев. Прозрачный золотой настой с густой лесной свежестью. Грушевое послевкусие.",
    pricePerUnit: 180, unit: "10г", prices: { "10г": 180, "50г": 900, "100г": 1800 },
    brewing: { temp: "90°C", time: "10–20с", steeps: "12–18" }, province: "Юньнань",
    images: ["/images/dikiy-shen-0.jpg","/images/dikiy-shen-1.jpg","/images/dikiy-shen-2.jpg","/images/dikiy-shen-3.jpg"],
  },
  {
    id: "imperatorskiy", name: "Императорский Гун Тин Шу Пуэр", nameZh: "御制宫廷熟普", category: "puer",
    tags: ["premium"], premium: true,
    description: "Напиток мудрецов. Рубиново-чёрный настой с нотами старого дерева и чернослива.",
    fullDescription: "Достояние многовековой культуры — «Гун Тин», дворцовый. Отборные листья со старых деревьев горы Манхай. Густой рубиново-чёрный настой. Ноты старого дерева, чернослива, тёмного мёда.",
    pricePerUnit: 600, unit: "10г", prices: { "10г": 600, "50г": 3000, "100г": 6000 },
    brewing: { temp: "95°C", time: "8–20с", steeps: "15–20" }, province: "Юньнань",
    images: ["/images/imperatorskiy-0.jpg","/images/imperatorskiy-1.jpg","/images/imperatorskiy-2.jpg","/images/imperatorskiy-3.jpg"],
  },
  {
    id: "set-classic", name: "Набор «Классика Чайного Искусства»", nameZh: "经典茶艺套装", category: "set",
    tags: ["set"], premium: false,
    description: "4 столпа чайного канона по 10 г: Дворцовый Шу, Те Гуань Инь, Да Хун Пао, Юэ Гуан Бай.",
    fullDescription: "Дворцовый Шу Пуэр (200₽), Те Гуань Инь (220₽), Да Хун Пао (270₽), Юэ Гуан Бай (230₽). По отдельности: 920₽. Набор: 850₽. Четыре столпа китайского чайного канона.",
    pricePerUnit: 850, unit: "набор", prices: { "набор": 850 },
    brewing: { temp: "80–95°C", time: "10–30с", steeps: "8–15" }, province: "Разные",
    images: ["/images/set-classic-0.jpg"],
  },
  {
    id: "set-puer", name: "Набор «Путешествие по Пуэрам»", nameZh: "普洱之旅套装", category: "set",
    tags: ["set"], premium: false,
    description: "4 сорта пуэра по 10 г: от свежести белого пуэра до глубины шу.",
    fullDescription: "Дворцовый Шу (200₽), Юэ Гуан Бай (230₽), Гун Тин 1-го класса (300₽), Блин Шен Чун Ляо (~56₽). По отдельности: ~786₽. Набор: 750₽.",
    pricePerUnit: 750, unit: "набор", prices: { "набор": 750 },
    brewing: { temp: "90–95°C", time: "10–30с", steeps: "10–20" }, province: "Юньнань",
    images: ["/images/set-puer-0.jpg"],
  },
  {
    id: "set-exotic", name: "Набор «Редкости и Экзотика»", nameZh: "珍稀异域套装", category: "set",
    tags: ["set"], premium: false,
    description: "4 необычных чая: Синий Анчан, ГАБА, Дикий Шен, Пуэр в мандарине.",
    fullDescription: "Анчан (280₽), ГАБА медовая (800₽), Дикий Шен (180₽), Шу Пуэр в мандарине (250₽). По отдельности: 1510₽. Набор: 1400₽.",
    pricePerUnit: 1400, unit: "набор", prices: { "набор": 1400 },
    brewing: { temp: "85–95°C", time: "10–30с", steeps: "8–15" }, province: "Разные",
    images: ["/images/set-exotic-0.jpg"],
  },
  {
    id: "shen-plitka", name: "Плитка Шен пуэра 50г", nameZh: "生普洱小砖", category: "puer",
    tags: ["pressed"], premium: false,
    description: "Эталон «сырого» пуэра. Свежие фрукты, луговые травы, освежающая кислинка.",
    fullDescription: "Элитный шен пуэр с бережной обработкой. Яркие ноты свежих фруктов и луговых трав, кислинка переходит в сладкое мягкое послевкусие.",
    pricePerUnit: 500, unit: "шт", prices: { "плитка 50г": 500 },
    brewing: { temp: "90°C", time: "10–20с", steeps: "10–12" }, province: "Юньнань",
    images: ["/images/shen-plitka-0.jpg","/images/shen-plitka-1.jpg","/images/shen-plitka-2.jpg","/images/shen-plitka-3.jpg"],
  },
  {
    id: "teguanyin", name: "Те Гуань Инь 1-го класса", nameZh: "铁观音", category: "oolong",
    tags: [], premium: false,
    description: "Классика улунов. Орхидея, орех, долгое медовое послевкусие.",
    fullDescription: "Эталон «светлого» улуна из Фуцзяни. Светло-янтарный настой. Букет орхидеи с ореховыми акцентами. Многократное заваривание раскрывает новые оттенки.",
    pricePerUnit: 220, unit: "10г", prices: { "10г": 220, "50г": 1100, "100г": 2200 },
    brewing: { temp: "85°C", time: "15–30с", steeps: "8–10" }, province: "Фуцзянь",
    images: ["/images/teguanyin-0.jpg","/images/teguanyin-1.jpg","/images/teguanyin-2.jpg","/images/teguanyin-3.jpg"],
  },
  {
    id: "teguanyin-premium", name: "Те Гуань Инь Ван премиум", nameZh: "铁观音王", category: "oolong",
    tags: ["premium"], premium: true,
    description: "«Царь» Те Гуань Инь. Маслянисто-бархатистый вкус, сирень, орхидея.",
    fullDescription: "Премиальный улун-легенда. Густой настой цвета топлёного масла. Сирень, орхидея, мёд, экзотические фрукты. Мощный маслянисто-бархатистый вкус.",
    pricePerUnit: 500, unit: "10г", prices: { "10г": 500, "50г": 2500, "100г": 5000 },
    brewing: { temp: "85°C", time: "10–25с", steeps: "10–12" }, province: "Аньси",
    images: ["/images/teguanyin-premium-0.jpg","/images/teguanyin-premium-1.jpg","/images/teguanyin-premium-2.jpg"],
  },
  {
    id: "guan-bai", name: "Шен пуэр «Юэ Гуан Бай»", nameZh: "月光白生普洱", category: "puer",
    tags: [], premium: false,
    description: "Лунный свет в чашке. Изысканный белый пуэр — мёд, полевые цветы.",
    fullDescription: "Изысканный белый пуэр 1-го класса. Серебристо-белые почки и тёмные листья. Мягкий бархатистый вкус: полевые цветы, мёд, спелые ягоды. Лесная земляника в послевкусии.",
    pricePerUnit: 230, unit: "10г", prices: { "10г": 230, "50г": 1150, "100г": 2300 },
    brewing: { temp: "88°C", time: "10–20с", steeps: "10–12" }, province: "Юньнань",
    images: ["/images/guan-bai-0.jpg","/images/guan-bai-1.jpg","/images/guan-bai-2.jpg","/images/guan-bai-3.jpg"],
  },
  {
    id: "mandarin", name: "Шу Пуэр в мандарине", nameZh: "小青柑熟普洱", category: "puer",
    tags: ["premium","pressed"], premium: true,
    description: "Солнечное слияние — глубина пуэра и энергия мандарина.",
    fullDescription: "Выдержанный шу пуэр в натуральной цедре мандарина. Тёмный бархатный настой с цитрусовым шлейфом. Землисто-древесные тона сплетаются с мандариновой кислинкой.",
    pricePerUnit: 250, unit: "шт", prices: { "1шт": 250, "3шт": 700, "6шт": 1350 },
    brewing: { temp: "95°C", time: "15–30с", steeps: "10–15" }, province: "Юньнань",
    images: ["/images/mandarin-0.jpg","/images/mandarin-1.jpg","/images/mandarin-2.jpg","/images/mandarin-3.jpg","/images/mandarin-4.jpg"],
  },
  {
    id: "tocha", name: "Шу пуэр «То Ча» листик 8г", nameZh: "沱茶熟普洱", category: "puer",
    tags: ["pressed"], premium: false,
    description: "Мини-порция на одну церемонию. Тёмный шоколад, орех, спечённый рис.",
    fullDescription: "Шедевр в форме листа — шу пуэр высшего качества, спрессованный в порцию на одну церемонию. Тёмный шоколад, орех, спечённый рис.",
    pricePerUnit: 150, unit: "шт", prices: { "1шт": 150, "10шт": 1350, "30шт": 3900 },
    brewing: { temp: "95°C", time: "20–40с", steeps: "5–8" }, province: "Юньнань",
    images: ["/images/tocha-0.jpg","/images/tocha-1.jpg","/images/tocha-2.jpg","/images/tocha-3.jpg","/images/tocha-4.jpg"],
  },
];
