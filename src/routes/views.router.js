/** Voy a crear puntos de acceso que renderizan plantillas */
import {Router} from 'express';
import productModel from '../models/product.model.js';
import Cart from '../models/carts.model.js';

const router = Router();

router.get('/', async (req, res) => {

    const elementosPorPagina = req.query.limit ?? 10;
    const pagActual = req.query.page ?? 1;
    const sortBy = req.query.sort;
    const searchQuery = req.query.query;
    const searchType = req.query.type;

    let filter = {};
    if (searchQuery && searchType) {
        filter[searchType] = { $regex: searchQuery, $options: 'i' };
    } else if (searchQuery) {
         filter = {
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } },
                { category: { $regex: searchQuery, $options: 'i' } }
            ]
        };
    }

    let sortOptions = {};
    if (sortBy === 'asc') {
        sortOptions.price = 1;
    } else if (sortBy === 'desc') {
        sortOptions.price = -1;
    }

    let infoPaginate = await productModel.paginate(
        filter,
        {
            limit: elementosPorPagina,
            page: pagActual,
            sort: sortOptions,
            lean: true
        }
    );

    const { docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage } = infoPaginate;

    const prevLink = hasPrevPage ? `/products?limit=${elementosPorPagina}&page=${prevPage}&sort=${sortBy}&query=${searchQuery}&type=${searchType}` : null;
    const nextLink = hasNextPage ? `/products?limit=${elementosPorPagina}&page=${nextPage}&sort=${sortBy}&query=${searchQuery}&type=${searchType}` : null;

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

    res.json(response);
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