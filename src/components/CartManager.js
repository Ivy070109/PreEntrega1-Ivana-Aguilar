import fs from 'fs'
import { nanoid } from 'nanoid'
import ProductManager from '../components/ProductManager.js'
//lo importo para poder ver lo que los carritos incluyan

const products = new ProductManager()
class CartManager{
    constructor() {
        this.path = './files/carts.json'
        this.cart = []
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

    exist = async (cid) => {
        try {
            const carts = await this.readCarts()
            const findCart = carts.find(cart => cart.id === cid)

            return findCart
        } catch (err) {
            return console.error(err)
        }
    }

    writeCarts = async (carts) => {
        try {
            const write = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))

            return write
        } catch (err) {
            return console.error(err)
        }
    }

      //Generar id autoincrementable
    generateCartId = async () => {
        try {
            if (fs.existsSync(this.path)) {
            //busco la existencia de ésta ruta con éste método predeterminado
                const cartList = await this.readCarts()
                const counter = cartList.length
                if (counter == 0) {
                    return 1
                } else {
                    return cartList[counter - 1 ].id + 1
                }
            }
        } catch (err) {
            return console.error(err)
        }
    }

    addCarts = async () => {
        try {            
            const oldCarts = await this.readCarts()
            //const id = this.generateCartId()
            const id = nanoid(2)            //establezco un id automático e irrepetible de una sola cifra
            const newCart = [{id : id, products : []}, ...oldCarts]
            await this.writeCarts(newCart)

            return "Carrito Agregado"    
        } catch (err) {
            return console.error(err)
        }
    }

    getCartById = async (cid) => {
        try {
            const cartById = await this.exist(cid)
          //con éste método asignado puedo reemplazar y simplificar todos los métodos find
            if(!cartById) {
                return "Ese producto no existe"
            } else {
                return cartById
            }
        } catch (err) {
            return console.error(err)
        }
    }

    addProductInCart = async (cartId, productId) => {
        try {
            const cartsArray = await this.readCarts()
            const cart = cartsArray.find(e => e.id === cartId)
            const productIndex = cart.products.findIndex(p => p.productId === productId)

            if (productIndex !== -1) {
                cart.products[productIndex].quantity++
            } else {
                cart.products.push({
                    productId,
                    quantity: 1
                })
            }
            await this.writeCarts(cartsArray)

            return "Producto Agregado al carrito"
        } catch (err) {
            return console.error(err)
        }
    }
}

//const carts = new CartManager()
//carts.addCarts()
//carts.getCartById(1)

export default CartManager