var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var User   = require('./../model/user');
var router = express.Router();



				router.get('/', function(req, res, next) {
				  res.send('welcome to Reveelz');
				});

				
				
				
				//Admin Creation
				var user=new  User();
				 user.username="admin";
				 user.password="admin";
				User.findOne({"username":"admin"},function(err,userobj){
				 if(err)
				 {
				  console.log("error in prgm");
				 }
				 else if(userobj)
				 { 
				  console.log("admin existed already");
				 }
				 else
				 {
				  user.save(function(err,obj){
				  if(err){
				   console.log("admin not saved");
				  }else
				  {
				   console.log("admin saved successfully");
				   User.find('user', function(err,user) {
					var json={
					"response":"adminsuccess",  
					"user":user
					}
				   });
				  }
				  });
				 }
				});
				
				
		//Login
		router.post('/login', function(req, res) 
			{
				
				User.findOne(({ $or: [ { "username": req.body.username }, { "email": req.body.username } ] }), function(err,user) 
						{
							
							
							if(err)
							{
							
								res.header("Access-Control-Allow-Origin", "*");
								res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
								res.send("error");
							}
							else if(user)
							{
								
								if(user.password == req.body.password)
									{	
										if(user.username == "admin")
										  {
										   var json={
										   "response":"adminsuccess",  
										   "user":user
										   }
										  }
										  else
										  {

										   var json={
										   "response":"success",  
										   "user":user
										   }
										  }
										 res.header("Access-Control-Allow-Origin", "*");
										 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
										 res.send(json);
									}
								else
									 {
										res.header("Access-Control-Allow-Origin", "*");
										res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
										res.send("invalidPassword");
									 }
							}
								 
							
							else
							{
								res.header("Access-Control-Allow-Origin", "*");
								res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
								res.send("invalidUser");
							}
						 
						});
				
				
			});
			
	//Registration
	router.post('/register',function(req,res)
	{
		console.log(req.body.imagefile)
		User.findOne({"username":req.body.username}, function(err,user) 
      {    
       if(err)
       {
       
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send("error");
       }
       else if(user)
       {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send("exist");
       }
       else 
       {
        User.findOne({"email":req.body.email},function(err,user){
            
        if(err)
        {
       
         res.header("Access-Control-Allow-Origin", "*");
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         res.send("error");
        }
        else if(user)
        {
         res.header("Access-Control-Allow-Origin", "*");
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         res.send("emailexist");
        }
        
       
        
        else
        {
         var user = new User();
         user.fname=req.body.firstname;
         user.lname= req.body.lastname;
         user.email= req.body.email;
         user.username= req.body.username;
         user.password= req.body.password;
         user.phone= req.body.phone;
         user.deleteuser=false;
         user.save(function(err)
         {
          console.log(err);
          if (err)
           {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send("error");
           } 
          else
          {
			  console.log("kkkkkkkkk register"+user)
           res.header("Access-Control-Allow-Origin", "*");
           res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
           res.send("success");
          }
         });
       }
       
       }); 
      
      }
      
    });
    
	});
	
	
	
	//get all users
	router.post('/getAllUsers',function(req,res){
	User.find(function(err,allusers){
		console.log("kakakakaka")
		if(err)
       {
       
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send("error");
       }
       else if(allusers)
       {
		   
		   
		   var data=[];
					for(i=0;i<allusers.length;i++)
					{
						
						if(allusers[i].deleteuser=="false")
						{
							data.push(allusers[i]);
							
						}
						
					}
		   
		   var json={
				  "response":"success", 
				  "allusers":data
			   }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(json);
		
       }
	});
	});
	
	
	 
		 router.get('/editUsers',function(req,res){
			 console.log("jhsa")
		console.log(req.query.data)
		
		
		User.findOne({"_id":req.query.data},function(err,user){
			
			if(err)
			{
				console.log(err);
			}
			else
			{
				console.log("data"+user)
				 res.header("Access-Control-Allow-Origin", "*");
				res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
				res.send(user);
				
			}
		});
	});
	
	
module.exports = router;
