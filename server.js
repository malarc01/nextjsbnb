const express = require('express')
const next = require('next')
const session = require('express-session')

const SequelizeStore = require('connect-session-sequelize')(session.Store)
// const User = require('./model/user.js')
import User from './models/user.js'
import House from './models/house.js'
import Review from './models/review.js'

User.sync({ alter: true })
console.log("User.sync({ alter: true }) called")
House.sync({ alter: true })
console.log("House.sync({ alter: true }) called")
Review.sync({ alter: true })
console.log("Review.sync({ alter: true }) called")


const sequelize = require('./database.js')

const sessionStore = new SequelizeStore({
    db:sequelize
})
// sessionStore.sync()
//passport
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


//Passport Serialization
passport.serializeUser((user,done)=>{
    done(null,user.email)
})

passport.deserializeUser((email,done)=>{
    User.findOne({where:{email:email}}).then(user=>{
        done(null,user)
    })
})
//passport LocalStrategy
passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async function (email,password,done){
    if(!email||!password){
        done('Email and password required',null)
        return
    }
    const user = await User.findOne({where:{email:email}})

    if(!user){
        done('User not found',null)
        return
    }
    
    const valid = await user.isPasswordValid(password)

    if (!valid){
        done('Email and password ',null)
        return
    }
    
    done(null, user)
}))

// sessionStore.sync()

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
        }),
        passport.initialize(),
        passport.session()
    )

    server.post('/api/auth/register',async(req,res)=>{

        House.sync()
        console.log("House.sync() called inside register ")
        Review.sync()
        console.log("Review.sync() called inside register")

        const {email,password,passwordconfirmation} =req.body

        if(password !== passwordconfirmation){
            res.end(JSON.stringify({status:'error',message:'Passwords do not match'})
            )
            return
        }

        try{
            const user = await User.create({email,password})

            req.login(user, err=>{
                if(err) {
                    res.statusCode = 500
                    res.end(JSON.stringify({status:'error',message:err}))
                    return
                }
                return res.end(
                    JSON.stringify({status:'success',message: 'Logged in'}))
            })

            
        } catch (error){
            res.statusCode=500
            let message = 'An error occurred'
            if(error.name==='SequelizeUniqueConstraintError'){
                message = 'User already exists'
            }
            res.end(JSON.stringify({status:'error',message}))
        }


    })

    server.post('/api/auth/logout',(req,res)=>{
        req.logout()
        req.session.destroy()
        console.log('ABOUTS TO END THIS!!!!!!!!!!!!!!!')
        return res.end(JSON.stringify({status:'success',message:'Logged out'}))
        console.log('EL FIN !!!!!!!!!!!!!!!')

    })

    server.post('/api/auth/login', async (req, res) => {
        passport.authenticate('local', (err, user, info) => {
          if (err) {
            res.statusCode = 500
            res.end(
              JSON.stringify({
                status: 'error',
                message: err
              })
            )
            return
          }
      
          if (!user) {
            res.statusCode = 500
            res.end(
              JSON.stringify({
                status: 'error',
                message: 'No user matching credentials'
              })
            )
            return
          }
      
          req.login(user, err => {
            if (err) {
              res.statusCode = 500
              res.end(
                JSON.stringify({
                  status: 'error',
                  message: err
                })
              )
              return
            }
      
            return res.end(
              JSON.stringify({
                status: 'success',
                message: 'Logged in'
              })
            )
          })
        })(req, res, next)
      })
      

    server.all('*',(req,res)=>{
        return handle(req,res)
    })

    server.listen(port,err=>{
        if(err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
