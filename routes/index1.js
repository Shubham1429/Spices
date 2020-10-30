var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


var Products=require("../models/Upload");
var Conacts=require("../models/Contact");
var Shops=require("../models/Shop");

var multer = require('multer');

DIR = './Public/Upload/'

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,DIR)
    },
    filename: function(req,file,cb) {
        cb(null,file.fieldname + "-" + Date.now()+ "-"+ file.originalname)
    }
}) 
const upload = multer({
    storage: storage
})
var mem;
/* GET home page. */
router.get('/', function(req, res, next) {  res.render('front', { title: 'Express' });});
router.get('/front', function(req, res, next) {  res.render('front', { title: 'Express' });});
router.get('/about', function(req, res, next) {  res.render('about', { title: 'Express' });});
router.get('/contact', function(req, res, next) {  res.render('contact', { title: 'Express' });});
router.get('/menu', function(req, res, next) {  res.render('menu', { title: 'Express' });});
router.get('/shop', function(req, res, next) {  res.render('shop', { title: 'Express' });});

router.get('/forms-basic', function(req, res, next) {  res.render('forms-basic', { title: 'Express' });});

/*  Redirection For Admin Panel */
router.get('/admin', function(req, res, next) {  res.redirect('/page-login')});



router.get('/page-login', function(req, res, next) {  res.render('page-login', { title: 'Express' });});
router.get('/logout', function(req, res, next) { res.render('page-login', { title: 'Express' });});


router.post("/admin-login",function(req,res) 
           {
                if(((req.body.email=="admin@bs6.com")||(req.body.email=="a@bs6.com")) && req.body.password=='admin')
                   {
                      res.redirect('/forms-basic'); 
                    }
                    else {res.redirect('/page-login'); }
       
            });


            router.get("/logout",function(req,res){
              
                res.sendFile(__dirname+'/page-login');
            });  


/* Product Upload*/
router.post('/tst',upload.single("file"),function(req,res) {
    const pname = req.body.name
    const pid = req.body.pid
  
        new Products({
            Product_id:pid,
            Product_name:pname,
           imagelink:"Upload/" + res.req.file.filename
    }).save(function(err,data){
        if(err){
            console.log(err)
            return res.end("Unable To Save Data!!!!.");
        }
        else{
           
            console.log(data);
           console.log("Data inserted");
           res.redirect("/forms-basic");
        }
    })
});



router.post('/update_product/:id',(req,res,next)=>{
    const id = req.params.id;
    let Products = {
        _id :id,
        Product_id:pid,
        Product_name:pname,
        price:price  ,
        description:desc,
        category:category,
        type:type
    };
    User.findOneAndUpdate({_id:id}, Products,(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/')
        }
        
    })
})
//........................................

router.post('/delete_product',(req,res,next)=>{
    Products.deleteOne({Product_id:req.body.pid},afterdataretrival);
    function afterdataretrival(err,data1)
    {
         if(err==null)
             
            {           console.log(data1);
                        console.log("Entry Deleted")
                        res.redirect("/forms-basic");

            }
                         else
                            { 
                          res.write("Failed To find record");   
                      console.log("not found");
                                       }
    }
    });

//+=================================
router.get('/tables-data',function(req,res){
    //product table
   
    Products.find(function(err,data){
        if(err){
            console.log(err)
        }
        else {
            
            console.log(data)
            res.render('tables-data',{ title: 'Express',data:data });
            
        }
    
    })
})
/*
router.get('/tables-plumber',function(req,res){

    plumber.find(function(err,data){
        if(err){
            console.log(err)
        }
        else {
            console.log(data)
           res.render('tables-plumber',{ title: 'Express',data:data });
         
        } 
    })
});

*/
router.get('/gallery',function(req,res){
    //product table
   
    Products.find(function(err,data){
        if(err){
            console.log(err)
        }
        else {
            
            
            console.log(data)
            res.render('gallery',{ title: 'Express',data:data });
            
        }
    
    })
});



router.post('/submit',(req,res)=>{
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
            port:465,
            secure: true, // true for 465, false for other ports
            auth: {
            user: 'email', // gmail id inside eg: '123@gmail.com'
            pass: 'password' // gmail password eg: 'password'
            },
            tls:{
                rejectUnauthorized: false
            }
            
        });
        
        let mailOptions = {
            from: '" Team Blendspice" <email>',
            to: 'email',
            subject: 'Contact Form Notice',
            text: 'Hello World?',
            html: output

        };

        transporter.sendMail(mailOptions, (error, info) =>{
            if(error) {
                return console.log(error);
            }
            

        
        console.log("Message sent: %s", info.messageId); 
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.sendFile(__dirname+"/contact.html");
        });
    
    
});

router.post('/feedback',(req,res)=>
{
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
      
    let transporter = nodemailer.createTransport(
        {
            host: "smtp.gmail.com",
            port:465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'email', // gmail id inside eg: '123@gmail.com'
            pass: 'password' // gmail password eg: 'password'
        },
         tls:
          {
            rejectUnauthorized: false
          }
               
        });
           
    let mailOptions = {
        from: '" Team Blendspice" <email>',
        to: 'email' ,
        subject: 'Feedback Form Notice',
        text: 'Hello World?',
        html: output
   
        };
   
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error)
        {
            return console.log(error);
        }
               
   
           
    console.log("Message sent: %s", info.messageId); 
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            
    res.sendFile(__dirname+"/about.html");
    
    
});
       
    
});
router.post('/shop',(req,res)=>
{
    mongoose.connect("mongodb://localhost:27017/Site",{useNewUrlParser : true});
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

    })
    .save(function(_err, _CShop){
        console.log(req.body);
        console.log('Inserted');
        res.sendFile(__dirname+"/shop.html");
       
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
      
    let transporter = nodemailer.createTransport(
        {
            host: "smtp.gmail.com",
            port:465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'email', // gmail id inside eg: '123@gmail.com'
            pass: 'password' // gmail password eg: 'password'
        },
         tls:
          {
            rejectUnauthorized: false
          }
               
        });
           
    let mailOptions = {
        from: '" Team Blendspice" <email>',
        to: 'email' ,
        subject: 'Feedback Form Notice',
        text: 'Hello World?',
        html: output
   
        };
   
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error)
        {
            return console.log(error);
        }
               
   
           
    console.log("Message sent: %s", info.messageId); 
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            
    res.sendFile(__dirname+"/shop.html");
    });
    

});

module.exports = router;