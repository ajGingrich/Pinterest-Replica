'use strict';
var Users = require('../models/users.js');
var Image = require('../models/images.js');

function pictureHandler () {

    this.addPic = function(req, res, next) {

        //var imgLink = req.body.imgLink;
        //var imgDescription = req.body.imgDescription;
        //var userId = req.user._id
        //var username;

        /*if (req.user.facebook.id != null) {
            username = req.user.facebook.name;
        }
        else if (req.user.twitter.id != null) {
            username = req.user.twitter.displayName;
        }
        else if (req.user.google.id != null) {
            username = req.user.google.name;
        }*/

        //var imgLink = "http://e2.365dm.com/17/02/16-9/20/skysports-premier-league-football-dele-alli-tottenham-hotspur_3898471.jpg?20170226145452";
        //var imgDescription = "You just don't understand, Deli Alli";

        var imgLink = "https://www.biography.com/.image/t_share/MTM5OTQxMzEwNjcxODg5NDQ5/stephen-curry-gettyimages-538912798_verticaljpg.jpg";
        //var imgLink = "https://www.thesun.co.uk/wp-content/uploads/2017/06/nintchdbpict000319836315.jpg?strip=all&w=960&quality=100";
        var imgDescription = "steph curry";

        //save new image here
        var newImage = new Image({
            link: imgLink,
            description: imgDescription,
            //userId: userId,
            userId: "4998494947",
            //username: username,
            username: "doucheface",
            likes: 0
        });

        newImage.save(function(err) {
            if (err) throw err;
            return next();
        });

    };

    this.getAllPics = function(res, req, next) {

        req.locals.allPics = [];

        //find all the pics
        Image.find({}, function(err, doc) {
            if (err) throw err;
           //console.log(doc);
           req.locals.allPics = doc;
           return next();
        });

    };

    this.getUserPics = function(res, req, next) {

    };


}

module.exports = pictureHandler;