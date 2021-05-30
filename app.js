const express=require('express');
const cookieParser = require("cookie-parser");
const bodyParser=require('body-parser');
const sessions = require('express-session');

//username and password
const myusename = 'user1'
const mypassword = 'mypassword'

const PORT = 4000;
var session;
const app = express();

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))

// cookie parser middleware
app.use(cookieParser());

// serve css styling
app.use(express.static(__dirname));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.get('/',(req,res) => {
    session=req.session;
    if(session.userid){
        res.send("welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('index.html',{root:__dirname})
});

app.post('/user',(req,res) => {
    if(req.body.username == myusename && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('invalid username or password');
    }
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));