const passport = require('passport');
const {
    Strategy,
    ExtractJwt
} = require('passport-jwt');
const jwt = require('jsonwebtoken')
const config = require('../config');
const secret = config.secret || '123456';
const User = require('../models').User;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

const passportAction = async passport => {
    passport.use(
        new Strategy(opts, async (payload, done) => {
            try {
                 var user = await User.findById(payload.id);
                if (!user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (error) {
                console.log(error);
            }
        })
    );
}

const initialize = passport.initialize();
const authenticate = passport.authenticate('jwt', {
    session: false
});

const verifyToken = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        res.json({
            status: 0,
            message: 'No Token Detected'
        })
    } else {
        const token = auth.split(' ')[1];
        try {
            let payload = await jwt.verify(token, config.secret);
            const userData = await User.findOne({
                where: {
                    email: payload.email
                }
            });
            if (!userData) {
                res.json({
                    status: 0,
                    message: 'User not found'
                })
            }
            req.user_active = userData;
            req.role_user = userData.role;
            await next();
        } catch (err) {
            res.json({
                status: err.code,
                message: err.message
            })
        }
    }
}

module.exports = {
    passportAction,
    initialize,
    authenticate,
    verifyToken
};