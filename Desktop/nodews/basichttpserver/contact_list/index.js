const express = require('express');
const { get } = require('http');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//middleware1
// app.use(function(req,res,next) {
//     console.log('middleware 1 called');
//     next();
// });
//middleware2
// app.use(function(req,res,next) {
//     console.log('middleware 2 called');
//     next();
// });
var contactList = [
    {
        name: "Abhishek",
        phone: "1111111",
    },
    {
        name: "stark",
        phone: "131111",
    },
    {
        name: "toni",
        phone: "4322111",
    },
]
app.get('/', function (req, res) {
    Contact.find({}, function (err, contacts) {                    //curly braces empty means find all the contacts
        if (err) {
            console.log('Error in fetching contacts from db')
        }
        return res.render('home', {
            title: "Contacts list",
            contact_list: contacts

        });
    });
});

app.get('/practice', function (req, res) {
    return res.render('practice', {
        title: "Lest us play"
    });
});

app.post('/create-contact', function (req, res) {
    // contactList.push({
    //     name: req.body.name ,
    //     phone:req.body.phone
    // });
    // contactList.push(req.body)


    //here we cn directly give req.body  in place of {name: req.ody.name, phone:...}
    Contact.create({
        name: req.body.name,
        phone: req.body.phone              
    }, function (err, newContact) {
        if (err) {
            console.log('error in creating a contact');
            return;
        }
        console.log('*******', newContact)
        return res.redirect('back');
    });


    //return res.redirect('/')
});

//for deleting contact 
app.get('/delete-contact', function (req, res) {

    //get the id from query in the url
    let id = req.query.id;

    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });

});



app.listen(port, function (err) {
    if (err) { console.log('Error in running the server on prort:', err); }

    console.log('Yup ! Express sever:', port);
});