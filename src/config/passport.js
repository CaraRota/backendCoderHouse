import local from 'passport-local' //Estrategia
import passport from 'passport' //Manejador de las estrategias
import jwt from 'passport-jwt' //Generador de tokens
import GithubStrategy from 'passport-github2'
import { createHash, validatePassword } from '../utils/bcrypt.js'
import userModel from '../models/users.js'
import 'dotenv/config'

//IMPORT LOGGER
import logger from '../utils/loggers.js'

//Defino la estrategia a utilizar
const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {

    const cookieExtractor = (req) => {
        const token = req.cookies ? req.cookies.jwtCookie : {}
        return token
    }

    const { fromAuthHeaderAsBearerToken } = ExtractJWT

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor, fromAuthHeaderAsBearerToken()]),
        secretOrKey: process.env.JWTSECRET
    }, async (jwtPayload, done) => {
        try {
            const user = await userModel.findById(jwtPayload.user._id)
            if (!user) {
                return done(null, false)
            }
            return done(null, user)
        } catch (error) {
            logger.error(error)
            return done(error)
        }
    }))

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            //Defino como voy a registrar un user
            const { first_name, last_name, email, age } = req.body

            try {
                const user = await userModel.findOne({ email: email })
                if (user) {
                    //done es como si fuera un return de un callback
                    logger.info('User already exists')
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
                logger.info('User created')
                return done(null, userCreated)
            } catch (error) {
                logger.error(error)
                return done(error)
            }
        }
    ))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username })
            if (!user) {
                logger.info('User not found')
                return done(null, false)
            }
            if (validatePassword(password, user.password)) {
                logger.info('User and password are valid')
                return done(null, user) //Usuario y contraseña validos
            }
            return done(null, false) //Contraseña no valida
        } catch (error) {
            logger.error(error)
            return done(error)
        }
    }))

    passport.use('github', new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL

    }, async (accessToken, refreshToken, profile, done) => {

        try {
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
                logger.info('User created')
                done(null, userCreated)

            } else {
                logger.info('User already exists')
                done(null, user)
            }

        } catch (error) {
            logger.error(error)
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