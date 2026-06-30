// Worker-facing favorites catalog for the Canyon Menu app — VARIANT level.
// Brands carry their real variants (from app/data/supply.ts, sourced from the
// Canyon distributor doc). Brands with 2+ variants render as a labeled group;
// brands with 0–1 variant render as a single item.
// NOTE: Celsius isn't in the distributor doc (moving to Pepsi DSD) — its variants
// are common real SKUs; trim to the lineup Canyon actually stocks.

import { Zap, CupSoda, Droplets, Coffee, Flame, Beef, Candy, Cookie, Pizza, IceCreamCone, type LucideIcon } from 'lucide-react';

export type MenuBrand = { brand: string; variants: string[] };
export type MenuCategory = { id: string; name: string; icon: LucideIcon; brands: MenuBrand[] };

export const MENU: MenuCategory[] = [
  {
    id: 'energy',
    name: 'Energy Drinks',
    icon: Zap,
    brands: [
      { brand: 'Celsius', variants: ['Arctic Vibe', 'Fuji Apple Pear', 'Sparkling Orange', 'Kiwi Guava', 'Tropical Vibe', 'Sparkling Wild Berry', 'Cola', 'Peach Vibe'] },
      { brand: 'Monster Energy', variants: ['Original', 'Zero Sugar', 'Khaotic', 'Ultra Wild Passion', 'Ultra', 'Watermelon', 'Paradise', 'Sunrise', 'Blue Hawaii', 'Strawberry'] },
      { brand: 'Reign', variants: ['Razzle Berry', 'Tropical Storm', 'Orange Dreamsicle', 'Sour Gummy Worm', 'White Haze'] },
      { brand: 'C4 Energy', variants: ['Cherry', 'Jolly Rancher Apple', 'Rainbow', 'Strawberry Blast'] },
      { brand: 'Ghost Energy', variants: ['Blue Raspberry', 'Grape', 'Orange Cream', 'Original'] },
      { brand: 'Rockstar', variants: ['Original', 'Fruit Punch', 'Lemonade', 'Whipped Strawberry'] },
      { brand: 'Alani Nu', variants: ['Lime Slush', 'Peach', 'Pink Slush'] },
      { brand: 'NOS', variants: [] },
    ],
  },
  {
    id: 'soda',
    name: 'Soda',
    icon: CupSoda,
    brands: [
      { brand: 'Coca-Cola', variants: ['Coke', 'Coke Zero', 'Diet Coke'] },
      { brand: 'Pepsi', variants: ['Pepsi', 'Diet Pepsi', 'Pepsi Zero'] },
      { brand: 'Canada Dry', variants: ['Ginger Ale', 'Cherry', 'Strawberry'] },
      { brand: 'Sprite', variants: [] },
      { brand: 'Mountain Dew', variants: [] },
      { brand: 'Dr Pepper', variants: [] },
      { brand: 'A&W Root Beer', variants: [] },
      { brand: 'Orangina', variants: [] },
    ],
  },
  {
    id: 'sports',
    name: 'Sports & Juice',
    icon: Droplets,
    brands: [
      { brand: 'Powerade', variants: ['Blue', 'Fruit Punch', 'Grape'] },
      { brand: 'Arizona', variants: ['Iced Tea', 'Green Tea', 'Fruit Punch', 'Mucho Mango', 'Watermelon'] },
      { brand: 'SunnyD', variants: [] },
      { brand: 'Langers Juice', variants: [] },
    ],
  },
  {
    id: 'coffee',
    name: 'Coffee & Protein',
    icon: Coffee,
    brands: [
      { brand: 'Starbucks Frappuccino', variants: ['Vanilla', 'Mocha'] },
      { brand: 'FairLife Protein', variants: [] },
    ],
  },
  {
    id: 'chips',
    name: 'Chips',
    icon: Flame,
    brands: [
      { brand: "Lay's", variants: ['Original', 'BBQ', 'Sour Cream'] },
      { brand: 'Cheetos', variants: ['Crunchy', 'Flaming Hot'] },
      { brand: 'Pringles', variants: ['Mustard', 'BBQ', 'Cheddar Sour Cream', 'Hot Ones', 'Pizza', 'Sour Cream'] },
      { brand: 'Doritos', variants: [] },
      { brand: 'Fritos', variants: [] },
      { brand: 'Ruffles', variants: [] },
      { brand: "Chester's", variants: [] },
      { brand: 'Munchies', variants: [] },
      { brand: 'Takis', variants: [] },
    ],
  },
  {
    id: 'crackers',
    name: 'Crackers & Jerky',
    icon: Beef,
    brands: [
      { brand: 'Ritz', variants: ['Bits Cheese', 'Bits PB', 'Bits Pizza', 'Bits Spicy Queso', 'Cheese Crackers', 'PB Crackers'] },
      { brand: "Jack Link's", variants: ['Original Jerky', 'Meat & Cheese'] },
      { brand: 'David Seeds', variants: ['BBQ', 'Original'] },
      { brand: 'Corn Nuts', variants: ['Chili Picante', 'Ranch'] },
      { brand: 'Cheez-It', variants: [] },
      { brand: "Kar's Trail Mix", variants: [] },
      { brand: "Snyder's Pretzels", variants: [] },
      { brand: "Van Holten's Pickle", variants: [] },
    ],
  },
  {
    id: 'candy',
    name: 'Candy & Fruit Snacks',
    icon: Candy,
    brands: [
      { brand: "Welch's Fruit Snacks", variants: ["Berries n' Cherries", 'Island Fruits', 'Mixed Fruit', 'Fruit & Yogurt'] },
      { brand: 'Skittles', variants: ['Original', 'Berry'] },
      { brand: 'Starburst', variants: ['Original', 'Sour'] },
      { brand: 'Mike & Ike', variants: ['Original', 'Tropical Typhoon'] },
      { brand: 'Trolli', variants: ['Original', 'Peach Rings'] },
      { brand: 'Sour Patch Kids', variants: [] },
      { brand: "Reese's Pieces", variants: [] },
      { brand: 'Red Vines', variants: [] },
    ],
  },
  {
    id: 'cookies',
    name: 'Cookies & Pastry',
    icon: Cookie,
    brands: [
      { brand: 'Hostess', variants: ['Coffee Cakes', 'Cupcakes', 'Orange Cupcakes', 'Snowballs', 'Twinkies', 'Chocolate Twinkies', "Zingers Devil's Food", 'Zingers Vanilla'] },
      { brand: "JJ's Fruit Pies", variants: ['Apple', 'Blackberry', 'Cherry', 'Lemon'] },
      { brand: 'Little Debbie', variants: [] },
      { brand: 'Pop-Tarts', variants: [] },
      { brand: 'Famous Amos', variants: [] },
      { brand: 'Rice Krispies Treats', variants: [] },
    ],
  },
  {
    id: 'hot',
    name: 'Hot & Frozen',
    icon: Pizza,
    brands: [
      { brand: "Tina's Burritos", variants: ['Bean & Cheese', 'Beef & Bean', 'Red Hot Beef', 'Spicy Chimichanga', 'Green Chili'] },
      { brand: 'Nissin Noodles', variants: ['Hot & Spicy', 'Beef', 'Chicken', 'Shrimp'] },
      { brand: 'Jimmy Dean', variants: ['Pancake', 'Chicken Biscuit', 'Croissant Sandwich'] },
      { brand: 'Hot Pockets', variants: ['Ham & Cheese', 'Pizza'] },
      { brand: 'Red Baron Pizza', variants: [] },
      { brand: 'White Castle Sliders', variants: [] },
      { brand: 'Velveeta Shells & Cheese', variants: [] },
    ],
  },
  {
    id: 'treats',
    name: 'Treats & Dairy',
    icon: IceCreamCone,
    brands: [
      { brand: 'Milk', variants: ['Chocolate', 'Strawberry', 'Vanilla', 'White'] },
      { brand: 'Starbucks Gelato', variants: [] },
    ],
  },
];

export const TOTAL_ITEMS = MENU.reduce(
  (sum, c) => sum + c.brands.reduce((b, br) => b + Math.max(br.variants.length, 1), 0),
  0,
);
