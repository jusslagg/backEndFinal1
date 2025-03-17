/** Voy a crear puntos de acceso que renderizan plantillas */
import {Router} from 'express';
import productModel from '../models/product.model.js';
import Cart from '../models/carts.model.js';

const router = Router();

router.get('/', async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort;
    const query = req.query.query;
    const type = req.query.type;

    let filter = {};
    if (query && type) {
        filter[type] = { $regex: query, $options: 'i' };
    } else if (query) {
         filter = {
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } }
            ]
        };
    }

    let sortOptions = {};
    if (sort === 'asc') {
        sortOptions.price = 1;
    } else if (sort === 'desc') {
        sortOptions.price = -1;
    }

    const products = await productModel.find(filter).sort(sortOptions).lean();

    const totalDocs = products.length;
    const totalPages = Math.ceil(totalDocs / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;

    const prevLink = hasPrevPage ? `/?page=${prevPage}&limit=${limit}&sort=${sort}&query=${query}&type=${type}` : null;
    const nextLink = hasNextPage ? `/?page=${nextPage}&limit=${limit}&sort=${sort}&query=${query}&type=${type}` : null;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const docs = products.slice(startIndex, endIndex);

    const response = {
        status: "success",
        payload: docs,
        totalPages: totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        page: page,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: prevLink,
        nextLink: nextLink
    };

    res.render('index', { info: response, products: docs, sort, query, type });
})

router.get('/carts/:cid', async (req, res) => {
try {
    const cartId = req.params.cid;
    const cart = await Cart.findById(cartId).populate('products').lean();

    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    res.render('cart', { cart: cart });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
});
export default router;