// Project: আম বাহার | Products Data Layer

export type Product = {
  id: number;
  name: string;
  nameEn: string;
  category: string;
  type: 'মৌসুমি আম' | 'বারমাসি আম';
  price: number;
  unit: string;
  minKg: number;
  stock: 'available' | 'pre_order' | 'out_of_stock';
  emoji: string;
  gradient: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "হিমসাগর আম",
    nameEn: "Himsagar Mango",
    category: "himsagar",
    type: "মৌসুমি আম",
    price: 350,
    unit: "কেজি",
    minKg: 1,
    stock: "available",
    emoji: "🥭",
    gradient: "linear-gradient(135deg, #2d6a4f, #52b788)"
  },
  {
    id: 2,
    name: "ল্যাংড়া আম",
    nameEn: "Langra Mango",
    category: "langra",
    type: "মৌসুমি আম",
    price: 320,
    unit: "কেজি",
    minKg: 1,
    stock: "available",
    emoji: "🥭",
    gradient: "linear-gradient(135deg, #40916c, #74c69d)"
  },
  {
    id: 3,
    name: "ফজলি আম",
    nameEn: "Fazli Mango",
    category: "fazli",
    type: "মৌসুমি আম",
    price: 280,
    unit: "কেজি",
    minKg: 1,
    stock: "available",
    emoji: "🥭",
    gradient: "linear-gradient(135deg, #1b4332, #40916c)"
  },
  {
    id: 4,
    name: "আম্রপালি",
    nameEn: "Amrapali Mango",
    category: "amrapali",
    type: "বারমাসি আম",
    price: 380,
    unit: "কেজি",
    minKg: 1,
    stock: "available",
    emoji: "🥭",
    gradient: "linear-gradient(135deg, #FF6B35, #ffaa00)"
  },
  {
    id: 5,
    name: "গোবিন্দভোগ আম",
    nameEn: "Gobindobhog Mango",
    category: "gobindobhog",
    type: "মৌসুমি আম",
    price: 825,
    unit: "৫ কেজি",
    minKg: 5,
    stock: "pre_order",
    emoji: "🥭",
    gradient: "linear-gradient(135deg, #d4a017, #FF6B35)"
  },
  {
    id: 6,
    name: "কাঁচা কাটিমন",
    nameEn: "Raw Katimon Mango",
    category: "katimon",
    type: "বারমাসি আম",
    price: 500,
    unit: "কেজি",
    minKg: 1,
    stock: "out_of_stock",
    emoji: "🥭",
    gradient: "linear-gradient(135deg, #006400, #228B22)"
  }
];
