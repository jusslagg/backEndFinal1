import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import mongoose from 'mongoose';
import Product from './models/product.model.js';

const mongoURL = 'mongodb://localhost:27017/proyectoVideojuegos';
const environment = async () => {
    await mongoose.connect(mongoURL);
}
environment();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.engine('handlebars', handlebars.engine());
app.set('views',  __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);

app.post('/createProduct', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ message: 'Product created successfully from app.js', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/aggregateProducts', async (req, res) => {
  try {
    const aggregation = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          totalPrice: { $sum: '$price' },
          count: { $sum: 1 }
        }
      }
    ]);
    res.json({ message: 'Product aggregation successful', aggregation: aggregation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(8080, () => console.log(`Listening on port 8080`));