const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/login', async (req,res) => {
    console.log(req.params);
        res.render('template', {
            locals: {
                title: 'Login',
            },
            partials: {
                partial: 'partial-login'
            }
        })
    }
  
)

router.get('/signup', (req, res) => {
    console.log(req.params);
    res.render('template', {
        locals: {
            title: 'Signup',
        },
        partials: {
            partial: 'partial-signup'
        }
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

router.post("/signup", (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Salt and Hash Password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    const userInstance = new userModel(null, name, email, hash); 

    userInstance.addUser().then(response => {
        if(response.id !== undefined) {
            res.redirect('/users/login')
        } else {
            res.redirect('/users/signup');
        }
        
    })
})

router.post("/login", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userInstance = new userModel(null, null, email, password);
    userInstance.login().then(response => {
        req.session.is_logged_in = response.isValid;
        if(!!response.isValid) {
            const {name, user_id} = response;
            req.session.name = name;
            req.session.user_id = user_id;
            res.redirect('/')
        } else {
            res.sendStatus(401);
        }
    })
})
module.exports = router;