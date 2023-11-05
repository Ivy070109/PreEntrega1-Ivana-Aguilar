import express from "express"
import productRouter from "./routes/product.router.js"
import cartsRouter from "./routes/carts.router.js"
import { __dirname } from "./utils.js"

const app = express()
const PORT = 8080

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Algo falló')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static(`${__dirname}/public`))

app.use("/api/products", productRouter)
app.use("/api/cart", cartsRouter)

app.listen(PORT,()=>{
    console.log(`Servidor Express ejecutándose en puerto ${PORT}`)
})