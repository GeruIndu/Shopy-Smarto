const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/', (req, res) => {
    let error = req.flash("error");
    res.render('index', {error, loggedOut: true});
})

router.get('/shop', isLoggedIn, async (req, res) => {
    const products = await productModel.find();
    const success = req.flash('success')
    res.render('shop', {products, success});
})

router.get('/cart/:productid' , isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Item added successfully");
    res.redirect('/shop');
})

router.get('/cart', isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({email: req.user.email}).populate("cart");
    let bill = 0;
    let discount = 0;
    user.cart.forEach(item => {
        bill += item.price;
        discount += item.discount;
    });

    res.render('cart', {user, bill, discount})
});

router.get('/cart/delete/:productid' , isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({email: req.user.email});
    const index = user.cart.indexOf(req.params.productid);
    user.cart.splice(index, 1);
    await user.save();
    res.redirect('/cart');
})

module.exports = router;