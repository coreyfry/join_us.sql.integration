var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

var connection = mysql.createConnection({
    host: "####",
    user: "####",
    password: "####",
    database: "join_us"
  });



app.get('/', function(req, res){
    var q = 'SELECT COUNT(*) AS count FROM users';
    connection.query(q, function (error, results, fields) {
        if (error) throw error;
        var count = results[0].count;
        // res.send("We have " + count + ' users in our database');
        res.render('home',{data: count});
    });
});

app.post('/register', function(req, res){
    var person = {
        email: req.body.email
    };

    connection.query('INSERT INTO users SET ?', person, function(error, results) {
        if (error) throw error;
        res.redirect('/');
    
    });  
});

app.get('/joke', function(req, res){
    res.send("A chicken crossed the road");
});

app.get('/random_num', function(req, res){
    var num = Math.floor((Math.random() * 10), + 1);
    res.send("Your random number is " + num);
});

app.listen(8080, function(){
    console.log('Server running on port 8080');
});