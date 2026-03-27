export interface Product {
  id: string;
  name: string;
  price: number;
  retailer: string;
  category: string;
  deliveryDays: number;
  image: string;
  variants?: string[];
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
  { id: "amazon", name: "Amazon", logo: "📦" },
  { id: "walmart", name: "Walmart", logo: "🏪" },
  { id: "partycity", name: "Party City", logo: "🎉" },
  { id: "costco", name: "Costco", logo: "🛒" },
];

export const hackathonProducts: Product[] = [
  // Snacks
  { id: "s1", name: "Variety Snack Box (60 packs)", price: 28.99, retailer: "Amazon", category: "Snacks", deliveryDays: 2, image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop", variants: ["Original", "BBQ", "Cheese"] },
  { id: "s2", name: "Bulk Snack Pack (72 packs)", price: 24.99, retailer: "Costco", category: "Snacks", deliveryDays: 3, image: "https://images.unsplash.com/photo-1599490659213-e2b9527b711e?w=400&h=400&fit=crop", variants: ["Mixed"] },
  { id: "s3", name: "Party Snack Mix Box (50 packs)", price: 31.99, retailer: "Walmart", category: "Snacks", deliveryDays: 2, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop" },
  // Drinks
  { id: "d1", name: "Energy Drink 24-Pack", price: 34.99, retailer: "Amazon", category: "Drinks", deliveryDays: 2, image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400&h=400&fit=crop" },
  { id: "d2", name: "Sparkling Water 36-Pack", price: 15.99, retailer: "Costco", category: "Drinks", deliveryDays: 3, image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop" },
  { id: "d3", name: "Coffee Pods (60 count)", price: 29.99, retailer: "Walmart", category: "Drinks", deliveryDays: 1, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop" },
  // Badges & Lanyards
  { id: "b1", name: "Name Badge Kit (100 pcs)", price: 18.99, retailer: "Amazon", category: "Badges", deliveryDays: 1, image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop" },
  { id: "b2", name: "Lanyard Pack (75 pcs)", price: 14.99, retailer: "Party City", category: "Badges", deliveryDays: 2, image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=400&fit=crop" },
  { id: "b3", name: "Badge Holders + Lanyards (100)", price: 22.99, retailer: "Walmart", category: "Badges", deliveryDays: 2, image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=400&fit=crop" },
  // Tech Adapters
  { id: "t1", name: "USB-C Hub 7-in-1 (10 pack)", price: 89.99, retailer: "Amazon", category: "Tech", deliveryDays: 1, image: "https://images.unsplash.com/photo-1625723986825-b1a8ad8a40a0?w=400&h=400&fit=crop" },
  { id: "t2", name: "Power Strip 6-Outlet (10 pack)", price: 45.99, retailer: "Walmart", category: "Tech", deliveryDays: 2, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop" },
  { id: "t3", name: "HDMI Cables 6ft (20 pack)", price: 29.99, retailer: "Amazon", category: "Tech", deliveryDays: 1, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop" },
  // Decorations
  { id: "dc1", name: "Tech Theme Banner Set", price: 19.99, retailer: "Party City", category: "Decorations", deliveryDays: 2, image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop" },
  { id: "dc2", name: "LED String Lights (100ft)", price: 16.99, retailer: "Amazon", category: "Decorations", deliveryDays: 1, image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=400&fit=crop" },
  { id: "dc3", name: "Table Covers (10 pack)", price: 12.99, retailer: "Party City", category: "Decorations", deliveryDays: 2, image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=400&fit=crop" },
  // Prizes
  { id: "p1", name: "Wireless Earbuds (1st Place)", price: 49.99, retailer: "Amazon", category: "Prizes", deliveryDays: 1, image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop" },
  { id: "p2", name: "Portable Charger 20000mAh (2nd)", price: 29.99, retailer: "Walmart", category: "Prizes", deliveryDays: 2, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop" },
  { id: "p3", name: "Smart Water Bottle (3rd)", price: 24.99, retailer: "Amazon", category: "Prizes", deliveryDays: 1, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop" },
  { id: "p4", name: "Gift Cards Bundle ($50x3)", price: 150.00, retailer: "Costco", category: "Prizes", deliveryDays: 3, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop" },
];

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
