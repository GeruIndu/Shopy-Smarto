const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model')

router.get('/', function(req, res) {
    res.send("Lets, looks good!");
})

router.post('/create', upload.single('image') , async (req, res) => {
    try {
        let {name, price, discount, bgcolor, panelcolor, textcolor} = req.body;
        const product = await productModel.create({
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            image: req.file.buffer
        })
        req.flash("success", "Product create successfully");
        res.redirect('/owners/admin');
    }
    catch(err) {
        res.send(err.message);
    }
})

module.exports = router;