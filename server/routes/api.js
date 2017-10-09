const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


const mlab_db_url='mongodb://nitz:nithz@ds129344.mlab.com:29344/mytasklist_nithz';
const local_db_url='mongodb://127.0.0.1:27017/mean';
// Connect
const connection = (closure) => {
    return MongoClient.connect(mlab_db_url, (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/tasks', (req, res) => {
    connection((db) => {
        db.collection('tasks')
            .find()
            .toArray()
            .then((tasks) => {
                response.data = tasks;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


// Get users
router.post('/tasks', (req, res) => {
 // db.collection('tasks').save(req.body, (err, result) => {
 //    if (err) return console.log(err)

 //    console.log('saved to database')
 //    res.redirect('/')
 //  })

 connection((db) => {
        db.collection('tasks')
            .save(req.body,(err, result) => {
                if (err) return console.log(err)

                console.log('saved to database')
                res.redirect('/')
              })
    });
});

module.exports = router;