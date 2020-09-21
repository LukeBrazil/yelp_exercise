const express = require('express');
const router = express.Router();
const usersModel = require('../models/user');

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
            title: 'Signup'
        },
        partials: {
            partial: 'partial-signup'
        }
    })
})


router.post("/signup", async (req,res) => {
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    await usersModel.addUser(name, email, password);
    res.redirect('back');
})

module.exports = router;