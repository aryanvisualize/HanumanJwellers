import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hanuman_jewellers';

const seedProducts = [
  {
    name: "Classic 22K Gold Bangle",
    category: "Bangles",
    material: "Gold",
    purity: "22K",
    weightInGrams: 15.5,
    makingChargePercent: 18,
    imageUrl: "https://source.unsplash.com/600x600/?gold-bangles,traditional",
    description: "A timeless 22K gold bangle with intricate traditional detailing, perfect for every auspicious occasion."
  },
  {
    name: "Gems & Stones Solitaire Ring",
    category: "Rings",
    material: "Gold",
    purity: "18K",
    weightInGrams: 4.2,
    makingChargePercent: 20,
    imageUrl: "https://source.unsplash.com/600x600/?gold-ring,black",
    description: "Elegant 18K gold ring featuring a brilliant-cut solitaire gems & stones."
  },
  {
    name: "Temple Heritage Necklace",
    category: "Necklaces",
    material: "Gold",
    purity: "22K",
    weightInGrams: 45.0,
    makingChargePercent: 25,
    imageUrl: "https://source.unsplash.com/600x600/?gold-necklace,indian,bridal",
    description: "Exquisite temple jewelry necklace inspired by South Indian heritage."
  },
  {
    name: "Ruby & Emerald Choker",
    category: "Gems & Stones",
    material: "Gold",
    purity: "22K",
    weightInGrams: 32.8,
    makingChargePercent: 22,
    imageUrl: "https://source.unsplash.com/600x600/?ruby,emerald,sapphire,jewelry",
    description: "Stunning choker adorned with precious rubies and emeralds set in 22K gold."
  },
  {
    name: "Men's Platinum Band",
    category: "Rings",
    material: "Platinum",
    purity: "950",
    weightInGrams: 6.5,
    makingChargePercent: 15,
    imageUrl: "https://source.unsplash.com/600x600/?gold-ring,black",
    description: "Sleek and modern platinum band for men with a brushed finish."
  },
  {
    name: "Floral Gems & Stones Bracelet",
    category: "Bracelets",
    material: "Gold",
    purity: "18K",
    weightInGrams: 12.0,
    makingChargePercent: 20,
    imageUrl: "https://source.unsplash.com/600x600/?gold-bracelet,luxury",
    description: "Delicate floral motifs crafted in 18K rose gold and studded with fine gems & stones."
  },
  {
    name: "Antique Gold Mangalsutra",
    category: "Necklaces",
    material: "Gold",
    purity: "22K",
    weightInGrams: 18.5,
    makingChargePercent: 18,
    imageUrl: "https://source.unsplash.com/600x600/?gold-necklace,indian,bridal",
    description: "Traditional mangalsutra with an antique finish pendant and black bead chain."
  },
  {
    name: "Kundan Polki Earrings",
    category: "Rings", 
    material: "Gold",
    purity: "22K",
    weightInGrams: 24.0,
    makingChargePercent: 25,
    imageUrl: "https://source.unsplash.com/600x600/?gold-ring,black",
    description: "Grand Kundan Polki earrings with pearl drops, perfect for bridal wear."
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding');

    await Product.deleteMany();
    await Order.deleteMany();
    console.log('Cleared existing data');

    await Product.insertMany(seedProducts);
    console.log('Inserted seed products');

    console.log('Seeding complete!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
