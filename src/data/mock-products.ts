export type PricingTier = "retail" | "wholesale" | "bulk";

export interface Product {
  id: string;
  name: string;
  price: number;
  wholesalePrice?: number;
  bulkPrice?: number;
  retailer: string;
  category: string;
  deliveryDays: number;
  image: string;
  variants?: string[];
  tier?: PricingTier;
  minQtyWholesale?: number;
  minQtyBulk?: number;
  score?: number;
  scoreBreakdown?: {
    cost: number;
    delivery: number;
    preferenceMatch: number;
    setCoherence: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export const retailers = [
  { id: "jumia", name: "Jumia", logo: "🛍️" },
  { id: "konga", name: "Konga", logo: "📦" },
  { id: "supermart", name: "Supermart.ng", logo: "🛒" },
  { id: "spar", name: "SPAR Nigeria", logo: "🏬" },
  { id: "shoprite", name: "Shoprite", logo: "🏪" },
  { id: "payporte", name: "PayPorte", logo: "👜" },
];

export const hackathonProducts: Product[] = [
  // ─── Snacks ───────────────────────────────
  { id: "s1", name: "Minimie Chin Chin (50 packs)", price: 12500, wholesalePrice: 10000, bulkPrice: 8500, retailer: "Jumia", category: "Snacks", deliveryDays: 2, image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop", minQtyWholesale: 5, minQtyBulk: 20, variants: ["Original", "Coconut", "Spicy"] },
  { id: "s2", name: "Gala Sausage Roll (60 packs)", price: 18000, wholesalePrice: 15000, bulkPrice: 12000, retailer: "Shoprite", category: "Snacks", deliveryDays: 1, image: "https://images.unsplash.com/photo-1599490659213-e2b9527b711e?w=400&h=400&fit=crop", minQtyWholesale: 5, minQtyBulk: 20 },
  { id: "s3", name: "Pringles Assorted (48 cans)", price: 28500, wholesalePrice: 24000, bulkPrice: 20000, retailer: "Konga", category: "Snacks", deliveryDays: 2, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop", minQtyWholesale: 3, minQtyBulk: 10 },
  { id: "s4", name: "Bigi Puff Puff Snacks (100 pcs)", price: 8500, wholesalePrice: 7000, bulkPrice: 5500, retailer: "Supermart.ng", category: "Snacks", deliveryDays: 1, image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&h=400&fit=crop", minQtyWholesale: 10, minQtyBulk: 50 },

  // ─── Drinks ───────────────────────────────
  { id: "d1", name: "Hollandia Yoghurt (24 pack)", price: 14400, wholesalePrice: 12000, bulkPrice: 9600, retailer: "SPAR Nigeria", category: "Drinks", deliveryDays: 1, image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400&h=400&fit=crop", minQtyWholesale: 5, minQtyBulk: 20 },
  { id: "d2", name: "Coca-Cola 50cl (36 bottles)", price: 10800, wholesalePrice: 9000, bulkPrice: 7200, retailer: "Shoprite", category: "Drinks", deliveryDays: 1, image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop", minQtyWholesale: 5, minQtyBulk: 15 },
  { id: "d3", name: "Nescafé 3-in-1 Sachets (100 pcs)", price: 9500, wholesalePrice: 8000, bulkPrice: 6500, retailer: "Jumia", category: "Drinks", deliveryDays: 2, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop", minQtyWholesale: 10, minQtyBulk: 50 },
  { id: "d4", name: "Eva Water 75cl (24 pack)", price: 4200, wholesalePrice: 3500, bulkPrice: 2800, retailer: "Supermart.ng", category: "Drinks", deliveryDays: 1, image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop", minQtyWholesale: 10, minQtyBulk: 30 },

  // ─── Badges & Lanyards ────────────────────
  { id: "b1", name: "Name Badge Kit (100 pcs)", price: 15000, wholesalePrice: 12500, bulkPrice: 10000, retailer: "Konga", category: "Badges", deliveryDays: 2, image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop", minQtyWholesale: 3, minQtyBulk: 10 },
  { id: "b2", name: "Custom Lanyard Pack (75 pcs)", price: 11250, wholesalePrice: 9500, bulkPrice: 7500, retailer: "Jumia", category: "Badges", deliveryDays: 3, image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=400&fit=crop", minQtyWholesale: 5, minQtyBulk: 15 },
  { id: "b3", name: "Badge Holders + Lanyards (100)", price: 18500, wholesalePrice: 15500, bulkPrice: 12000, retailer: "PayPorte", category: "Badges", deliveryDays: 2, image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=400&fit=crop", minQtyWholesale: 3, minQtyBulk: 10 },

  // ─── Tech & Gadgets ───────────────────────
  { id: "t1", name: "USB-C Hub 7-in-1 (10 pack)", price: 75000, wholesalePrice: 65000, bulkPrice: 55000, retailer: "Jumia", category: "Tech", deliveryDays: 2, image: "https://images.unsplash.com/photo-1625723986825-b1a8ad8a40a0?w=400&h=400&fit=crop", minQtyWholesale: 3, minQtyBulk: 10 },
  { id: "t2", name: "Power Strip 6-Outlet (10 pack)", price: 35000, wholesalePrice: 29000, bulkPrice: 24000, retailer: "Konga", category: "Tech", deliveryDays: 2, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop", minQtyWholesale: 5, minQtyBulk: 15 },
  { id: "t3", name: "HDMI Cables 3m (20 pack)", price: 24000, wholesalePrice: 20000, bulkPrice: 16000, retailer: "Jumia", category: "Tech", deliveryDays: 1, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", minQtyWholesale: 5, minQtyBulk: 20 },

  // ─── Decorations ──────────────────────────
  { id: "dc1", name: "Tech Theme Banner Set", price: 8500, wholesalePrice: 7000, bulkPrice: 5500, retailer: "Konga", category: "Decorations", deliveryDays: 2, image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop", minQtyWholesale: 5, minQtyBulk: 20 },
  { id: "dc2", name: "LED String Lights (30m)", price: 6500, wholesalePrice: 5500, bulkPrice: 4500, retailer: "Jumia", category: "Decorations", deliveryDays: 1, image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=400&fit=crop", minQtyWholesale: 10, minQtyBulk: 30 },
  { id: "dc3", name: "Table Covers (10 pack)", price: 5500, wholesalePrice: 4500, bulkPrice: 3500, retailer: "Shoprite", category: "Decorations", deliveryDays: 1, image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=400&fit=crop", minQtyWholesale: 10, minQtyBulk: 25 },

  // ─── Prizes ───────────────────────────────
  { id: "p1", name: "Oraimo FreePods Pro (1st Place)", price: 22000, wholesalePrice: 18500, bulkPrice: 15000, retailer: "Jumia", category: "Prizes", deliveryDays: 1, image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop", minQtyWholesale: 5, minQtyBulk: 20 },
  { id: "p2", name: "Romoss 20000mAh Power Bank (2nd)", price: 12500, wholesalePrice: 10500, bulkPrice: 8500, retailer: "Konga", category: "Prizes", deliveryDays: 2, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop", minQtyWholesale: 5, minQtyBulk: 15 },
  { id: "p3", name: "Smart Water Bottle (3rd Place)", price: 8500, wholesalePrice: 7000, bulkPrice: 5500, retailer: "Jumia", category: "Prizes", deliveryDays: 1, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop", minQtyWholesale: 5, minQtyBulk: 20 },
  { id: "p4", name: "Jumia Gift Cards Bundle (₦50k)", price: 50000, wholesalePrice: 47500, bulkPrice: 45000, retailer: "Jumia", category: "Prizes", deliveryDays: 1, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop", minQtyWholesale: 3, minQtyBulk: 10 },
];

export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

export function getEffectivePrice(product: Product, tier: PricingTier = "retail"): number {
  if (tier === "bulk" && product.bulkPrice) return product.bulkPrice;
  if (tier === "wholesale" && product.wholesalePrice) return product.wholesalePrice;
  return product.price;
}

export function scoreProduct(product: Product, budget: number, deadlineDays: number): Product {
  const costScore = Math.max(0, 100 - (product.price / budget) * 100);
  const deliveryScore = product.deliveryDays <= deadlineDays ? 100 : Math.max(0, 100 - (product.deliveryDays - deadlineDays) * 30);
  const preferenceMatch = 70 + Math.random() * 30;
  const setCoherence = 60 + Math.random() * 40;
  const totalScore = costScore * 0.3 + deliveryScore * 0.3 + preferenceMatch * 0.2 + setCoherence * 0.2;

  return {
    ...product,
    score: Math.round(totalScore),
    scoreBreakdown: {
      cost: Math.round(costScore),
      delivery: Math.round(deliveryScore),
      preferenceMatch: Math.round(preferenceMatch),
      setCoherence: Math.round(setCoherence),
    },
  };
}

export function getRecommendedCart(budget: number, deadlineDays: number): Product[] {
  const categories = ["Snacks", "Drinks", "Badges", "Tech", "Decorations", "Prizes"];
  const recommended: Product[] = [];

  for (const cat of categories) {
    const catProducts = hackathonProducts
      .filter((p) => p.category === cat)
      .map((p) => scoreProduct(p, budget, deadlineDays))
      .sort((a, b) => (b.score || 0) - (a.score || 0));

    if (catProducts.length > 0) {
      recommended.push(catProducts[0]);
    }
  }

  return recommended;
}
