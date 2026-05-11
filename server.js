import express from 'express'
import fs from 'fs'
import multer from 'multer'
const app = express()

const upload = multer({dest: 'public/images'})


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index', {
        shaman: "МОЙ ССАЙТ!",
        cssname: "products"
    })
})

app.get('/products', (req, res) => {
    const data = fs.readFileSync('data.json', 'utf-8')
    const myproducts = JSON.parse(data);

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

app.post('/products/add', upload.single('image'), (req, res) => {
    const data = fs.readFileSync('data.json', 'utf-8')
    const products = JSON.parse(data)

    const newProd = {
        id: products.length > 0 ? products.length + 1 : 1,
        name: req.body.name,
        price: Number(req.body.price),
        image: '/images/' + req.file.filename
    }

    products.push(newProd)
    fs.writeFileSync('data.json', JSON.stringify(products, null, 2))

    res.redirect('/products')
    
})


app.listen(5000)