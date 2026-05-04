import express from 'express'
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        shaman: "МОЙ ССАЙТ!",
        cssname: "products"
    })
})

app.get('/products', (req, res) => {
    res.render('products', {
        shaman: 'ПРОДУКТЫ!',
        cssname: 'products'
    })
})

app.get('/cart', (req, res) => {
    res.render('cart', {
        shaman: 'ПРОДУКТЫ!',
        cssname: 'cart'
    })
})

app.listen(5000)