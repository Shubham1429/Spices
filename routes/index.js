var express = require("express");
var sessions = require("express-session");
const path = require("path");
const app = express();
var assert = require("assert");

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

var session;
var mongodb = require("mongodb");
var mongoose = require("mongoose");
var multer = require("multer");
var bodyparser = require("body-parser");

//Static Folder
app.use(express.static(path.join(__dirname, "Public")));

app.use(
  express.urlencoded({
    extended: false,
  })
);

/*View Engine Setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
*/
//Body Parser Middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

DIR = "./Public/Images/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

var ProductSchema = new mongoose.Schema(
  { Product_id: String, Product_name: String, imagelink: String },
  { collection: "products" }
);
var ProductModel = mongoose.model("products", ProductSchema);

var ContactSchema = new mongoose.Schema(
  { Name: String, Phone: Number, Email: String, Message: String },
  { collection: "CForm" }
);
var ContactModel = mongoose.model("CForm", ContactSchema);

var ShopSchema = new mongoose.Schema(
  {
    Email: String,
    Starter: Array,
    Oriental: Array,
    Chat_Display: Array,
    South: Array,
    Soup: Array,
    Salads: Array,
    Cont_past: Array,
    Pasta: Array,
    Roasti: Array,
    Indian: Array,
    Daal: Array,
    Breads: Array,
    Amritsar: Array,
    Rajasthani: Array,
    Mexican: Array,
    Chinese: Array,
    Deserts: Array,
    Chin_Deserts: Array,
    Fruits: Array,
  },
  { collection: "CShop" }
);
var ShopModel = mongoose.model("CShop", ShopSchema);

const nodemailer = require("nodemailer");

mongoose.connect("mongodb://localhost:27017/Site", { useNewUrlParser: true });

app.get("/Admin", function (req, res, next) {
  res.sendFile(__dirname + "/page-login.html");
});

/* Admin Login*/
//router.use(bodyParser());
/*
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use(sessions(
    {
        secret:'Shubtanamishka',resave:false,saveUninitialized:true
    }
)); 
*/
app.post("/admin-login", function (req, res) {
  if (
    (req.body.email == "admin@bs6.com" || req.body.email == "a@bs6.com") &&
    req.body.password == "admin"
  ) {
    res.sendFile(__dirname + "/forms-basic");
  } else {
    res.sendFile(__dirname + "/page-login");
  }
});

app.get("/logout", function (req, res) {
  res.sendFile(__dirname + "/page-login");
});

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/front.html");
});

app.post("/submit", (req, res) => {
  /*
    mongoose.connect("mongodb://localhost:27017/Site",{useNewUrlParser : true});
 
    new Enquiry({
        Name: req.body.name,
        Number: req.body.number,
        Email: req.body.email
    })
    .save(function(_err, _Enquiry){
        console.log('Info');
        res.send("<h1>Your Message has been saved</h1>");
    });
    */
  console.log(req.body);
  const output = `
    <p>You Have a new Contact Request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name : ${req.body.name}</li>
        <li>Number : ${req.body.number}</li>
        <li>Email : ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "email", // gmail id inside eg: '123@gmail.com'
      pass: "password", // gmail password eg: 'password'
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: '" Team Blendspice" <email>',
    to: "your email",
    subject: "Contact Form Notice",
    text: "Hello World?",
    html: output,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.sendFile(__dirname + "/contact.html");
  });
});

app.post("/feedback", (req, res) => {
  /*
       mongoose.connect("mongodb://localhost:27017/Site",{useNewUrlParser : true});
       new ContactModel({
           Name: req.body.name,
           Email: req.body.email,
           Subject: req.body.subject,
           Message: req.body.message
       })
       .save(function(_err, _CForm){
           console.log('Inserted');
          
       });
      */
  console.log(req.body);
  const output = `
       <p>You Have a new Contact Request</p>
       <h3>Contact Details</h3>
       <ul>
           <li>Name : ${req.body.name}</li>
           <li>Email : ${req.body.email}</li>
           <li>Subject : ${req.body.subject}</li>
           <li>Message : ${req.body.message}</li>
       </ul>   `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "email", // gmail id inside eg: '123@gmail.com'
      pass: "password", // gmail password eg: 'password'
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: '" Team Blendspice" <email>',
    to: "email",
    subject: "Feedback Form Notice",
    text: "Hello World?",
    html: output,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.sendFile(__dirname + "/about.html");
  });
});
app.post("/shop", (req, res) => {
  mongoose.connect("mongodb://localhost:27017/Site", { useNewUrlParser: true });
  new ShopModel({
    Email: req.body.email,
    Starter: req.body.starter,
    Oriental: req.body.Oriental,
    Chat_Display: req.body.Chat_Display,
    South: req.body.South,
    Soup: req.body.Soup,
    Salads: req.body.Salads,
    Cont_past: req.body.Cont_past,
    Pasta: req.body.Pasta,
    Roasti: req.body.Roasti,
    Indian: req.body.Indian,
    Daal: req.body.Daal,
    Breads: req.body.Breads,
    Amritsar: req.body.Amritsar,
    Rajasthani: req.body.Rajasthani,
    Mexican: req.body.Mexican,
    Chinese: req.body.Chinese,
    Deserts: req.body.Deserts,
    Chin_Deserts: req.body.Chin_Deserts,
    Fruits: req.body.Fruits,
  }).save(function (_err, _CShop) {
    console.log(req.body);
    console.log("Inserted");
    res.sendFile(__dirname + "/shop.html");
  });

  console.log(req.body);
  const output = `
       <p>You have a new Menu Request</p>
       <h3>Details</h3>
       <ul>  
           <li>Email : ${req.body.email}</li>
        </ul>
        <h3> Starters</h3>
        <ul>
           <li>${req.body.starter}<br></li>
        </ul>   
        <h3> Oriental Starters</h3>
        <ul>
            <li>${req.body.Oriental}<br></li>
        </ul>        
        <h3> Chaat Display</h3>
        <ul>
            <li>${req.body.Chat_Display}<br></li>
        </ul>
        <h3> South Indian</h3>
        <ul>
           <li>${req.body.South}<br></li>
        </ul>
        <h3>Soup Station</h3>
        <ul>   
            <li>${req.body.Soup}<br></li>
        </ul>   
        <h3> Salad Station</h3>
        <ul>
            <li>${req.body.Salads}<br></li>
        </ul>  
        <h3> Continental & Pasta</h3>
           <li>${req.body.Cont_past}<br></li>
        <h3> Pasta Station</h3>
        <ul>   
            <li>${req.body.Pasta}<br></li>
        </ul>   
        <h3> Roasties & Veggies</h3>
        <ul>   
            <li>${req.body.Roasti}<br></li>
        </ul>   
        <h3> Indian Cuisine</h3>
         <ul>  
            <li>${req.body.Indian}<br></li>
        </ul>
        <h3> Daal Station</h3>
        <ul>
           <li>${req.body.Daal}<br></li>
        </ul>
        <h3> Assorted Breads</h3>
        <ul>
           <li>${req.body.Breads}<br></li>
        </ul>
        <h3> Amritsari Counter</h3>
        <ul>
           <li>${req.body.Amritsar}<br></li>
        </ul
        <h3> Rajasthani Counter</h3>
        <ul>
           <li>${req.body.Rajasthani}<br></li>
        </ul
        <h3> Mexican Main Course</h3>
        <ul>
           <li>${req.body.Mexican}<br></li>
        </ul>
        <h3> Chinese Main Course</h3>
        <ul>
           <li>${req.body.Chinese}<br></li>
        </ul>
        <h3> Deserts</h3>
        <ul>
           <li>${req.body.Deserts}<br></li>
        </ul>
        <h3> Continental & Chinese Deserts</h3>
        <ul>
           <li>${req.body.Chin_Deserts}</li>
        </ul>
        <h3> Exotic Fresh Fruits Display</h3>
        <ul>   
            <li>${req.body.Fruits}</li> 
        </ul>
          `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "email", // gmail id inside eg: '123@gmail.com'
      pass: "password", // gmail password eg: 'password'
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: '" Team Blendspice" <email>',
    to: "email",
    subject: "Feedback Form Notice",
    text: "Hello World?",
    html: output,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.sendFile(__dirname + "/shop.html");
  });
});

app.listen(7070, function () {
  console.log("Server  started");
});

app.post("/about.html", function (_req, res) {
  res.sendFile(__dirname + "/about.html");
});

app.post("/contact.html", function (_req, res) {
  res.sendFile(__dirname + "/contact.html");
});

app.post("/gallery.html", function (_req, res) {
  res.sendFile(__dirname + "/gallery");
});
app.post("/menu.html", function (_req, res) {
  res.sendFile(__dirname + "/menu.html");
});
app.post("/shopping.html", function (_req, res) {
  res.sendFile(__dirname + "/shopping.html.html");
});
app.post("/front.html", function (_req, res) {
  res.sendFile(__dirname + "/front.html");
});

/*
app.post("/delete", function(_req,res)
{
    mongoose.connect("mongodb://localhost:27017/project",{useNewUrlParser : true});
    Facmodel.remove({regisnumber : req.body.t2}, Datadel)
    function Datadel(error,data)
    {
        if(error)
        console.log(error);
        else
        {
            console.log("RECORD DELETED");
        }

        mongoose.disconnect();
        res.end();
    }
    res.sendFile(__dirname+"/front");
});
*/
app.post("/forms-basic.html", function (_req, res) {
  res.sendFile(__dirname + "/forms-basic.html");
});

app.post("/tst", upload.single("file"), function (req, res) {
  const pname = req.body.name;
  const pid = req.body.pid;

  new ProductModel({
    Product_id: pid,
    Product_name: pname,
    imagelink: "Images/" + res.req.file.filename,
  }).save(function (err, data) {
    if (err) {
      console.log(err);
      return res.end("Unable To Save Data!!!!.");
    } else {
      console.log(data);
      console.log("Data inserted");
      res.sendFile(__dirname + "/forms-basic.html");
    }
  });
});
/*
app.get("/gallery",function(req,res){
    //product table
    mongoose.connect("mongodb://localhost:27017/project",{useNewUrlParser : true});
    ProductModel.find({Product_name: req.body.pname} , Dataret);
    function Dataret(err, data)
    {
        if(err){
            console.log("Error");
            console.log(err);
        }
        else {
            
            console.log("Data IS Coming");
            console.log(data);
            res.render("gallery.html",{ title:'Express',data:data });
            
        }
    
    }
   
    
});
*/
app.get("/gatest", function (req, res) {
  //product table
  ProductModel.findOne(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Data is Coming");
      console.log(data);
      res.render("gatest", { title: "Express", data: data });
    }
  });
});

app.post("/delete_product", (req, res, next) => {
  ProductModel.deleteOne({ Product_id: req.body.pid }, afterdataretrival);
  function afterdataretrival(err, data1) {
    if (err == null) {
      console.log(data1);
      console.log("Entry Deleted");
      res.sendFile(__dirname + "/forms-basic.html");
    } else {
      res.write("Failed To find record");
      console.log("not found");
    }
  }
});
