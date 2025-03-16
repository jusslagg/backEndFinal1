import mongoose from 'mongoose';
import Product from '../models/product.model.js';

const products = [
  { "title": "PlayStation 5", "description": "Consola de última generación de Sony.", "price": 499.99, "code": "PS5-001", "stock": 100, "category": "Consolas" },
  { "title": "Xbox Series X", "description": "Consola potente y rápida de Microsoft.", "price": 499.99, "code": "XSX-001", "stock": 50, "category": "Consolas" },
  { "title": "Nintendo Switch", "description": "Consola híbrida de Nintendo.", "price": 299.99, "code": "NSW-001", "stock": 120, "category": "Consolas" },
  { "title": "The Legend of Zelda: Breath of the Wild", "description": "Aventura épica de mundo abierto.", "price": 59.99, "code": "ZELDA-001", "stock": 200, "category": "Videojuegos" },
  { "title": "Super Mario Odyssey", "description": "Juego de aventuras con Mario.", "price": 49.99, "code": "SMO-001", "stock": 150, "category": "Videojuegos" },
  { "title": "FIFA 23", "description": "El simulador de fútbol más popular.", "price": 59.99, "code": "FIFA23-001", "stock": 80, "category": "Videojuegos" },
  { "title": "Minecraft", "description": "Juego de construcción y aventuras.", "price": 26.99, "code": "MC-001", "stock": 200, "category": "Videojuegos" },
  { "title": "Red Dead Redemption 2", "description": "Aventura de acción en el viejo oeste.", "price": 39.99, "code": "RDR2-001", "stock": 100, "category": "Videojuegos" },
  { "title": "Call of Duty: Modern Warfare 2", "description": "FPS de acción militar.", "price": 59.99, "code": "CODMW2-001", "stock": 150, "category": "Videojuegos" },
  { "title": "Gran Turismo 7", "description": "Simulador de carreras de alta calidad.", "price": 59.99, "code": "GT7-001", "stock": 100, "category": "Videojuegos" },
  { "title": "Horizon Forbidden West", "description": "Aventura post-apocalíptica en un mundo abierto.", "price": 59.99, "code": "HFW-001", "stock": 70, "category": "Videojuegos" },
  { "title": "Spider-Man: Miles Morales", "description": "Juego de acción con el nuevo Spider-Man.", "price": 49.99, "code": "SM-MM-001", "stock": 90, "category": "Videojuegos" },
  { "title": "The Elder Scrolls V: Skyrim", "description": "Juego de rol épico en un mundo abierto.", "price": 39.99, "code": "TES-V-001", "stock": 120, "category": "Videojuegos" },
  { "title": "Animal Crossing: New Horizons", "description": "Juego de simulación y vida en isla.", "price": 59.99, "code": "ACNH-001", "stock": 200, "category": "Videojuegos" },
  { "title": "Halo Infinite", "description": "FPS de ciencia ficción con Master Chief.", "price": 59.99, "code": "HALO-001", "stock": 60, "category": "Videojuegos" }
];

const populateProducts = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/proyectoVideojuegos', { // Replace with your MongoDB connection string
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Product.insertMany(products)
      .then(() => {
        console.log('Products added successfully to the proyectoVideojuegos collection!');
      })
      .catch(err => {
        console.error('Error adding products to the proyectoVideojuegos collection:', err);
      });

    mongoose.connection.close();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

populateProducts();