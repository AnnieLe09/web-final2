const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const app = express();
const hbs = expressHbs.create({
    layoutsDir: path.join(__dirname, 'views/manager/layouts'),
    partialsDir: path.join(__dirname, 'views/manager/partials'),
    extname: 'hbs',
    defaultLayout: 'layout'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'views/manager/products')));

const {products} = require('./public/data/products.js');
app.get('/list', (req, res) =>{
    res.render('manager/products/product-list-page', {products});
});
app.get('/:id', (req, res) =>{
    const product = products[parseInt(req.params.id)];
    res.render('manager/products/product-detail-page', {product});
});


app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), ()=>{
    console.log(`server is running on port ${app.get('port')}`);
});