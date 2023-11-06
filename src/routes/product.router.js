import { Router } from 'express'
import ProductManager from '../components/ProductManager.js'

const managerProduct = new ProductManager()
const router = Router()

//parseo a número porque de otra manera es captado como un string
router.get("/", async (req, res) => {
  try {
    const products = parseInt(req.query.limit)
    if(!products) {
      return res.status(200).json(await managerProduct.getProducts())
    }
    const allProducts = await managerProduct.getProducts()
    const limitProduct = allProducts.slice(0, products)
  
    return res.status(200).json(limitProduct)
  } catch (err) {
    return console.error(err)
  }
})

router.get("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid)
    if (!pid) {
        return res.status(404).json(`El producto no existe`)
    } 
    const allProducts = await managerProduct.getProducts()
    const productById = allProducts.find(p => p.id === pid)

    res.status(200).json(productById)
  } catch (err) {
    return console.error(err)
  }
})

router.post("/", async (req, res) => {
  try {
    const newProduct = req.body
    const productAdded = await managerProduct.addProduct(newProduct)

    return res.status(200).json(productAdded)
  } catch (err) {
    return console.error(err)
  }
})

router.put("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid)
    const productUpdate = req.body
    const updatedProduct = await managerProduct.updateProduct(pid, productUpdate)

    return res.status(200).json(updatedProduct)
  } catch (err) {
    return console.error(err)
  }
})

router.delete("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid)
    const productDeleted = await managerProduct.deleteProductById(pid)

    return res.status(200).json(productDeleted)
  } catch (err) {
    return console.error(err)
  }
})

export default router