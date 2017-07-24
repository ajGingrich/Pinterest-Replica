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
            likes: ['test', 'todo']
        });

        newImage.save(function(err) {
            if (err) throw err;
            return next();
        });

    };

    this.getAllPics = function(req, res, next) {

        res.locals.allPics = [];

        //find all the pics
        Image.find({}, function(err, doc) {
            if (err) throw err;
           //console.log(doc);
           res.locals.allPics = doc;
           return next();
        });

    };

    this.getUserPics = function(req, res, next) {
        res.locals.userPics = [];
        console.log(req.user);

        //find all user's pics
        Image.find({userId: req.user._id}, function(err, doc) {
            if (err) throw err;
            //console.log(doc);
            res.locals.userPics = doc;
            return next();
        });
    };


}

module.exports = pictureHandler;