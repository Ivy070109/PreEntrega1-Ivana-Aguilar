import { Router } from "express"
import CartManager from "../components/CartManager.js"

const cartsManager = new CartManager()
const router = Router()

router.post('/', async (req, res) => {
    try {
        const newCart = await cartsManager.addCarts()

        return res.status(200).json(newCart)
    } catch (err) {
        return console.error(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const cartsArray = await cartsManager.readCarts()
        return res.status(200).json(cartsArray)
    } catch (err) {
        return console.error(err)
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid
        const cartId = await cartsManager.getCartById(cid)

        return res.status(200).json(cartId)
    } catch (err) {
        return console.error(err)
    }
})

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid)
        const productInCart = await cartsManager.addProductInCart(cartId, productId)
        
        return res.status(200).json(productInCart)
    } catch (err) {
        return console.error(err)
    }
})

export default router