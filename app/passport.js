var passport = require('passport'),
    User = require('../db/user').User;

module.exports = function(app) {
    // Initialize Passport!  Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    app.use(passport.initialize());
    app.use(passport.session());

    // setup user serialisation and de-serialisation
    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });
    passport.deserializeUser(function(id, done) {
        User.findOne({username: id}, function(err, user) {
            done(err, user);
        });
    });
};
