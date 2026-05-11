import express from 'express'
import fs from 'fs'
import multer from 'multer'
import mongoose from 'mongoose'
import Product from './models/Product.js'

const app = express()

const upload = multer({dest: 'public/images'})

await mongoose.connect("mongodb://localhost:27017/")


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index', {
        shaman: "МОЙ ССАЙТ!",
        cssname: "products"
    })
})

app.get('/products', async (req, res) => {
    const myproducts = await Product.find()

    res.render('products', {
        shaman: 'ПРОДУКТЫ!',
        cssname: 'product',
        products: myproducts
    })
})

app.get('/cart', (req, res) => {
    res.render('cart', {
        shaman: 'ПРОДУКТЫ!',
        cssname: 'cart'
    })
})

app.get('/products/add', (req, res) => {
    res.render('add-product', {
        shaman: 'Добавление',
        cssname: 'add-product'
    })
})

app.post('/products/add', upload.single('image'), async (req, res) => {
    
    await Product.create({
        name: req.body.name,
        price: Number(req.body.price),
        image: '/images/' + req.file.filename,
        description: req.body.description
    })

    res.redirect('/products')
    
})


app.listen(5000)