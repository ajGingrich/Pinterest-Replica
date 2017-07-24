var express = require('express');
var passport = require('passport');
var router = express.Router();
var PictureHandler = require('../app/controllers/pictureHandler.server');
var pictureHandler = new PictureHandler();

//home page
router.get('/', pictureHandler.getAllPics, function(req, res) {
    res.render('index');
});

//myPics
router.get('/myPics', isLoggedIn, pictureHandler.getUserPics, function(req, res) {
    res.render('userPics');
});

//allUsers
router.get('/allUsers', function(req, res) {
    res.render('allUsers');
});

//add a picture
router.post('/addPic', isLoggedIn, pictureHandler.addPic, pictureHandler.getUserPics, function(req, res) {
    res.render('userPics');
});

///test and delete late
/*router.post('/addPic', pictureHandler.addPic, pictureHandler.getAllPics, function(req, res) {
 res.render('index');
});*/

//logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/myPics');
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
    res.redirect('/');
}
