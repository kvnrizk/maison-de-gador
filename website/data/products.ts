export interface Product {
  slug: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number;
  currency: string;
  category: "signature" | "premium" | "gifting";
  image: string;
  ingredients: { en: string[]; ar: string[] };
  perfectFor: { en: string[]; ar: string[] };
}

export const products: Product[] = [
  {
    slug: "dark-chocolate-almond",
    name: { en: "Dark Chocolate & Almond", ar: "شوكولاتة داكنة ولوز" },
    description: {
      en: "Premium Medjool date enrobed in 72% Belgian dark chocolate, crowned with a whole roasted almond.",
      ar: "تمر مجدول فاخر مغلف بالشوكولاتة البلجيكية الداكنة ٧٢٪، متوج بحبة لوز محمصة كاملة.",
    },
    price: 15,
    currency: "QAR",
    category: "signature",
    image: "/products/dark-almond.jpg",
    ingredients: {
      en: ["Medjool Date", "72% Belgian Dark Chocolate", "Roasted Almond"],
      ar: ["تمر مجدول", "شوكولاتة بلجيكية داكنة ٧٢٪", "لوز محمص"],
    },
    perfectFor: {
      en: ["Coffee pairing", "After dinner", "Self-indulgence"],
      ar: ["مع القهوة", "بعد العشاء", "تدليل النفس"],
    },
  },
  {
    slug: "milk-chocolate-pistachio",
    name: { en: "Milk Chocolate & Pistachio", ar: "شوكولاتة بالحليب وفستق" },
    description: {
      en: "Smooth milk chocolate embracing a Medjool date, finished with crushed Iranian pistachios and a touch of rose.",
      ar: "شوكولاتة حليب ناعمة تحتضن تمرة مجدول، مع فستق إيراني مطحون ولمسة من الورد.",
    },
    price: 18,
    currency: "QAR",
    category: "signature",
    image: "/products/milk-pistachio.jpg",
    ingredients: {
      en: ["Medjool Date", "Belgian Milk Chocolate", "Iranian Pistachio", "Rose Extract"],
      ar: ["تمر مجدول", "شوكولاتة بلجيكية بالحليب", "فستق إيراني", "خلاصة الورد"],
    },
    perfectFor: {
      en: ["Tea time", "Gifting", "Special occasions"],
      ar: ["وقت الشاي", "الإهداء", "المناسبات الخاصة"],
    },
  },
  {
    slug: "white-chocolate-saffron",
    name: { en: "White Chocolate & Saffron", ar: "شوكولاتة بيضاء وزعفران" },
    description: {
      en: "Luxurious white chocolate with Kashmiri saffron threads, encasing a honey-stuffed Medjool date with edible gold leaf.",
      ar: "شوكولاتة بيضاء فاخرة بخيوط الزعفران الكشميري، تحتضن تمرة مجدول محشوة بالعسل مع رقائق ذهب صالحة للأكل.",
    },
    price: 25,
    currency: "QAR",
    category: "premium",
    image: "/products/white-saffron.jpg",
    ingredients: {
      en: ["Medjool Date", "White Chocolate", "Kashmiri Saffron", "Sidr Honey", "Edible Gold"],
      ar: ["تمر مجدول", "شوكولاتة بيضاء", "زعفران كشميري", "عسل سدر", "ذهب صالح للأكل"],
    },
    perfectFor: {
      en: ["VIP gifting", "Ramadan", "Wedding favors"],
      ar: ["هدايا كبار الشخصيات", "رمضان", "هدايا الأعراس"],
    },
  },
  {
    slug: "dark-hazelnut-praline",
    name: { en: "Dark Hazelnut Praliné", ar: "شوكولاتة داكنة بالبندق" },
    description: {
      en: "Crunchy hazelnut praliné filling inside a Medjool date, coated in dark chocolate and dusted with cocoa powder.",
      ar: "حشوة برالينيه بندق مقرمشة داخل تمرة مجدول، مغلفة بالشوكولاتة الداكنة ومرشوشة بمسحوق الكاكاو.",
    },
    price: 20,
    currency: "QAR",
    category: "premium",
    image: "/products/dark-hazelnut.jpg",
    ingredients: {
      en: ["Medjool Date", "Dark Chocolate", "Hazelnut Praliné", "Cocoa Powder"],
      ar: ["تمر مجدول", "شوكولاتة داكنة", "برالينيه بندق", "مسحوق كاكاو"],
    },
    perfectFor: {
      en: ["Chocolate lovers", "Dessert", "Gifting"],
      ar: ["عشاق الشوكولاتة", "الحلويات", "الإهداء"],
    },
  },
  {
    slug: "ramadan-box-12",
    name: { en: "Ramadan Collection — 12 Pieces", ar: "مجموعة رمضان — ١٢ قطعة" },
    description: {
      en: "A curated selection of our finest chocolate dates, presented in a luxury teal gift box with gold foil. The perfect Iftar companion.",
      ar: "تشكيلة منتقاة من أجود تمور الشوكولاتة، مقدمة في علبة هدايا فاخرة بلون التيل مع رقائق ذهبية. الرفيق المثالي للإفطار.",
    },
    price: 180,
    currency: "QAR",
    category: "gifting",
    image: "/products/ramadan-box.jpg",
    ingredients: {
      en: ["Assorted 12 pieces", "Premium gift box"],
      ar: ["١٢ قطعة متنوعة", "علبة هدايا فاخرة"],
    },
    perfectFor: {
      en: ["Ramadan", "Eid", "Host gifts", "Corporate"],
      ar: ["رمضان", "العيد", "هدايا الضيافة", "الشركات"],
    },
  },
  {
    slug: "eid-luxury-box-24",
    name: { en: "Eid Luxury Box — 24 Pieces", ar: "علبة العيد الفاخرة — ٢٤ قطعة" },
    description: {
      en: "Our grand celebration box featuring 24 handcrafted chocolate dates in six flavors, with a hand-calligraphed Eid greeting card.",
      ar: "علبة الاحتفال الكبرى تضم ٢٤ تمرة شوكولاتة مصنوعة يدوياً بستة نكهات، مع بطاقة تهنئة بخط اليد.",
    },
    price: 350,
    currency: "QAR",
    category: "gifting",
    image: "/products/eid-box.jpg",
    ingredients: {
      en: ["Assorted 24 pieces", "Luxury presentation box", "Greeting card"],
      ar: ["٢٤ قطعة متنوعة", "علبة عرض فاخرة", "بطاقة تهنئة"],
    },
    perfectFor: {
      en: ["Eid Al Fitr", "Eid Al Adha", "Luxury gifting"],
      ar: ["عيد الفطر", "عيد الأضحى", "الهدايا الفاخرة"],
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}
