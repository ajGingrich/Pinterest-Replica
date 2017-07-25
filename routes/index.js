var express = require('express');
var passport = require('passport');
var router = express.Router();
var PictureHandler = require('../app/controllers/pictureHandler.server');
var pictureHandler = new PictureHandler();
var Image = require('../app/models/images.js');

//home page
router.get('/', pictureHandler.getAllPics, function(req, res) {
    res.render('index', {user: req.user});
});

//myPics
router.get('/myPics', isLoggedIn, pictureHandler.getUserPics, function(req, res) {
    res.render('userPics', {user: req.user});
});

//allUsers
router.get('/allUsers', function(req, res) {
    res.render('allUsers', {user: req.user});
});

//add a picture
router.post('/addPic', isLoggedIn, pictureHandler.addPic);

//remove a picture
router.get('/removePic/:picId', isLoggedIn, pictureHandler.removePic);

//like a picture
router.get('/likePic/:picId', isLoggedIn, pictureHandler.likePic);

//like a picture
router.get('/dislikePic/:picId', isLoggedIn, pictureHandler.dislikePic);

//logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/myPics', {user: req.user});
});

//authentications for facebook, twitter and google.
// Facebook routes
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/myPics',
    failureRedirect: '/'
}));

// Twitter routes
router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/myPics',
    failureRedirect: '/'
}));

// Google routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/myPics',
    failureRedirect: '/'
}));

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    //console.log(req.path)

    res.locals.allPics = [];
    Image.find({}, function(err, doc) {
        if (err) throw err;
        res.locals.allPics = doc;
        res.render('index', {message: 'You need to be logged in', user: req.user});
    });

}
