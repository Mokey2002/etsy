//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
const mysql = require('mysql2');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();

  });

  var Users = [{
      username : "admin",
      password : "admin"
  }]

  var books = [
    {"BookID" : "1", "Title" : "Book 1", "Author" : "Author 1"},
    {"BookID" : "2", "Title" : "Book 2", "Author" : "Author 2"},
    {"BookID" : "3", "Title" : "Book 3", "Author" : "Author 3"}
]

//// create the connection to database
//
  const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "hw4"
});
//Route to handle Post Request Call
app.post('/login',function(req,res){
    
    // Object.keys(req.body).forEach(function(key){
    //     req.body = JSON.parse(key);
    // });
    // var username = req.body.username;
    // var password = req.body.password;
    console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);
    Users.filter(function(user){
        console.log("USER LOGIN");
        console.log(user);
        console.log("USER LOGIN");
        if(user.username === req.body.username && user.password === req.body.password){


            
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = user;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");
        }else{


            res.writeHead(201,{
                'Content-Type' : 'text/plain'
            })
            res.end("Unsuccessful Login");

            }
    })

    
});

//Route to get All Books when user visits the Home Page
app.get('/home', function(req,res){
    console.log("Inside Home Login");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Books : ",JSON.stringify(books));
    res.end(JSON.stringify(books));
    
})

app.post('/create', function (req, res) {
    console.log("Req Body : ",req.body);
        //get items from form
        let book = req.body;
        console.log(req.body);
        function extractValue(arr, prop) {

            let extractedValue = [];
        
            for (let i=0; i < arr.length ; ++i) {
        
                // extract value from property
                extractedValue.push(arr[i][prop]);
            }
            return extractedValue;
        }
        let result = extractValue(books, 'BookID');
        console.log(result);
        let id_included = result.includes(book.idnum);
       console.log(id_included);
        if(!id_included){
            let my_book = {};
            my_book.BookID= book.idnum;
            my_book.Title = book.title;
            my_book.Author = book.author;
            //push new book to the db(array)
            books.push(my_book);
            console.log("book added");
            res.writeHead(200,{
                'Content-Type' : 'application/plain'
            });
            res.end("Successful Book Added");
            //console.log("Books : ",JSON.stringify(books));
            //res.redirect('home');
        }
        else{
            //let alert = [{error: 'Error: Book ID already in DB. Please select a different ID.'}];
            //res.render('create', {
                //alert: alert
            //});
            res.writeHead(201,{
                'Content-Type' : 'application/plain'
            });
            res.end(" Book alrady in DB");
        }
});
app.post('/delete', function (req, res) {
    console.log(req.body);
    let id = req.body;
    function extractValue(arr, prop) {
    //array to store IDs of all books
    let extractedBookIDs = [];    
    for (let i=0; i < arr.length ; ++i) {
        // extract ids
        extractedBookIDs.push(arr[i][prop]);
        }
    return extractedBookIDs;
    }
    //retrieve IDs in books array 
    let result = extractValue(books, 'BookID');
    console.log(result);
    //Check whether or not ID matches
    let id_included = result.includes(id.idnum);
    console.log(id_included);
    if(id_included){
        //get index of book w/matching ID'
        
        let index = books.findIndex((element) =>
                element.BookID == id.idnum);
        console.log("index")
        console.log(result.indexOf(id.idnum))
        console.log(index);
        books.splice(index,1);
        console.log("index")
        //delete book using splice
        //delete books[result.indexOf(id.book_id)]
        //books.splice(result.indexOf(id.book_id));
        console.log("book deleted");
        //successfully deleted book
        res.writeHead(200,{
            'Content-Type' : 'application/plain'
        })
        res.end("Successful Book Deleted");
    } 
    else{
        //book was not found in array
        res.writeHead(201,{
            'Content-Type' : 'application/plain'
        });
        res.end(" Book not in DB");
    }
});


//register api
app.post('/register', (req,res) => {
    let name = req.body.name;
    let email = req.body.email;
    let passwordn = req.body.password;
    let user = req.body.user;
    let city = req.body.city;
    let age = req.body.age;
    let street = req.body.street;
    let zip = req.body.zip;
    let phone = req.body.phone;
    let country = req.body.country;
    console.log("Register")
    console.log(req.body)
    console.log("Register")
   // bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
            "INSERT INTO user (Name, Phone, City,Age,Email,Zip,Country,User,street,password) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [name, phone,city,age,email,zip,country,user,street,passwordn],


            (err, result) => {
                console.log("result");
                console.log(result);
                console.log(err);
                console.log("result");

            if(err) {
                res.send({err: err})
            }
            if (result){
                res.cookie('cookie',user,{maxAge: 900000, httpOnly: false, path : '/'});
                req.session.user ={ username: user, password: passwordn };
                //return succes to front end
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Successful Login");
            }
            else{
                //return unsuccesful to front end
                res.writeHead(201,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Unsuccessful Login");
            }
            }
        );
   // })
    
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");