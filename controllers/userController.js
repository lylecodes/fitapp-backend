const users = require('../models/UserModel');

// GET all users
exports.getUsers = (req,res) => {
users.find() 
    .then(results => {
        console.log("results", results)
        return res.send(results);
    })
    .catch(err => console.error(err));
};

// GET a specific user
exports.getAUser = (req, res) => {
    users.findById({
        _id: req.params.id
    }).then(result => {
        console.log('result', result)
        return res.send(result)
    })
    .catch(err => console.error(err));
};

// Get create user input/form
exports.userCreateGet = (req, res) => {
    console.log('userCreateGet', req);
    res.render('./create', {
        title: 'Create a new account'
    })
};

// Create user on POST
exports.userCreatePost = (req, res) => {
    const newDate = new Date();

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password; 
    const profilePic = req.body.profilePic;
    const stats = [{
        age: req.body.age,
        sex: req.body.sex,
        weight: req.body.weight,
        height: req.body.height
    }]
    const dateCreated = new Date(newDate);

    let newUser = {
        name,
        email,
        password,
        profilePic,
        stats,
        dateCreated
    };

    console.log('newUser', newUser);
    users.create(newUser);
    return res.send(newUser)
}

// Get user to delete
exports.userDeleteGet = (req, res) => {
    const id = req.params.id;
    users.findById(id)
        .then(result => {
            console.log("userDeleteGet", result);
            res.render(`./user/${id}/delete`, {
                title: 'Delete user',
                post: result
            })
        })
};

// Delete user on POST
exports.userDeletePost = (req, res) => {
    const id = req.params.id;
    users.findOneAndDelete({
        _id: id
    }).then(result => {
        return res.send('deletedId ' + req.params.id)
    }).catch(err => {
        console.log(err)
    })
};

// Get user to update
exports.userUpdateGet = (req, res) => {
    const id = req.params.id;
    users.findById(id)
        .then(result => {
            console.log("UpdateGet", result)
            res.render('./user/update', {
                title: 'Update user',
                user: result
            })
        })
};

// Update user on POST
exports.userUpdatePost = (req, res) => {
    const newDate = new Date();
    const dateUpdated = new Date(newDate);
    users.findByIdAndUpdate({
        _id: req.params.id
    }, {
        "name": req.body.name,
        "email": req.body.email,
        "profilePic": req.body.profilePic,
        "stats": [{
            "age": req.body.age,
            "sex": req.body.sex,
            "weight": req.body.weight,
            "height": req.body.height
        }],
        dateUpdated: dateUpdated
    },(result => { 
        res.send(`updatedUser: ${req.params.id}`)
    }),(err, doc) => {
        if(err){
            console.log(err)
        } else{
            console.log("Updated User : ", doc);
        }
    })
}