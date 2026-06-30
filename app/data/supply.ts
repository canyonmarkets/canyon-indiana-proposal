// Distributor map for the committed Indiana DSD model.
// Source of truth: Canyon_Markets_Distributor_Map_Consolidated_1.docx — the
// "Flavors on Hand" column, curated to clean product→flavor data only.
// All internal working notes ("confirm w/ rep", brand-ownership asides, typo
// flags) are intentionally stripped — this is exec-facing.
// Frito-Lay is split back out from KDP (doc grouping artifact). Shamrock Farms
// (AZ-only) is swapped for a South Bend regional dairy DSD per the committed plan.

export type DistProduct = { name: string; flavors: string[] };

export type DistGroup = {
  id: string;
  name: string;
  channel: string;
  accent: string; // marker color
  products: DistProduct[];
};

export const DIST_GROUPS: DistGroup[] = [
  {
    id: 'coke',
    name: 'Coca-Cola',
    channel: 'Direct Store Delivery',
    accent: '#E2342E',
    products: [
      { name: 'Coca-Cola', flavors: ['Coke', 'Coke Zero', 'Diet Coke'] },
      { name: 'Sprite', flavors: [] },
      { name: 'Powerade', flavors: ['Blue', 'Fruit Punch', 'Grape'] },
      {
        name: 'Monster Energy',
        flavors: ['Original', 'Zero Sugar', 'Khaotic', 'Ultra Wild Passion', 'Ultra', 'Watermelon', 'Paradise', 'Sunrise', 'Blue Hawaii', 'Strawberry'],
      },
      { name: 'Reign', flavors: ['Razzle Berry', 'Tropical Storm', 'Orange Dreamsicle', 'Sour Gummy Worm', 'White Haze'] },
      { name: 'NOS', flavors: [] },
      { name: 'FairLife Protein', flavors: [] },
      { name: 'Starbucks RTD', flavors: ['Frappuccino Vanilla', 'Frappuccino Mocha'] },
    ],
  },
  {
    id: 'pepsi',
    name: 'Pepsi',
    channel: 'Direct Store Delivery',
    accent: '#1763B6',
    products: [
      { name: 'Pepsi', flavors: ['Pepsi', 'Diet Pepsi', 'Pepsi Zero'] },
      { name: 'Mountain Dew', flavors: [] },
      { name: 'Rockstar', flavors: ['Original', 'Fruit Punch', 'Lemonade', 'Whipped Strawberry'] },
    ],
  },
  {
    id: 'kdp',
    name: 'Keurig Dr Pepper',
    channel: 'Direct Store Delivery',
    accent: '#7E2D86',
    products: [
      { name: 'Dr Pepper', flavors: [] },
      { name: 'A&W Root Beer', flavors: [] },
      { name: 'Canada Dry', flavors: ['Ginger Ale', 'Cherry', 'Strawberry'] },
      { name: 'C4 Energy', flavors: ['Cherry', 'Jolly Rancher Apple', 'Rainbow', 'Strawberry Blast'] },
      { name: 'Ghost Energy', flavors: ['Blue Raspberry', 'Grape', 'Orange Cream', 'Original'] },
      { name: 'Orangina', flavors: [] },
      { name: 'SunnyD', flavors: [] },
      { name: 'Alani Nu', flavors: ['Lime Slush', 'Peach', 'Pink Slush'] },
    ],
  },
  {
    id: 'fritolay',
    name: 'Frito-Lay',
    channel: 'Direct Store Delivery',
    accent: '#E0A100',
    products: [
      { name: "Lay's", flavors: ['Original', 'BBQ', 'Sour Cream'] },
      { name: 'Doritos', flavors: [] },
      { name: 'Cheetos', flavors: ['Crunchy', 'Flaming Hot'] },
      { name: 'Fritos', flavors: ['BBQ Twists'] },
      { name: 'Ruffles', flavors: ['Cheddar'] },
      { name: "Chester's", flavors: ['Hot Fries'] },
      { name: 'Munchies', flavors: ['Original Mix'] },
      { name: 'Takis', flavors: [] },
      { name: 'Corn Nuts', flavors: ['Chili Picante', 'Ranch'] },
    ],
  },
  {
    id: 'hostess',
    name: 'Hostess / McKee',
    channel: 'Brand DSD',
    accent: '#C95A9B',
    products: [
      {
        name: 'Hostess',
        flavors: ['Coffee Cakes', 'Cupcakes', 'Orange Cupcakes', 'Snowballs', 'Twinkies', 'Chocolate Twinkies', "Zingers Devil's Food", 'Zingers Vanilla'],
      },
      { name: 'Little Debbie', flavors: ['Oatmeal Creme Pie'] },
    ],
  },
  {
    id: 'broadline',
    name: 'Broadline',
    channel: 'Core-Mark / McLane / Vistar',
    accent: '#2FA36B',
    products: [
      { name: 'Arizona', flavors: ['Iced Tea', 'Green Tea', 'Fruit Punch', 'Mucho Mango', 'Watermelon'] },
      { name: 'Cheez-It', flavors: [] },
      { name: 'Ritz', flavors: ['Bits Cheese', 'Bits PB', 'Bits Pizza', 'Bits Spicy Queso', 'Cheese Crackers', 'PB Crackers'] },
      { name: 'Pringles', flavors: ['Mustard', 'BBQ', 'Cheddar Sour Cream', 'Hot Ones', 'Pizza', 'Sour Cream'] },
      { name: 'David Seeds', flavors: ['BBQ', 'Original'] },
      { name: "Jack Link's", flavors: ['Original Jerky', 'Meat & Cheese'] },
      { name: "Kar's", flavors: ['Sweet & Salty'] },
      { name: "Snyder's", flavors: ['Mini Pretzels'] },
      { name: "Welch's Fruit Snacks", flavors: ["Berries n' Cherries", 'Island Fruits', 'Mixed Fruit', 'Fruit & Yogurt'] },
      { name: 'Skittles', flavors: ['Original', 'Berry'] },
      { name: 'Starburst', flavors: ['Original', 'Sour'] },
      { name: 'Sour Patch Kids', flavors: [] },
      { name: 'Mike & Ike', flavors: ['Original', 'Tropical Typhoon'] },
      { name: 'Trolli', flavors: ['Original', 'Peach Rings'] },
      { name: "Reese's Pieces", flavors: [] },
      { name: 'Red Vines', flavors: [] },
      { name: 'Rice Krispies Treats', flavors: [] },
      { name: 'Famous Amos', flavors: [] },
      { name: 'Pop-Tarts', flavors: ['Strawberry'] },
      { name: "JJ's Fruit Pies", flavors: ['Apple', 'Blackberry', 'Cherry', 'Lemon'] },
      { name: 'Nissin Noodles', flavors: ['Hot & Spicy', 'Beef', 'Chicken', 'Shrimp'] },
      { name: "Van Holten's Pickles", flavors: [] },
      { name: 'Langers Juice', flavors: ['Apple'] },
      { name: 'Velveeta Shells & Cheese', flavors: [] },
    ],
  },
  {
    id: 'frozen',
    name: 'Frozen Broadline',
    channel: 'McLane / Core-Mark / Sysco',
    accent: '#3FB6D6',
    products: [
      { name: 'Hot Pockets', flavors: ['Ham & Cheese', 'Pizza'] },
      { name: 'Jimmy Dean', flavors: ['Pancake', 'Chicken Biscuit', 'Croissant Sandwich'] },
      { name: "Tina's Burritos", flavors: ['Bean & Cheese', 'Beef & Bean', 'Red Hot Beef', 'Spicy Chimichanga', 'Green Chili'] },
      { name: 'Red Baron', flavors: ['French Bread Pizza'] },
      { name: 'White Castle', flavors: ['Sliders'] },
      { name: 'Starbucks Gelato', flavors: [] },
    ],
  },
  {
    id: 'dairy',
    name: 'Local Dairy DSD',
    channel: 'South Bend regional',
    accent: '#9CC7E8',
    products: [{ name: 'Fluid Milk', flavors: ['Chocolate', 'Strawberry', 'Vanilla', 'White'] }],
  },
];

// Real, defensible: the relationships we stand up for a build this size.
export const DSD_TO_ESTABLISH = ['Coca-Cola', 'Pepsi', 'Keurig Dr Pepper', 'Frito-Lay'];
