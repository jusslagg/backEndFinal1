import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import mongoose from 'mongoose';

//Inicializo la conexión a la base de datos donde tengo los usuarios
const mongoURL = 'mongodb://localhost:27017/proyectoVideojuegos';
const environment = async () => {
    await mongoose.connect(mongoURL);
}
environment();

//Inicializo la constante app para utilizar expres
const app = express();

//Configuro mi servidor para trabajar con json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Inicializo mi motor de plantillas y lo configuro
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

app.listen(8080, () => `Listening on port 8080`)