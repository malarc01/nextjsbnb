const express = require('express')
const next = require('next')
const session = require('express-session')

const SequelizeStore = require('connect-session-sequelize')(session.Store)
const User = require('./model').User
const sequelize = require('./model').sequelize

const sessionStore = new SequelizeStore({
    db:sequelize
})
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy




sessionStore.sync()

const port = parseInt(process.env.PORT,10) ||3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(()=>{
    const server = express()
    server.use(
        session({
            secret:'randomstring',
            resave:false,
            saveUninitialized: true,
            name:'nextbnb',
            cookie: {
                secure: false, // only for DEV ENVIRONMENT 
                maxAge:30*24*60*60*1000 //converts to 30 days
            },
            store: sessionStore
        },)
    )

    server.all('*',(req,res)=>{
        return handle(req,res)
    })

    server.listen(port,err=>{
        if(err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
