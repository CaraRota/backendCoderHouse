import local from 'passport-local' //Estrategia
import passport from 'passport' //Manejador de las estrategias
import GithubStrategy from 'passport-github2'
import { createHash, validatePassword } from '../utils/bcrypt.js'
import userModel from '../models/users.js'
import 'dotenv/config'


//Defino la estrategia a utilizar
const LocalStrategy = local.Strategy

const initializePassport = () => {
    //done es como si fuera un res.status(), el callback de respuesta
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            //Defino como voy a registrar un user
            const { first_name, last_name, email, age } = req.body

            try {
                const user = await userModel.findOne({ email: email })
                if (user) {
                    //done es como si fuera un return de un callback
                    return done(null, false)
                }
                const passwordHash = createHash(password)
                const userCreated = await userModel.create({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    age: age,
                    password: passwordHash
                })
                return done(null, userCreated)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username })
            if (!user) {
                return done(null, false)
            }
            if (validatePassword(password, user.password)) {
                return done(null, user) //Usuario y contraseña validos
            }
            return done(null, false) //Contraseña no valida
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('github', new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL

    }, async (accessToken, refreshToken, profile, done) => {

        try {
            console.log(profile)
            const user = await userModel.findOne({ email: profile._json.email })
            if (!user) {
                const hashPassword = createHash('password')
                const userCreated = await userModel.create({
                    first_name: profile._json.name,
                    last_name: ' ',
                    email: profile._json.email,
                    age: 18, //Edad por defecto,
                    password: hashPassword,
                })
                done(null, userCreated)

            } else {
                done(null, user)
            }

        } catch (error) {
            done(error)
        }
    }))

    //Inicializar la session del usr
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    //Eliminar la session del usr
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })

}

export default initializePassport