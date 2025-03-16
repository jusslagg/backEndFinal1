import { Router } from 'express';
import Cart from '../models/carts.model.js';

const router = Router();

// GET api/carts/:cid
router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await Cart.findById(cartId).populate('products').lean();

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    // TODO: Implement logic to delete the product from the cart

    res.json({ message: 'Product deleted from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT api/carts/:cid
router.put('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body;

    // TODO: Implement logic to update the cart with the provided products

    res.json({ message: 'Cart updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT api/carts/:cid/products/:pid
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    // TODO: Implement logic to update the product quantity in the cart

    res.json({ message: 'Product quantity updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE api/carts/:cid
router.delete('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;

    // TODO: Implement logic to delete all products from the cart

    res.json({ message: 'All products deleted from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;