const userModel = require('../models/user-model')
const bcrypt = require('bcrypt');
const {genarateToken} = require('../ulits/genarateToken')

module.exports.registerUser = async (req, res) => {
    try{
        const {username, name, email, password, contact} = req.body;

        const user = await userModel.findOne({email});
        if(user)
        {
            req.flash("error", "Email already exist");
            return res.redirect('/');
        }
        
        bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if(err)
                    res.send(err.message);
                else {
                    const user = await userModel.create({
                        username,
                        email,
                        name,
                        password: hash,
                        contact,
                    })

                    let token = genarateToken(user);
                    res.cookie('token', token);
                    req.flash("error", "User created Successfully");
                    res.redirect('/');
                }
            })
        })
        
    } catch(err) {
       res.send(err.message);
    }

};

module.exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});
    if(!user)
    {
        req.flash("error", "Email or password incorrect");
        return res.redirect('/');
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if(result)
        {
            let token = genarateToken(user);
            res.cookie('token', token);
            return res.redirect('/shop')
        }
        else
        {
            req.flash("error", "Email or password incorrect");
            return res.redirect('/');
        }
    })
}

module.exports.logoutUser = (req, res) => {
    res.cookie('token', '');
    res.redirect('/');
}