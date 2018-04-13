	/* var baseUrl = "//localhost:9000";  */
  var baseUrl="http://52.221.231.42:9000";


				//Image upload
				 var uploadFile;
						$("#imageFile").change(function()
						{
							readURL(this);
						});
						 function readURL(input) 
						 {
							
							uploadFile=input.files;
						   if (input.files && input.files[0])
							{
								var reader = new FileReader();

								reader.onload = function (e)
								{
									$('#image').attr('src', e.target.result);
							    }

							   reader.readAsDataURL(input.files[0]);
						    }
					    } 
				//Create Adurl by Publisher
			$('#publisherCreateAdUrl').click(function()
			  {
				  				
				$("#housevalueError").empty();
				$("#incomeGroupError").empty();
				$("#zipError").empty();
				$("#zip4Error").empty(); 
				$("#ageError").empty();  
				var result = 0;
				var title= $('#AdTitle').val();
				var adurl = $('#AdURL').val();
				var houseValue = $('#houseValue').val();
				var incomeGroup = $("#incomeGroup").val();
				var zip = $('#Zip').val();
				var age = $('#Age').val();
				var gender = $('#gender').val();
				var ownerrenter = $('#OwnerRenter').val();
				var incomeGroupValue = $('#incomeGroupValue' ).val();
				var houseValueMoney = $('#houseValueMoney').val();	
								
				/* var incomeGroupValue = $('#incomeGroupValue option:selected').text();
				var houseValueMoney = $('#houseValueMoney option:selected').text(); */ 
				
				/* var publisher = $("#publishers").val(); */
				if(title == null || title == "")
				{
					$('#titleError').text("Ad Title is required");
					result++;
				}
				else if(title.charAt(0) == ' ')
				{
					$('#titleError').text("Ad Title don't start with spaces");
					result++;
				}
				else
				{
					$("#titleError").empty();
				}
				if(adurl==null || adurl == "")
				{
					$('#adurlError').text("Ad URL is required");
					result++;
				}
				else if(adurl.charAt(0)== ' ')
				{
					$('#adurlError').text("Ad URL don't start with spaces");
					result++;
				}
				else
				{
					$('#adurlError').empty();
				}
				if(incomeGroupValue == null || incomeGroupValue == "")
				{
					$('#incomeGroupError').text("Household Income is required");
					result++;
				}
				else if(incomeGroupValue == 0)
				{
					$('#incomeGroupError').text("Household Income should not be zero");
					result++;
				}
				else
				{
					$('#incomeGroupError').empty();
				}
				if(zip == null || zip == "")
				{
					$("#zipError").text("Zip is required");
					result++;
				}
				else if(zip.length<4 || zip.length>5)
				{
					$("#zipError").empty();
					$("#zipError").text("Zip length should between four to five");
					result++;
				}
				else
				{
					$("#zipError").empty();
				}
				if(age == null || age == "")
				{
					$("#ageError").text("Age is required");
					result++;
				}
				else if(age<0 || age >120)
				{
					$("#ageError").text("Enter the Age between 0-120");
					result++;
				}
				else
				{
					$("#ageError").empty();
				}
							
			   if(ownerrenter == null || ownerrenter == "Select Position")
				{
				 $("#ownerError").text("Select Position");
				 result++;
				}
				else if(ownerrenter == "O")
				{
				 
				 if(houseValueMoney == null || houseValueMoney == "")
				 {
				  $("#ownerError").empty();
				  $("#houseValueError").text("Home Market Value is required");
				  result++;
				 }
				 else if(houseValueMoney == 0 || houseValueMoney < 1000)
				 {
				  $("#houseValueError").empty();
				  $("#ownerError").empty();
				  $("#houseValueError").text("Value should not be less than thousand dollors");
				  result++;
				 }
				 else
				 { $("#ownerError").empty();
				  $("#houseValueError").empty();
				 }
				}
				else
				{
				 $("#ownerError").empty();
				 $("#houseValueError").empty();
				 
				 
				 }
				if(gender == null || gender == "Select Gender")
				{
					$("#genderError").text("Select Gender");
					result++;
				}
				else
				{
					$("#genderError").empty();
				}
				  
				 
				if(result == 0)
				{
					
				  var myForm = new FormData();
				 
					if(uploadFile!=null)
					   {
							myForm.append("file",uploadFile[0]);
					   }
				   myForm.append("adTitle",$('#AdTitle').val());
				   myForm.append("adURL",$('#AdURL').val());
				   myForm.append("incomeGroup",$('#incomeGroup').val());
				   myForm.append("houseValue",$('#houseValue').val());
				   myForm.append("houseValueMoney",$('#houseValueMoney option:selected').text());
				   myForm.append("incomeGroupValue",$('#incomeGroupValue option:selected').text());
				   myForm.append("ownerrenter",$('#OwnerRenter').val());
				   myForm.append("zip",$('#Zip').val());
				   myForm.append("publishers",$('#publishers').val());
				   myForm.append("zip4",$('#Zip4').val());
				   myForm.append("age",$('#Age').val());
				   myForm.append("gender",$('#gender').val());
				   myForm.append("maritalStatus",$('#MaritalStatus').val());
				   myForm.append("publisherId",$('#userId').val());
				 
				  
					
					$(document).ready(function()
					{
					
						$.ajax
						({
							type: 'POST',
							url: baseUrl+'/adURL/createAdURL',
							datatype:'jsonp',
							jsonp:"callback",
							data: myForm,
							enctype: 'multipart/form-data',
							processData: false, 
							contentType:false,
							success: function(response){
								if(response == "urlexist")
								{
									$('#adurlError').text("This Ad URL is already taken");
								}
								else	
								{
									$('#adCreatedPublisher').modal('show');
								}
									
							},
							error: function(error){
								console.log("sorry, some error occured please try again later");
							}
						});
						 
					});
				}
								
			});
			
			
				//dasboard for publisher urls list			 
				function getUrls()
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
							console.log(user);
							var userId=result._id;
							$('.user').text(user);
									
						}
					
					$.ajax
					  ({
					     type: 'post',
					     url: baseUrl+'/adURL/getDashboardUrls',
						 datatype:'jsonp',
						 data:{userId:userId},
						 jsonp:"callback",
						 success:function(response)
					     {
							 
							var totAdUrls='';
							/* var incomeGroup='';  */
							for(var i=0;i<response.length;i++)
							{
 						     
								var adurl="<tr class='even pointer'>"+
									 "<td>"+response[i].adTitle+"</td>"+
									 "<td>"+response[i].adURL+"</td>"+
									  "<td>"+response[i].incomeGroup+"</td>"+
									  "<td >"+response[i].zip+"</td>"+
									   "<td class='last'><a id='"+response[i]._id+"' style='cursor:pointer' onClick='editUrl(this.id)' title='Edit'><i class='fa fa-edit'></i></a>&nbsp"+
										"<a id='"+response[i]._id+"' style='cursor:pointer' onClick='deleteAdurl(this.id)'  title='Delete'><i class='fa fa-trash'></i></a>"+
									  
									  "</tr>"
									totAdUrls=totAdUrls+adurl;
							}
								
								$('#totalUrls').append(totAdUrls);
									
						 },
						  error: function(error)
							{
								console.log(error);
							}
					  });

				   }
				   				   				   				   
				//onclick manage urls by publisher
			   function editUrl(adurlId)
			    {
				    $('#noAnimation').modal('show');
					var homeMarketValue='';
					var incomeGroup='';
					$.ajax
					({
							type: 'POST',
							url: baseUrl+'/adURL/getAdURL',
							datatype:'jsonp',
							jsonp:"callback",
							data: {adurlId:adurlId},
							success: function(response)
							{
								console.log("getAdURL*****"+response[0].incomeGroupValue);
								
								houseValue = response[0].houseValue;
								houseValue = houseValue.split(",");
								incomeGroup = response[0].incomeGroup;
								incomeGroup = incomeGroup.split(","); 
								$('#adurlId').val(response[0]._id);
								$('#AdTitle').val(response[0].adTitle);
								$('#AdURL').val(response[0].adURL);	
								$('#houseValue').val(response[0].houseValue);
								$('#incomeGroup').val(response[0].incomeGroup);
								$('#houseValueMoney').val(response[0].houseValue);
								$('#incomeGroupValue').val(response[0].incomeGroup);
								$('#OwnerRenter').val(response[0].ownerrenter);
								if( response[0].ownerrenter == "O" )
								{
									$('#input').show();
								}
								
								$('#Zip').val(response[0].zip);
								$('#Zip4').val(response[0].zip4);
								$('#Age').val(response[0].age);
								$('#gender').val(response[0].gender);
								$('#MaritalStatus').val(response[0].maritalStatus);
								$("#image").attr("src","https://s3.amazonaws.com/Reveelz/"+response[0]._id+".png");
								
								
										
							},
							error: function(error)
							{
								console.log(error);
							}
						});
					
				}
				
	

		//save edit urls by publisher
	      $('#editUserAdUrl').click(function()
		     {
			console.log(incomeGroupValue);
			console.log(houseValueMoney);
				$("#housevalueError").empty();
				$("#incomeGroupError").empty();
				$("#zipError").empty();
				$("#zip4Error").empty(); 
				$("#ageError").empty();
				var result = 0;
				var title= $('#AdTitle').val();
				var adurl = $('#AdURL').val();
				var houseValue = $('#houseValue').val();
				var incomeGroup = $('#incomeGroup').val();
				var zip = $('#Zip').val();
				var zip4 = $('#Zip4').val();
				var age = $('#Age').val();
				var ownerrenter = $('#OwnerRenter').val();
				var gender = $("#gender").val();
				var incomeGroupValue = $('#incomeGroupValue').val();
				var houseValueMoney = $('#houseValueMoney').val();
					
				if(title == null || title == "")
				{
					$('#titleError').text("Ad Title is required");
					result++;
				}
				else if(title.charAt(0) == ' ')
				{
					$('#titleError').text("Ad Title don't start with spaces");
					result++;
				}
				else
				{
					$("#titleError").empty();
				}
				if(adurl==null || adurl == "")
				{
					$('#adurlError').text("Ad URL is required");
					result++;
				}
				else if(adurl.charAt(0) == ' ')
				{
					$('#titleError').text("Ad URL don't start with spaces");
					result++;
				}
				else
				{
					$('#adurlError').empty();
				}
				 if(houseValue == null || houseValue == "")
				{
					$("#housevalueError").text("Household Income is required");
					result++;
				}
				else
				{
					$("#housevalueError").empty();
				} 
				if(zip == null || zip == "")
				{
					$("#zipError").text("Zip is required");
					result++;
				}
				else if(zip.length<4 || zip.length>5)
				{
					$("#zipError").empty();
					$("#zipError").text("Zip length should between four to five");
					result++;
				}
				else
				{
					$("#zipError").empty();
				}
				
				if(age == null || age == "")
				{
					$("#ageError").text("Age is required");
					result++;
				}
				else if(age<0 || age >120)
				{
					$("#ageError").text("Enter the Age between 0-120");
					result++;
				}
				else
				{
					$("#ageError").empty();
				}
							
				if(ownerrenter == null || ownerrenter == "Select Position")
				{
				 $("#ownerError").text("Select Position");
				 result++;
				}
				else if(ownerrenter == "O")
				{
				 
				 if(houseValueMoney == null || houseValueMoney == "")
				 {
				  $("#ownerError").empty();
				  $("#houseValueError").text("Home Market Value is required");
				  result++;
				 }
				 else if(houseValueMoney == 0 || houseValueMoney < 1000)
				 {
				  $("#houseValueError").empty();
				  $("#ownerError").empty();
				  $("#houseValueError").text("Value should not be less than thousand dollors");
				  result++;
				 }
				 else
				 { $("#ownerError").empty();
				  $("#houseValueError").empty();
				 }
				}
				else
				{
				 $("#ownerError").empty();
				 $("#houseValueError").empty();
				 
				 
				 }
					if(incomeGroupValue == null || incomeGroupValue == "")
				{
					$('#incomeGroupError').text("Household Income is required");
					result++;
				}
				else if(incomeGroupValue == 0)
				{
					$('#incomeGroupError').text("Household Income should not be zero");
					result++;
				}
				else
				{
					$('#incomeGroupError').empty();
				}
				if(gender == null || gender == "Select Gender")
				{
					$("#genderError").text("Select Gender");
					result++;
				}
				else
				{
					$("#genderError").empty();
				}
				
								 
				if(result == 0)
				{
					
					var myForm = new FormData();
				 
					if(uploadFile!=null)
					   {
							myForm.append("file",uploadFile[0]);
					   }
				   myForm.append("adTitle",$('#AdTitle').val());
				   myForm.append("adURL",$('#AdURL').val());
				   myForm.append("incomeGroup",$('#incomeGroup').val());
				   myForm.append("houseValue",$('#houseValue').val());
				   myForm.append("houseValueMoney",$('#houseValueMoney option:selected').text());
				   myForm.append("incomeGroupValue",$('#incomeGroupValue option:selected').text());
				   myForm.append("ownerrenter",$('#OwnerRenter').val());
				   myForm.append("zip",$('#Zip').val());
				   myForm.append("zip4",$('#Zip4').val());
				   myForm.append("age",$('#Age').val());
				   myForm.append("gender",$('#gender').val());
				   myForm.append("maritalStatus",$('#MaritalStatus').val());
				   myForm.append("adurlId",$('#adurlId').val());
					
					
					$(document).ready(function()
					 {
					
						$.ajax({
							type: 'POST',
							url: baseUrl+'/adURL/updateAdURL',
							datatype:'jsonp',
							jsonp:"callback",
							data: myForm,
							enctype: 'multipart/form-data',
							processData: false, 
							contentType:false,
							success: function(response)
							{
								location.href='./manageURLSPublisher.html'; 
									
							},
							error: function(error)
							{
								console.log("sorry, some error occured please try again later");
							}
						});
						 
					});
				}
				
				
				
			});
			
			
			//delete url onclick by publisher
			function deleteAdurl(deleteAdurl)
					{
					    $('#deleteAdurlModal').modal('show');
					    $('#deleteAdurlId').val(deleteAdurl); 
							
						}
						
						
					//delete url by publisher
					 $('#deleteAdurldb').click(function()
					{
						var URLID=$('#deleteAdurlId').val();
								
							$.ajax
							({
									type: 'POST',
									url: baseUrl+'/adURL/deleteAdURLById',
									datatype:'jsonp',
									jsonp:"callback",
									data: {URLID:URLID},
									success: function(response)
									{
									
									  location.reload();
																														
									},
									error: function(error)
									{
										console.log(error);
									}
								});
						
					});
					
					
					
					
					
			//page load dashboard urls of publisher 				 
			function getDashboardUrls()
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
						
						var userId=result._id;
						$('.user').text(user);
								
					}
							   

				$.ajax
				  ({
					   type: 'post',
					   url: baseUrl+'/adURL/getDashboardUrls',
					   datatype:'jsonp',
					   jsonp:"callback",
					   data:{userId:userId},
					   success:function(response)
					   {
						  
						 var totAdUrls='';
					      /* var incomeGroup='';  */
						 for(var i=0;i<response.length;i++)
						  {
							 /* incomeGroup = response[i].incomeGroup;
							  incomeGroup = incomeGroup.split(",");  */
							 
						     var adurl="<tr class='even pointer'>"+
									 "<td>"+response[i].adTitle+"</td>"+
									 "<td>"+response[i].adURL+"</td>"+
									  "<td>"+response[i].incomeGroup+"</td>"+
									  "<td >"+response[i].zip+"</td>"+
									   "<td class='last'><a href='viewMetrics.html?id="+response[i]._id+"'>View Metrics</a></td>"+
									  
									  "</tr>"
						     totAdUrls=totAdUrls+adurl;
						  }
						    
						   $('#totalUrls').append(totAdUrls); 
						},
						  error: function(error)
						 {
						   console.log(error);
						  }
				  });
				
			   }
			   
			   
				//Create Adurl by Admin
			$('#createAdUrl').click(function()
			  {
				  
				  
				$("#housevalueError").empty();
				$("#incomeGroupError").empty();
				$("#zipError").empty();
				$("#zip4Error").empty(); 
				$("#ageError").empty();  
				var result = 0;
				var title= $('#AdTitle').val();
				var adurl = $('#AdURL').val();
				var houseValue = $('#houseValue').val();
				var incomeGroup = $("#incomeGroup").val();
				var zip = $('#Zip').val();
				var age = $('#Age').val();
				var ownerrenter = $('#OwnerRenter').val();
				var gender = $('#gender').val();
				var incomeGroupValue = $('#incomeGroupValue ').val();
				var houseValueMoney = $('#houseValueMoney').val();
				/* var incomeGroupValue = $('#incomeGroupValue option:selected').text();
				var houseValueMoney = $("#houseValueMoney option:selected").text(); */
				var publisher = $("#publishers").val();
				if(title == null || title == "")
				{
					$('#titleError').text("Ad Title is required");
					result++;
				}
				else if(title.charAt(0) == ' ')
				{
					$('#titleError').text("Ad Title don't start with spaces");
					result++;
				}

				else
				{
					$("#titleError").empty();
				}
				if(adurl==null || adurl == "")
				{
					$('#adurlError').text("Ad URL is required");
					result++;
				}
				else if(adurl.charAt(0) == ' ')
				{
					$('#adurlError').text("Ad Url don't start with spaces");
					result++;
				}
				else
				{
					$('#adurlError').empty();
				}
				if(incomeGroupValue == null || incomeGroupValue == "")
				{
					$('#incomeGroupError').text("Household Income is required");
					result++;
				}
				else if(incomeGroupValue == 0)
				{
					$('#incomeGroupError').text("Household Income should not be zero");
					result++;
				}
				else
				{
					$('#incomeGroupError').empty();
				}
				if(zip == null || zip == "")
				{
					$("#zipError").text("Zip is required");
					result++;
				}
				else if(zip.length<4 || zip.length>5)
				{
					$("#zipError").empty();
					$("#zipError").text("Zip length should between four to five");
					result++;
				}
				else
				{
					$("#zipError").empty();
				}
				if(publisher == null || publisher == "Select Publisher")
				{
				 $("#publisherError").text("Select Publisher");
				 result++;
				}
				else
				{
				 $("#publisherError").empty();
				}
				if(age == null || age == "")
				{
					$("#ageError").text("Age is required");
					result++;
				}
				else if(age<0 || age >120)
				{
					$("#ageError").text("Enter the Age between 0-120");
					result++;
				}
				else
				{
					$("#ageError").empty();
				}
							
			    if(ownerrenter == null || ownerrenter == "Select Position")
				{
				 $("#ownerError").text("Select Position");
				 result++;
				}
				else if(ownerrenter == "O")
				{
				 
				 if(houseValueMoney == null || houseValueMoney == "")
				 {
				  $("#ownerError").empty();
				  $("#houseValueError").text("Home Market Value is required");
				  result++;
				 }
				 else if(houseValueMoney == 0 || houseValueMoney < 1000)
				 {
				  $("#houseValueError").empty();
				  $("#ownerError").empty();
				  $("#houseValueError").text("Value should not be less than thousand dollors");
				  result++;
				 }
				 else
				 { $("#ownerError").empty();
				  $("#houseValueError").empty();
				 }
				}
				else
				{
				 $("#ownerError").empty();
				 $("#houseValueError").empty();
				 
				 
				 }
				if(gender == null || gender == "Select Gender")
				{
					$("#genderError").text("Select Gender");
					result++;
				}
				else
				{
					$("#genderError").empty();
				}
				  
				 
				if(result == 0)
				{
					
				  var myForm = new FormData();
				 
					if(uploadFile!=null)
					   {
							myForm.append("file",uploadFile[0]);
					   }
				   myForm.append("adTitle",$('#AdTitle').val());
				   myForm.append("adURL",$('#AdURL').val());
				   myForm.append("incomeGroup",$('#incomeGroup').val());
				   myForm.append("houseValue",$('#houseValue').val());
				   myForm.append("houseValueMoney",$('#houseValueMoney option:selected').text());
				   myForm.append("incomeGroupValue",$('#incomeGroupValue option:selected').text());
				   myForm.append("ownerrenter",$('#OwnerRenter').val());
				   myForm.append("zip",$('#Zip').val());
				   myForm.append("publishers",$('#publishers').val());
				   myForm.append("zip4",$('#Zip4').val());
				   myForm.append("age",$('#Age').val());
				   myForm.append("gender",$('#gender').val());
				   myForm.append("maritalStatus",$('#MaritalStatus').val());
				   myForm.append("publisherId",$('#userId').val());
				 
				  
					
					$(document).ready(function()
					{
					
						$.ajax
						({
							type: 'POST',
							url: baseUrl+'/adURL/createAdURL',
							datatype:'jsonp',
							jsonp:"callback",
							data: myForm,
							enctype: 'multipart/form-data',
							processData: false, 
							contentType:false,
							success: function(response){
								if(response == "urlexist")
								{
									$('#adurlError').text("This Ad URL is already taken");
								}
								else	
								{
									$('#adCreatedSuccessfully').modal('show');
								}
									
							},
							error: function(error){
								console.log("sorry, some error occured please try again later");
							}
						});
						 
					});
				}
								
			});
			
			
			   
			   			   
		//admin dashboard users list
		function getAllPublishers()
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
						
								
								for(var i=0;i<user.length;i++)
								{
									if(user[i].username != "admin")
									{
									  var users='<tr class="even pointer">'+
                        
										'<td class=" ">'+user[i].fname+'</td>'+
										'<td class=" ">'+user[i].lname +'</td>'+
										'<td class=" ">'+user[i].username+'</td>'+
                       
										'<td class=" ">'+user[i].phone+'</td>'+
                                         "<td class='last'><a href='publisherads.html?id="+user[i]._id+"&name="+user[i].username+"'>View Ads</a></td>"+
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
			   
			   
			   
			   
   		   
	
					// view Publisher Ads by admin
			function getPublisherAds()
				{
					$("#listItems").show();
					var userval=localStorage.getItem('userdetails');
					var result=JSON.parse(userval);
							
					if(result == null)
					{
					   window.location = "./index.html";
					}
					else
					{
								
						var user = result.username;
						
						var userId=result._id;
						$('.user').text(user);
								
					}
					 /* var params = document.URL;
						 var msg = params.split("?");
						 
						 var val = msg[1].split("=");
					 */	 
						 
						 var query = window.location.search.substr(1);
				         var idresult = {};
						 var resultArray=new Array();
                        query.split("&").forEach(function(part)
						{
							var item = part.split("=");
							idresult[item[0]] = decodeURIComponent(item[1]);
							
							 resultArray.push(idresult[item[0]]); 
							
						});
						 var val= resultArray[0];
						 
						 var username=resultArray[1];
						 
						 $('#username').text(username);
						 
						 

				
				$.ajax
				  ({
					 
					   type: 'post',
					   url: baseUrl+'/adURL/getPublisherAds',
					   datatype:'jsonp',
					   jsonp:"callback",
					   data:{publisherId:val},
					   success:function(response)
					   {
						   
						  /*  var incomeGroup='';  */
								var totAdUrls='';
						        /* incomeGroup = response[0].incomeGroup;
                                incomeGroup = incomeGroup.split(","); */
							
					            for(var i=0;i<response.length;i++)
								{
									
									var users='<tr class="even pointer">'+
                        
										'<td class=" ">'+response[i].adTitle+'</td>'+
										'<td class=" ">'+response[i].adURL +'</td>'+
										'<td class=" ">'+response[i].incomeGroup+'</td>'+
									    '<td class=" ">'+response[i].zip+'</td>'+
                                        "<td class='last'><a href='viewMetrics.html?id="+response[i]._id+"'>View Metrics</a></td>"+
										'</td>'+
									'</tr>'
										$("#totalUrls").append(users);
								
								}
						    
						  
						},
						  error: function(error)
						 {
						   console.log(error);
						  }
				  });
			   }
			
			   	 
	
			function selectOption(s)
					{
						console.log(s[s.selectedIndex].id);
						
						var publishersId=s[s.selectedIndex].id;
						console.log(publishersId+"publishersId");
						$("#userId").val(publishersId);
					}   
					
					
			//manage ads by admin		
			function manageAllUrls()
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
						
						var userId=result._id;
						$('.user').text(user);
								
					}
							   

				$.ajax
				  ({
					   type: 'post',
					   url: baseUrl+'/adURL/getUrls',
					   datatype:'jsonp',
					   jsonp:"callback",
					    success:function(response)
					   {
						 
						 var totAdUrls='';
					      
						 for(var i=0;i<response.length;i++)
						  {
							   

							//console.log("kkkkkkkkkk"+response[i].incomeGroup);
						     var adurl="<tr class='even pointer'>"+
									 "<td>"+response[i].adTitle+"</td>"+
									 "<td>"+response[i].adURL+"</td>"+
									  "<td>"+response[i].incomeGroup+"</td>"+
									  "<td >"+response[i].zip+"</td>"+
									  '<td class="last">'+'<a style="cursor:pointer" title="Edit" id='+response[i]._id+' onclick="adminEditUrl(this.id)">'+'<i class="fa fa-edit">'+'</i></a>&nbsp'+
									  '<a style="cursor:pointer" title="Delete" id='+response[i]._id+' onclick="adminDeleteUrl(this.id)">'+'<i class="fa fa-trash"></i></a>'+
									   '</td>'+
 								   "</tr>"
						     totAdUrls=totAdUrls+adurl;
						  }
						    
						   $('#totalUrls').append(totAdUrls); 
						},
						  error: function(error)
						 {
						   console.log(error);
						  }
				  });
				
			   }
			   
			   
			   
		//onclick edit by admin
		function adminEditUrl(urlID)
		{
			 
			$("#urlEdit").modal('show');
			
			$("#urlID").val(urlID); 
			 $.ajax
			 ({
				
				
				type:'POST',
				url: baseUrl+'/adURL/editUrl',
				datatype:'jsonp',
				jsonp:"callback",
				data: {urlID:urlID},
				success : function(response)
				{					
					console.log(response.houseValueMoney);
					var publisehrname = response.publisher;						
 				    houseValue = response.houseValue;
			        houseValue = houseValue.split(",");
					incomeGroup = response.incomeGroup;
			        incomeGroup = incomeGroup.split(","); 
					$('#editurlID').val(response._id);
					$('#AdTitle').val(response.adTitle);
					$('#AdURL').val(response.adURL);
					
					$('#houseValue').val(response.houseValue);
					$('#incomeGroup').val(response.incomeGroup);
					$('#houseValueMoney').val(response.houseValue);
					$('#incomeGroupValue').val(response.incomeGroup);
					
					//$('#houseValueMoney').val(response.houseValueMoney);
					//$('#incomeGroupValue').val(response.incomeGroupValue);
					$('#OwnerRenter').val(response.ownerrenter);
					if( response.ownerrenter == "O" )
						{
						   $('#input').show();
						}
					
					$('#Zip').val(response.zip);
					$('#Zip4').val(response.zip4);
					$('#Age').val(response.age);
					$('#gender').val(response.gender);
					$('#MaritalStatus').val(response.maritalStatus);
					$("#image").attr("src","https://s3.amazonaws.com/Reveelz/"+response._id+".png");
					if(publisehrname == "undefined" || publisehrname == null)
					{
						$("#publish").hide();
					}
					else if(publisehrname != "undefined" || publisehrname != null)
					{
						$("#publish").show();
						var option,url="<option value=''>"+response.publisher+"</option>";
						$('#publishers').append(url);
					}					
				
					
				},
				error : function(err)
				{
					console.log(err);
				}
			}); 
		}
	 

	 
		 //editUsers and save users by admin
		$(document).ready(function()
		 {
				$("#editAdUrl").click(function(){
					

				 $("#housevalueError").empty();
                 $("#incomeGroupError").empty();
				$("#zipError").empty();
				$("#zip4Error").empty(); 
				$("#ageError").empty();
				 var result = 0;
				 var userId=$("#editurlID").val();	  
				var title= $('#AdTitle').val();
				var adurl = $('#AdURL').val();

				var zip = $('#Zip').val();
				var zip4 = $('#Zip4').val();
				var age = $('#Age').val();
				var ownerrenter = $('#OwnerRenter').val();
				var gender = $('#gender').val();
				var maritalstatus = $('#MaritalStatus').val();
				var houseValue = $('#houseValue').val();
				var incomeGroup = $("#incomeGroup").val();
				//var houseValueMoney = $("#houseValueMoney").val();
				//var incomeGroupValue = $("#incomeGroupValue").val(); 								
				var incomeGroupValue = $('#incomeGroupValue option:selected').text();
				var houseValueMoney = $('#houseValueMoney option:selected').text();

				
				if(title == null || title == "")
				{
					$('#titleError').text("Ad Title is required");
					result++;
				}
				else if(title.charAt(0) == ' ')
				{
						$('#titleError').text("Ad Title don't start with spaces");
						result++;
				}
				else
				{
					$("#titleError").empty();
				}
				if(adurl==null || adurl == "")
				{
					$('#adurlError').text("Ad URL is required");
					result++;
				}
				else if(adurl.charAt(0) == ' ')
				{
					$('#adurlError').text("Ad URL don't start with spaces");
					result++;
				}
				else
				{
					$('#adurlError').empty();
				}
				if(ownerrenter == null || ownerrenter == "Select Position")
				{
				 $("#ownerError").text("Select Position");
				 result++;
				}
				else if(ownerrenter == "O")
				{
				 
				 if(houseValueMoney == null || houseValueMoney == "")
				 {
				  $("#ownerError").empty();
				  $("#houseValueError").text("Home Market Value is required");
				  result++;
				 }
				 else if(houseValueMoney == 0 || houseValueMoney < 1000)
				 {
				  $("#houseValueError").empty();
				  $("#ownerError").empty();
				  $("#houseValueError").text("Value should not be less than thousand dollors");
				  result++;
				 }
				 else
				 { $("#ownerError").empty();
				  $("#houseValueError").empty();
				 }
				}
				else
				{
				 $("#ownerError").empty();
				 $("#houseValueError").empty();
				 
				 
				 }
				 if(incomeGroupValue == null || incomeGroupValue == "")
				{
					$("#incomeGroupError").text("Household Income is required");
					result++;
				}
				else if(incomeGroupValue == 0)
				{
					$('#incomeGroupError').text("Household Income should not be zero");
					result++;
				}
				else
				{
					$("#incomeGroupError").empty();
				}
				
				if(zip == null || zip == "")
				{
					$("#zipError").text("Zip is required");
					result++;
				}
				else if(zip.length<4 || zip.length>5)
				{
					
					$("#zipError").empty();
					$("#zipError").text("Zip length should between four to five");
					result++;
				}
				else
				{
					
					$("#zipError").empty();
				}
				if(age == null || age == "")
				{
					$("#ageError").text("Age is required");
					result++;
				}
				else if(age > 120)
				{
					$("#ageError").text("Age limit must be lessthan 120");
					result++;
				}
				else
				{
					$("#ageError").empty();
				}
				
				/* if(ownerrenter == null || ownerrenter == "Choose option")
				{
					$("#ownerError").text("Select Owner/Renter");
					result++;
				}
				
				else
				{
					$("#ownerError").empty();
					
				 }  */
				
				if(gender == null || gender == "Select Gender")
				{
					$("#genderError").text("Select Gender");
					result++;
				}
				else
				{
					$("#genderError").empty();
				}
				 
				if(result == 0)
				{
									$.ajax
									({
										type : 'POST',
										url : baseUrl+'/adURL/saveUrlDetails',
										datatype : 'jsonp',
										jsonp : 'callback',
										data : {userid:userId,title:title,adurl:adurl,houseValue:houseValue,zip:zip,zip4:zip4,age:age,ownerrenter:ownerrenter,gender:gender,maritalstatus:maritalstatus,incomeGroup:incomeGroup,incomeGroupValue:incomeGroupValue,houseValueMoney:houseValueMoney},
										
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
				
						function adminDeleteUrl(deleteUrlId)
						{
								console.log("abcd"+deleteUrlId)
							
							 $('#deleteUrlModal').modal('show');
							$('#deleteUrlId').val(deleteUrlId); 
						
						}						
					
				$(document).ready(function()
					{
						
					 $('#deleteUrl').click(function()
					{
						var urlId=$('#deleteUrlId').val();
								console.log(urlId+"aabbcc");
							$.ajax
									({
									type: 'POST',
									url: baseUrl+'/adURL/deleteUrl',
									datatype:'jsonp',
									jsonp:"callback",
									data: {URLID:urlId},
									
									success: function(response){
									
									location.reload();																																							
									},
									error: function(error){
										console.log(error);
									}
								});
						
					});
					
					});
			
				 //metricUrls onload
				 
				  function metricsUrls()
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
					  
					  var userId=result._id;
					  $('.user').text(user);
						
					 }						
					$.ajax
					  ({
						type: 'post',
						url: baseUrl+'/adURL/getUrls',
						datatype:'jsonp',
						jsonp:"callback",
					   // data:{userId:userId},
						success:function(response)
						{
						
					   var totAdUrls='';
						   /* var incomeGroup='';  */
					   for(var i=0;i<response.length;i++)
						{
						 
						    /* incomeGroup = response[i].incomeGroup;
								 

							incomeGroup = incomeGroup.split(","); */
						
						   var adurl="<tr class='even pointer'>"+
						  "<td>"+response[i].adTitle+"</td>"+
						  "<td>"+response[i].adURL+"</td>"+
						   "<td>"+ response[i].incomeGroup+"</td>"+
						   "<td >"+response[i].zip+"</td>"+
							"<td class='last'><a href='viewMetrics.html?id="+response[i]._id+"'>View Metrics</a></td>"+
						   
						   "</tr>"
						   totAdUrls=totAdUrls+adurl;
						}
						  
						 $('#totalUrls').append(totAdUrls); 
					  },
						error: function(error)
					   {
						 console.log(error);
						}
					  });
				  }
							 			 