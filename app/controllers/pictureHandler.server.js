'use strict';
var Users = require('../models/users.js');
var Image = require('../models/images.js');

function pictureHandler () {

    this.addPic = function(req, res, next) {

        var imgLink = req.body.imgLink;
        var imgDescription = req.body.imgDescription;
        var userId = req.user._id;
        var username;

        if (req.user.facebook.id != null) {
            username = req.user.facebook.name;
        }
        else if (req.user.twitter.id != null) {
            username = req.user.twitter.displayName;
        }
        else if (req.user.google.id != null) {
            username = req.user.google.name;
        }

        //save new image here
        var newImage = new Image({
            link: imgLink,
            description: imgDescription,
            userId: userId,
            username: username,
            likes: []
        });

        newImage.save(function(err) {
            if (err) throw err;
            res.redirect('/myPics');
        });

    };

    this.getAllPics = function(req, res, next) {

        res.locals.allPics = [];

        //find all the pics
        Image.find({}, function(err, doc) {
            if (err) throw err;
           res.locals.allPics = doc;
           return next();
        });

    };

    this.getUserPics = function(req, res, next) {
        res.locals.userPics = [];

        //find all user's pics
        Image.find({userId: req.user._id}, function(err, doc) {
            if (err) throw err;
            res.locals.userPics = doc;
            return next();
        });
    };

    this.removePic = function(req, res, next) {

        var userId = req.user._id;
        var picId = req.params.picId;

        ///find the pic
        Image.findById(picId, function (err, doc) {
            if (err) throw err;

            ///only allow user to delete their own pic
            if (doc.userId == userId) {

                //remove it
                Image.findByIdAndRemove(picId, function(err) {
                    if (err) throw err;
                    res.redirect('/');
                });
            }
            else {
                res.locals.allPics = [];
                Image.find({}, function(err, doc) {
                    if (err) throw err;
                    res.locals.allPics = doc;
                    res.render('index', {message: 'You can only delete your own pictures', user: req.user});
                });
            }
        });
    };

    this.likePic = function(req, res, next) {

        var userId = req.user._id;
        var picId = req.params.picId;

        //add user to picture's like array
        Image.findByIdAndUpdate(picId, { $push: { likes: userId }}, {new: true}, function(err, doc){
            if (err) throw err;

            //redirect back to where it came from
            if (req.headers.referer.indexOf('myPics') != -1) {
                res.locals.userPics = doc;
                res.redirect('/myPics');
            }
            else {
                res.locals.allPics = doc;
                res.redirect('/');
            }
        })

    };

    this.dislikePic = function(req, res, next) {

        var userId = req.user._id;
        var picId = req.params.picId;
        
        //add user to picture's like array
        Image.findByIdAndUpdate(picId, { $pull: { likes: userId }}, {new: true}, function(err, doc){
            if (err) throw err;

            //redirect back to where it came from
            if (req.headers.referer.indexOf('myPics') != -1) {
                res.locals.userPics = doc;
                res.redirect('/myPics');
            }
            else {
                res.locals.allPics = doc;
                res.redirect('/');
            }
        })
    };



}

module.exports = pictureHandler;