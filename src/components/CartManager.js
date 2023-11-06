import fs from 'fs'
import { nanoid } from 'nanoid'
import ProductManager from '../components/ProductManager.js'
//lo importo para poder ver lo que los carritos incluyan

const productAll = new ProductManager
class CartManager {
    constructor() {
        this.cart = []
        this.path = './files/carts.json'
    }

    //leer los carritos
    readCarts = async () => {
        try {
            const carts = await fs.promises.readFile(this.path, { encoding: 'utf-8'})
            const cartsArray = JSON.parse(carts)

            return cartsArray
        } catch (err) {
            return console.error(err)
        }
    }

    existCart = async (cid) => {
        try {
            const carts = await this.readCarts()
            const findCart = carts.find(cart => cart.id === cid)

            return findCart
        } catch (err) {
            return console.error(err)
        }
    }

    writeCarts = async (carts) => {
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
    }

    generateId = async () => {
        try {
            if (fs.existsSync(this.path)) {
                //busco la existencia de ésta ruta con éste método predeterminado
                const productList = await this.readProducts()
                const counter = productList.length
                if (counter == 0) {
                return 1
                } else {
                return productList[counter - 1 ].id + 1
                }
            }
        } catch (err) {
            return console.error(err)
        }
    }

    addCarts = async () => {
        const oldCarts = await this.readCarts()
        const id = await this.generateId()
        const newCart = [{id, products : []}, ...oldCarts]
        oldCarts.push(newCart)
        await this.writeCarts(oldCarts)

        return "Carrito Agregado"
    }

    getCartById = async (id) => {
        const cartById = await this.exist(id)
            if(!cartById) {
                return "Carrito no encontrado"
            }
        return cartById
    }

    addProductInCart = async (cartId, productId) => {
        const listaCarts = await this.readCarts()
            const cart = listaCarts.find(e => e.id === cartId)
            const productIndex = cart.products.findIndex(p => p.productId === productId);
      
            if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
            } else {
            cart.products.push({
                productId,
                quantity: 1
            })
        }
        await this.writeCarts(listaCarts)
        return "Producto Agregado al carrito"
    }
}
export default CartManager