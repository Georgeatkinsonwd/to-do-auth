const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')
const todosRoutes = require('./routes/todos')

require('dotenv').config({path: './config/.env'})

// passport config
require('./config/passport')(passport)

app.set('view-engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())



connectDB()

// Session
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_STRING})
    })
)

// Passport 
app.use(passport.initialize())
app.use(passport.session())


app.use('/', homeRoutes)
app.use('/auth',authRoutes)
app.use('/todos',todosRoutes)







app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on PORT:${process.env.PORT}`)
})