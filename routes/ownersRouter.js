const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model')

router.get('/', function(req, res) {
    res.send("Lets, looks good!");
})

if(process.env.NODE_ENV == 'development'){
    router.post('/create', async (req, res) => {
        const owner = await ownerModel.find();
        if(owner.length > 0)
            res.status(502).send("You does not have access to create owner");
        else
        {
            try{
                const {name, email, password, contact} = req.body;
                const owner = await ownerModel.create({
                    name,
                    email,
                    password,
                    contact,
                })
                res.status(201).send(owner);
            }
            catch{(err) => {
                res.send(err.message);
            }}
        }
    })
}

router.get('/admin', (req, res) => {
    let success = req.flash("success");
    res.render('createproducts', {success});
})

module.exports = router;