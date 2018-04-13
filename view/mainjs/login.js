 /*  var baseUrl = "//localhost:9000";  */
  var baseUrl="http://52.221.231.42:9000";

			$(document).ready(function(){
				$('#password').keyup(function(e){
					if(e.keyCode == 13)
						{
						   $('#login').click();
						}
				});
				
				
				
			});


			$('#login').click(function(){
				  var result = 0;
				 $('#successRegister').empty();
				 var userName = $('#username').val();
				 var passWord = $('#password').val();
				 if(userName==null || userName=="")
				 {
				  $('#userError').text('User Name is required');
				   result++;
				 }
				 else
				 {
				  $('#userError').empty();
				
				 }
				  if(passWord==null || passWord=="")
				 {
				  $('#passError').text('Password is required');
				   result++;
				 }
				 else
				 {
				  $('#passError').empty();
				
				 }
				 if(result==0){
		 
					$(document).ready(function(){
					
						$.ajax({
							type: 'POST',
							url: baseUrl+'/users/login',
							datatype:'jsonp',
							jsonp:"callback",
							data:{username:userName,password:passWord},
							success: function(response){

									  console.log(response);
									  
								var stringres=JSON.stringify(response);
								 var result=JSON.parse(stringres);
								 var parseresult=result.response;
								 var user=result.user;
								 
								localStorage.setItem('userdetails',JSON.stringify(user))
								
								if(parseresult=="success")
								{
									location.href = "./publisherDashboard.html";
								}
								
								else if(parseresult == "adminsuccess")
								{
									location.href = "./managePublisherNew.html"; 
									
								}
								
								else if(response == "invalidPassword")
								{
									$('#passError').text("Password doesn't match. Please enter correct password");
									
								}
								else
								{
									$('#userError').text("We don't find this user name. Please re-enter correct user name and check caps lock");								
								}
							},
							error: function(err){
									
									console.log("error msg"+JSON.stringify(err));
							}
						});
					});	
	 }
});


	//Register
$(document).ready(function()
  {
	$("#register").click(function()
	{
	
		var userName = $("#registerusername").val();
		var firstName = $("#firstname").val();
		var lastName = $("#lastname").val();
		var email = $("#email").val();
		var passWord = $("#registerpassword").val();
		var confirmPass = $("#registerconfirmPass").val();
		var phone =$("#phone").val();
		var result=0;
		
		if(userName == "" ||userName == null)
		{
			$("#regUserError").text("User Name is required");
			result++;
		}
		else if(userName.charAt(0) == ' ')
		{
			$("#regUserError").text("User Name don't start with space");
			result++;
		}
		else if(userName.length <8)
		{
			$('#regUserError').text('User Name must contain at least eight characters!');
		result++;
		}
		else
		{
			$("#regUserError").empty();
		}
		if(firstName == "" || firstName == null)
		{
			$("#firstnameError").text("First Name is required");
			result++;
		}
		else if(firstName.charAt(0) == ' ')
		{
			$("#firstnameError").text("First Name don't start with space");
			result++;
		}
		else
		{
			
			$("#firstnameError").empty();
		}
		if(lastName == "" || lastName == null)
		{
			$("#lastnameError").text("Last Name is required");
			result++;
		}
		else if(lastName.charAt(0) == ' ')
		{
			$("#lastnameError").text("Last Name don't start with space");
			result++;
		}
		else
		{
			$("#lastnameError").empty();
		}
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
		
		if(email == "" || email == null)
		{
			$("#emailError").text("Email Address is required");
			result++;
		}
		else if(!(email.match(mailformat)))
		{
			$("#emailError").text(" Please enter a valid Email Address");
			result++;
		}
		else
		{
			$("#emailError").empty();
		}
		
		var numVal = /[0-9]/;
		var smallVal = /[a-z]/;
		var capsVal = /[A-Z]/;
		var regularExpression  = /^[a-zA-Z\d\-_.,\s]+$/;
		if(passWord == "" || passWord == null)
		{
			$("#regPassError").text("Password is required");
			result++;
		}
		else if(passWord.length < 6)
		{
			$("#regPassError").text('Password must contain at least six characters!');
			result++;
		}
		else if(!numVal.test(passWord))
		{
			$('#regPassError').text('Password must contain at least one number (0-9)!');
			result++;
		}
				 
		else if(!smallVal.test(passWord))
		{
			$('#regPassError').text('Password must contain at least one lowercase letter (a-z)!');
			result++;
		}
		else if(!capsVal.test(passWord))
		{
			$('#regPassError').text('Password must contain at least one uppercase letter (A-Z)!');
			result++;
		}
		else if (regularExpression.test(passWord)) 
		{
			$('#regPassError').text("Password should contain atleast one special character !");+
			result++;
		}	 
		else
		{
			$("#regPassError").empty();
		}
		if(confirmPass == "" || confirmPass == null)
		{
			$("#confirmPassError").text("Confirm Password is required");
			result++;
		}
		else if(passWord != confirmPass)
		{
		
			$("#confirmPassError").text("Password and Confirm Password are not matching");
			result++;
		}
		else
		{
			$("#confirmPassError").empty();
		}
		
		var phoneno = /^[0-9]{10}$/;
		
		if(phone == "" || phone == null)
		{
			$("#mobileError").text("Phone Number is required");
			result++;
		}
		else if(!phone.match(phoneno))
		{
			$('#mobileError').text('Please enter a valid Phone Number'); 
			result++;
		}
		else
		{
			$("#mobileError").empty();
		}
		 /* var checkBox=document.getElementById("registrationLicence").checked;
		if(!checkBox)
		{
			$('#checkboxerr').text('Please Accept license agreement');
			result++;
					 
		}
		else
		{
					 
			$('#checkboxerr').empty();
		 } */
		if(result == 0)
		{
			$.ajax({
				type: 'POST',
				url: baseUrl+'/users/register',
				datatype:'jsonp',
				jsonp:"callback",
				data:{username:userName,firstname:firstName,lastname:lastName,email:email,password:passWord,phone:phone},
				
				success : function(response)
				{
								 
					 if(response=="success")
					{
						$('#sucessfullyRegister').modal('show');
				
						//location.href="./index.html";
					} 
			
					else if(response == "exist")
					{
						$('#regUserError').text('This user name is already taken');
					}
					else if(response == "emailexist")
					{
						$('#emailError').text('This email is already taken');
					}
					else
					{
						console.log("sorry, some error occured please try again later");
					} 
				
				},
				error:function(err)
				{
					console.log(err);
					
				}
			
			});
		}
	});
  });

	//forgot passWord

	$("#forgot").click(function(){
		
		var result = 0;
		var forgotEmail=$("#forgotemail").val();
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
		
		if(forgotEmail == null || forgotEmail == "")
		{
			$('#forgotEmailError').text('Email Address is required');
			result++;
		} 
		else if(!(forgotEmail.match(mailformat)))
		{
			   
			$('#forgotEmailError').text('Invalid email format. Please enter in right format');
			result++;
		}	
			
		else
		{
			$('#forgotEmailError').empty();
			
		}
		
			  /* var params = document.URL;
			  var msg = params.split("index"); */
			if(result == 0)
			{
				$.ajax({
					type : 'POST',
					url : baseUrl+'/users/forgotPassword',
					datatype : 'jsonp',
					jsonp : 'callback',
					data : {email : forgotEmail},
					success : function(response)
					{
						if(response=="sucess")
						{
							$('#successForgot').text('Email sent to your registered email id to change the password. Please follow the instructions mentioned in the email.');			
						}
						else if(response=="invalidEmail")
						{
							$('#failedForgot').text("We don't find this email is associated with any user. Please re-enter correct email id");
						}
						else
						{
							$('#failedForgot').text("Sorry, some error occured Please try again later");
						}
					  
					},
					error : function(err)
					{
						console.log(err);
						
					}
			});
		}
	
	
	});
	
	
	
	//forgot password change
	
	$('#forgotPassword').click(function()
	{
		   
				var params = document.URL;
				var msg = params.split("?");
						 
				var val = msg[1].split("=");	
			console.log(val[1]);
				var pass = $('#newPass').val();
				var repass = $('#reNewPass').val();
				
				//$('#changePassErr').empty();
				//$('#changePass').empty();
				
				
				var result = 0;

				
				var numVal = /[0-9]/;
				var smallVal = /[a-z]/;
				var capsVal = /[A-Z]/;
				var regularExpression  = /^[a-zA-Z\d\-_.,\s]+$/;
				 if(pass==null || pass=="")
				 {
				   $('#newpassError').text('New Password is required');
				   result++;
				 }
				 else if(pass.length < 6)
				 {
				  $('#newpassError').text('New Password must contain at least six characters!');
				   result++;
				 }
				 else if(!numVal.test(pass))
				 {
				  $('#newpassError').text('New Password must contain at least one number (0-9)!');
				   result++;
				 }
				 
				 else if(!smallVal.test(pass))
				 {
				  $('#newpassError').text('New Password must contain at least one lowercase letter (a-z)!');
				   result++;
				 }
				 else if(!capsVal.test(pass))
				 {
				  $('#newpassError').text('New Password must contain at least one uppercase letter (A-Z)!');
				   result++;
				 }
				 else if (regularExpression.test(pass)) {
				  $('#newpassError').text("New Password should contain atleast one special character !");
				  result++;
				 } 
			
				else
				{
					$('#newpassError').empty();
					$('#repassError').empty();
				}
				if(repass==null || repass=="")
				 {
					$('#repassError').text('Re Enter New Password is required');
					result++;
					
				}
				else if(pass != repass)
				{
					
					$('#repassError').text('New Password and Re Enter New Password are not matching');
					result++;
				}
				else
				{
					$('#repassError').empty();
					
				}
				
				if(result == 0)
				{
					$(document).ready(function(){
									 
					 
					
						$.ajax({
							type: 'POST',
							url: baseUrl+'/users/updatePwd',	
							datatype:'jsonp',
							jsonp:'callback',
							data: {newpassword:$("#newPass").val(),reenterpassword:$("#reNewPass").val(),userId:val[1]},
							success: function(response)
							{
								if(response == 'success')
								{
									$('#changePass').text('Successfully changed user password');
								}
								else if(response == 'notMatch')
								{
									$('#changePassErr').text('New Password and Confirm New Password are not matching');
								}
								else
								{
									$('#changePassErr').text('sorry, some error occured please try again later');
									
								}
								
							},
							error: function(error)
							{
								
								console.log(error);
							}
						});
						
					});
				}				
			});
			
			
			
			
			
			function getAllUsers()
			   {
				   
				    var userval=localStorage.getItem('userdetails');
				var result=JSON.parse(userval);
				
				if(result == null)
				{
					window.location = "./index.html";
				}
				else
				{
					
					var user = result.username;
					console.log(result._id);
					var userId=result._id;
					$('.user').text(user);
					$('#userId').val(userId);
				}
				   
				   
				   
				 $.ajax
				 ({
					type:'POST',
					url: baseUrl+'/users/getAllUsers',
					datatype:'jsonp',
					jsonp:"callback",
					success: function(response)
					{
						
						var stringres=JSON.stringify(response);
						var result=JSON.parse(stringres);
						var parseresult=result.response;
						var user=result.allusers;
						var option,publishers="<option value='Select Publisher'>Select Publisher</option>";
						for(var i=0;i<user.length;i++)
						{
							  if(user[i].username != "admin" )
							  {
								var option="<option value='"+user[i].username+"' id='"+user[i]._id+"'>"+user[i].username+"</option>";
								publishers+=option;
							  }  

								  
								  
						}
								$('#publishers').append(publishers);
								
								for(var i=0;i<user.length;i++)
								{
									
									if(user[i].username!="admin")
									{
										var users='<tr class="even pointer">'+
									
										'<td class=" ">'+user[i].fname+'</td>'+
										'<td class=" ">'+user[i].lname +'</td>'+
										'<td class=" ">'+user[i].username+'</td>'+
                       
										'<td class=" ">'+user[i].phone+'</td>'+
                       
										'<td class="last">'+'<a style="cursor:pointer" title="Edit" id='+user[i]._id+' onclick="editUser(this.id)">'+'<i class="fa fa-edit">'+'</i></a>&nbsp'+
												
										'<a style="cursor:pointer" title="Delete" id='+user[i]._id+' onclick="deleteUser(this.id)">'+'<i class="fa fa-trash"></i></a>'+
										
										'</td>'+
									'</tr>'
										$("#totalPublishers").append(users);
									}
								}
					},
						error:function(err)
						{
							console.log(err);
						}
				   });
			   }
			   
			   
			   
			   	
		function editUser(userId)
		
		{
			$("#regUserError").empty();
			$("#firstnameError").empty();
			$("#lastnameError").empty();
			$("#emailError").empty();
			$("#regPassError").empty();
			$("#mobileError").empty();
			$("#regConfirmPassError").empty();
			
			console.log(userId);
			$("#usersId").val(userId);
			$("#userEdit").modal('show');
			
			$.ajax({
				
				
				type:'POST',
				url: baseUrl+'/users/editUsers',
				datatype:'jsonp',
				jsonp:"callback",
				data: {userID:userId},
				success : function(response)
				{
					
					
					
					 console.log(response);
				
						
						
						$('#usersId').val(response._id);
						$('#firstname').val(response.fname);
						$('#lastname').val(response.lname);					
						$('#username').val(response.username);
						$('#email').val(response.email);
						$('#password').val(response.password);
						$('#confirmpassword').val(response.password);
						$('#Phone').val(response.phone);
					
				
					
				},
				error : function(err)
				{
					console.log(err);
				}
			}); 
		}
  
		//editUsers and save users
		$(document).ready(function()
					{
					
		
		
							$("#editUserDetails").click(function(){
								 
								var firstName = $("#firstname").val();
								var lastName = $("#lastname").val();
								var userName = $("#username").val();
								var email = $("#email").val();
								var passWord = $("#password").val();
								var confirmPassword = $("#confirmpassword").val();
								var phone = $("#Phone").val();
								var userid= $("#usersId").val();
								var result=0;
							   if(userName == "" ||userName == null)
								{
									$("#regUserError").text("User Name is required");
									result++;
								}
								else if(userName.charAt(0) == ' ')
								{
									$("#regUserError").text("User Name don't start with space");
									result++;
								}
								else if(userName.length <8)
								{
									$('#regUserError').text('User Name must contain at least eight characters!');
								result++;
								}
								else
								{
									$("#regUserError").empty();
								}
								if(firstName == "" || firstName == null)
								{
									$("#firstnameError").text("First Name is required");
									result++;
								}
								else if(firstName.charAt(0) == ' ')
								{
									$("#firstnameError").text("First Name don't start with space");
									result++;
								}
								else
								{
									
									$("#firstnameError").empty();
								}
								if(lastName == "" || lastName == null)
								{
									$("#lastnameError").text("Last Name is required");
									result++;
								}
								else if(lastName.charAt(0) == ' ')
								{
									$("#lastnameError").text("Last Name don't start with space");
									result++;
								}
								else
								{
									$("#lastnameError").empty();
								}
								var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
								
								if(email == "" || email == null)
								{
									$("#emailError").text("Email Address is required");
									result++;
								}
								else if(!(email.match(mailformat)))
								{
									$("#emailError").text(" Please enter a valid Email Address");
									result++;
								}
								else
								{
									$("#emailError").empty();
								}
								
								var numVal = /[0-9]/;
								var smallVal = /[a-z]/;
								var capsVal = /[A-Z]/;
								var regularExpression  = /^[a-zA-Z\d\-_.,\s]+$/;
								if(passWord == "" || passWord == null)
								{
									$("#regPassError").text("New Password is required");
									result++;
								}
								else if(passWord.length < 6)
								{
									$("#regPassError").text('New Password must contain at least six characters!');
									result++;
								}
								else if(!numVal.test(passWord))
								{
									$('#regPassError').text('New Password must contain at least one number (0-9)!');
									result++;
								}
										 
								else if(!smallVal.test(passWord))
								{
									$('#regPassError').text('New Password must contain at least one lowercase letter (a-z)!');
									result++;
								}
								else if(!capsVal.test(passWord))
								{
									$('#regPassError').text('New Password must contain at least one uppercase letter (A-Z)!');
									result++;
								}
								else if (regularExpression.test(passWord)) 
								{
									$('#regPassError').text("New Password should contain atleast one special character !");+
									result++;
								}	 
								if(confirmPassword == "" || confirmPassword == null)
								{
									$('#regConfirmPassError').text('Confirm New Password is required');
									result++;
								}
								else if(passWord != confirmPassword)
								{
									$('#regConfirmPassError').text('New Password and Confirm New Password are not matching');
									result++;
								}
								else
								{
									$("#regConfirmPassError").empty();
								}
								var phoneno = /^[0-9]{10}$/;
								
								if(phone == "" || phone == null)
								{
									$("#mobileError").text("Phone Number is required");
									result++;
								}
								else if(!phone.match(phoneno))
								{
									$('#mobileError').text('Please enter a valid Phone Number'); 
									result++;
								}
								else
								{
									$("#mobileError").empty();
								}
								if(result==0)
								{
									$.ajax
									({
										type : 'POST',
										url : baseUrl+'/users/saveUserDetails',
										datatype : 'jsonp',
										jsonp : 'callback',
										data : {userid:userid,firstname:firstName,lastname:lastName,username:userName,email:email,password:passWord,phone:phone},
										
										success: function(response)
										{
											
											location.reload();
										},
										error: function(err)
										{
											console.log(err);
										}
									});
								} 
							});
					});				
							

				
						function deleteUser(deleteUserId)
						{
							
							 $('#deleteUserModal').modal('show');
							$('#deleteUserId').val(deleteUserId); 
							
						}
						
					


			$(document).ready(function()
				{
					
					 $('#deleteUser').click(function()
					{
						var URLID=$('#deleteUserId').val();
								
							$.ajax
									({
									type: 'POST',
									url: baseUrl+'/users/deleteUser',
									datatype:'jsonp',
									jsonp:"callback",
									data: {URLID:URLID},
									
									success: function(response){
									
									location.reload();
									
									
									
												
									},
									error: function(error){
										console.log(error);
									}
								});
						
					});
					
				});
			
			 
			 
   
   
   
					
					 
	
			
			 
	