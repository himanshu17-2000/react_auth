const express = require("express")
const bodyparser = require('body-parser')
const app = express()
const crypt = require("bcrypt")
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/auth')

const { user } = require("./models/user")
app.use(bodyparser.json())


app.post("/api/user", (req, res) => {
    const t = new user({
        email: req.body.email,
        password: req.body.password
    })

    t.save((err, doc) => {
        if (err) res.status(400).send(err)
        res.status(200).send(doc)
    })

})

app.post('/api/user/login', (req, res) => {
    user.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) res.json({ message: 'auth failed , user ,not found' })
        user.comparePassword(req.body.password ,(err,ismatch)=>{
            if(err)throw err 
            if(!ismatch) return res.status(400).json({
                message:'wrong password'
            });
            user.generatetoken((err ,user)=>{
                if(err)return res.status(400).send(err)
                res.cookie('auth',user.token).send('ok')
            })
        })
    })
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`conneted ${port}`)
})