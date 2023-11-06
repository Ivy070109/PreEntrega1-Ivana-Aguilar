import fs from "fs"
class ProductManager {
  constructor() {
    this.path = './files/products.json'
    this.products = []
  }

  //leer productos
  readProducts = async () => {
    try {
      const response = await fs.promises.readFile(this.path, { encoding: 'utf-8' })
      return JSON.parse(response)  
    } catch (err) {
      return console.error(err)
    }
  }

  //Objetener productos
  getProducts = async () => {
    try {
      const productList = await this.readProducts()
      return productList
    } catch (err) {
      return console.error(err)
    }
  }

  //Obtener productos por id
  getProductbyId = async (id) => {
    try {
      const productById = await this.exist(id)
      //con éste método asignado puedo reemplazar y simplificar todos los métodos find
      if(!productById) {
          return "Ese producto no existe"
      } else {
          return productById
      }
    } catch (err) {
      return console.error(err)
    }
  }
  
  //Generar id autoincrementable
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

  //Creación de producto
  addProduct = async (obj) => {
    try {
      const {title, description, price, thumbnail, category, status=true, code, stock} = obj

      if (!title || !description || !price || !category || !code ||!status || !stock || !thumbnail) {
        return ("Debes proporcionar todos los campos completos. Todos los valores son obligatorios.")
      } else {
        const productArray = await this.getProducts({})
        const existCodeInProducts = productArray.some((elemento) => elemento.code === code)
        if (existCodeInProducts) {
            return(`El código ${code} no puede repetirse`)
        } else {
        const id = await this.generateId()
        const newProduct = {
          id,
          title,
          description,
          price,
          category,
          status,
          thumbnail,
          code,
          stock,
          }
        productArray.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(productArray, null, 2))
        return "Producto agregado"
        }
      }
    } catch (err) {
      return console.error(err)
    }
  }

  //Borrar producto
  deleteProductById = async (id) => {
    try {
      const productDetected = await this.readProducts()
      const productFilter = productDetected.filter(products => products.id != id)
      await fs.promises.writeFile(this.path, JSON.stringify(productFilter, null, 2))
  
      return `El producto con el ID ${id} ha sido eliminado`  
    } catch (err) {
      return console.error(err)
    }
  }

  //Actualizar productos
  updateProduct = async (id, product) => {
    try {
      const productDetected = await this.readProducts()
      const loadProduct = productDetected.filter(product => product.id != id)
      await fs.promises.writeFile(this.path, JSON.stringify(loadProduct, null, 2))
      const oldProduct = await this.readProducts()
      const modifiedProduct = [
          {id: id, ...product}, ...oldProduct
      ]
      await fs.promises.writeFile(this.path, JSON.stringify(modifiedProduct, null, 2))

      return `El producto ha sido actualizado.`     
    } catch (error) {
      return console.error(error)
    }
  }
}

export default ProductManager