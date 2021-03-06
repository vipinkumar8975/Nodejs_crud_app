const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const cloudinary = require('cloudinary').v2;


// image uploading config 
// cloudinary.config({
//     cloud_name: 'dc6jjopxc',
//     api_key: '971386416444421',
//     api_secret: 'Z5OV6dKHL7cJTLDEleBIHiH0snk',
//     secure: true
// });

// for finding data by get request
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while getting list of users."
            });
        });
};


//create and save new user

exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill data"
        });
    }

    // const file = req.files.image.data.toString('base64');
    // cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    //     console.log(result);
    // });


    // create new user 
    const user = new User({
        _id: new mongoose.Types.ObjectId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.body.image,
    });
    console.log("user", user, req.body);
    // save user in database 
    user.save()
        .then(data => {
            console.log("data", data)
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating new user."
            });
        });
};

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {  
            return res.status(400).send({
                error: err
            });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                image: req.body.image,
            });
            console.log('user', user, req.body);
            user.save()
                .then(data => {
                    console.log(data);
                    res.status(200).send(data)
                }).catch(err =>{
                    res.status.send({
                        message: "message not found"
                    })
                });
        }
    });
}

// signIn 
exports.signIn = (req, res) => {
    User.find({ first_name: req.body.first_name })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    msg: 'user not exist'
                })
            }
            bcrypt.comapre(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        msg: 'password is not matching'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        first_name: user[0].first_name,
                        phone: user[0].phone,
                        email: email[0].email
                    },
                        'this is dummy text',
                        {
                            expiresIn: "24h"
                        }
                    );
                    res.status(200).json({
                        first_name: user[0].first_name,
                        phone: user[0].phone,
                        email: email[0].email,
                        token:token
                    })
                }
            })
        }).catch(err=>{
            res.status(500).json({
                err:err
            })
        })
}


// finding single user with id 
exports.findOne = (req, res) => {
    User.findById(req.params.id)

        .then(user => {
            if (!user) {
                return res.status(500).send({
                    message: "User not found with id " + req.params.id
                });
            };
            res.send(user);
        }).catch(err => {
            return res.status(500).send({
                message: "Error getting user with id " + req.params.id
            });
        });
};

// update an user identified by the id in the request 

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    // find user and update it with the request body 
    User.findByIdAndUpdate(req.params.id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            };
            res.send(user);
        }).catch(err => {
            return res.send.status(500).send({
                message: "Error updating user with id " + req.params.id
            });
        });
};

// Delete a User with the specified id in the request

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            };
            res.send({ message: "user deleted successfully!" });
        }).catch(err => {
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.id
            });
        });
};
