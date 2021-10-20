const mongoose = require('mongoose');
const User = require('../models/user.model');
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
            message: "Please fill all required field"
        });
    }

    // create new user 
    const user = new User({
        _id: new mongoose.Types.ObjectId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
    });

    // save user in database 
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating new user."
            });
        });
};

// finding single user with id 
exports.findOne = (req, res) => {
    User.findById(req.params.id)

        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            };
            res.send(user);
        }).catch(err => {
            if (err.kind === 'objectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            };
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


// for image uploading =>post request 
// exports.image = (req, res) => {
//     console.log(req.body);
//     const file = req.files.photo;
//     cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
//         console.log(result);

//         if (!req.body) {
//             return res.status(400).send({
//                 message: "Please select image file before uploading"
//             });
//         }

//         const user = new User({
//             _id: new mongoose.Types.ObjectId,
//             first_name: req.body.first_name,
//             last_name: req.body.last_name,
//             email: req.body.email,
//             phone: req.body.phone,
//             imagePath:result.url,
//         });

//         user.save()
//             .then(data => {
//                 res.send(data);
//             }).catch(err => {
//                 res.status(500).send({
//                     message: "Something went wrong while uploading image."
//                 });
//             });
//     })
// };