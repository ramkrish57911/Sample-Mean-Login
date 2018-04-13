/*   var baseUrl = "//localhost:9000"; */
  var baseUrl="http://52.221.231.42:9000";  

var id;
function viewMetrics()
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
					
					$('.user').text(user);
					if(user=="admin")
					{
					var list=
					'<li><a href="./managePublisherNew.html">Dashboard</a>'+
                    '</li>'+
					'<li><a href="./createPublisher.html">Ad Publisher</a>'+
                    '</li>'+
					'<li><a href="./managePublisher.html">Manage Publisher</a>'+
                    '</li>'+
					'<li><a href="./createAdURL.html">Create Ad</a>'+
                    '</li>'+
					'<li><a href="./manageURLS.html">Manage Ad</a>'+
                    '</li>'+
					'<li><a href="./metricsURLS.html">Statistics and Metrics</a>'+
                    '</li>'
					
					
					$("#listItems").append(list);
					}
					else
					{
						var list=
					'<li><a href="./publisherDashboard.html">Dashboard</a>'+
                    '</li>'+
					'<li><a href="./createAdURLPublisher.html">Create Ad</a>'+
                    '</li>'+
					'<li><a href="./manageURLSPublisher.html">Manage Ad</a>'+
                    '</li>'
					$("#listItems").append(list);
					}
				
								
				}
		 
		  		window.onload=getUrls();


							  var query = location.search.substr(1);
       var idresult = {};
        query.split("&").forEach(function(part) {
        var item = part.split("=");
        idresult[item[0]] = decodeURIComponent(item[1]);
		id=idresult[item[0]];
		});
		
	/* 	alert(moment().subtract(0, 'days'))
		alert(moment()) */
		$('.reportrange').daterangepicker(optionSet1, cb);
		/* $(document).ready(function(){
         
            $.ajax({
              type: 'POST',
              url: baseUrl+'/adURL/getURL',
              datatype:'jsonp',
              jsonp:"callback",
              data:{id:id},
              success: function(response){
				      console.log(response);
					$("#title").text("Metrics for Ad: "+response.adTitle);
					
					 
              },
              error: function(err){
                
                  console.log("error msg"+JSON.stringify(err));
              }
            });
			
			
          }); */ 
		
   var cb = function(start, end)
	{
			 
        console.log(start.toISOString(), end.toISOString());
		var from_date=start.toISOString(),to_date=end.toISOString();
		
        $('.reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      	   //alert("Callback has fired: [" + start.format('MMMM D, YYYY') + " to " + end.format('MMMM D, YYYY') + ", label = " + label + "]");
					console.log(from_date,to_date,id);
				/* 	
			jQuery.ajax
			({
				type: 'POST',
				url: baseUrl+'/adInfo/metrics/',
				data:{"fromDate":from_date,"toDate":to_date,"urlsId":id},
				datatype: 'jsonp',
				success: function (a) {
					
					
					console.log(a);
					  if(a[0]!=null){
						  
					  
					 $('#maxviews').text("Max "+a[0].maxviews);
					$('#avgviews').text("Average "+(a[0].avgviews).toFixed(0));
					$('#minviews').text("Min "+a[0]. minviews);
					$('#maxclicks').text("Max "+a[0].maxclicks);
					$('#avgclicks').text("Average "+a[0].avgclicks.toFixed(0));
					$('#minclicks').text("Min "+a[0].minclicks);
					$('#maxtime').text("Max "+a[0].maxtime);
					$('#avgtime').text("Average "+(a[0].avgtime).toFixed(0));
					$('#mintime').text("Min "+a[0].mintime);
					$('#maxclosures').text("Max "+a[0].maxclosures);
					$('#avgclosures').text("Average "+(a[0].avgclosures).toFixed(0));
					$('#minclosures').text("Min "+a[0].minclosures); 
					  }
					  else{
						  console.log("empty values")
						   $('#maxviews').text("Max "+0);
					$('#avgviews').text("Average "+(0).toFixed(0));
					$('#minviews').text("Min "+0);
					$('#maxclicks').text("Max "+0);
					$('#avgclicks').text("Average "+(0).toFixed(0));
					$('#minclicks').text("Min "+0);
					$('#maxtime').text("Max "+0);
					$('#avgtime').text("Average "+(0).toFixed(0));
					$('#mintime').text("Min "+0);
					$('#maxclosures').text("Max "+0);
					$('#avgclosures').text("Average "+(0).toFixed(0));
					$('#minclosures').text("Min "+0); 
					  }
               },
				error: function (err) {
						
						console.log(err);
					},
				
			}); */

		 		
		jQuery.ajax
			({
				type: 'POST',
				url: baseUrl+'/adURL/totalMetrics',
				data:{"fromDate":from_date,"toDate":to_date,"urlsId":id},
				datatype: 'jsonp',
				success: function (response) {
					
					
					console.log(response);
					//console.log(response[0].sumviews);
					 if(response[0]!=null){
					$('#totalViews').text(response[0].sumviews);
					$('#totalClicks').text(response[0].sumclicks);
					$('#totalTime').text(response[0].sumtime);
					 }else{
						$('#totalViews').text(0);
					$('#totalClicks').text(0);
					$('#totalTime').text(0);
					 
					 }

               },
				error: function (err) {
						
						console.log(err);
					},
				
			});
 




			
	  }
	  
	  
	  
	  
	  
	   var cb1 = function(start, end)
	{
			 
        console.log(start.toISOString(), end.toISOString());
		var from_date=start.toISOString(),to_date=end.toISOString();
		
        $('.reportrange1 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      	   //alert("Callback has fired: [" + start.format('MMMM D, YYYY') + " to " + end.format('MMMM D, YYYY') + ", label = " + label + "]");
					console.log(from_date,to_date,id);
					
			jQuery.ajax
			({
				type: 'POST',
				url: baseUrl+'/adInfo/metrics/',
				data:{"fromDate":from_date,"toDate":to_date,"urlsId":id},
				datatype: 'jsonp',
				success: function (a) {
					
					
					console.log(a);
					  if(a[0]!=null){
						  
					  
					 $('#maxviews').text("Max "+a[0].maxviews);
					$('#avgviews').text("Average "+(a[0].avgviews).toFixed(0));
					$('#minviews').text("Min "+a[0]. minviews);
					$('#maxclicks').text("Max "+a[0].maxclicks);
					$('#avgclicks').text("Average "+a[0].avgclicks.toFixed(0));
					$('#minclicks').text("Min "+a[0].minclicks);
					$('#maxtime').text("Max "+a[0].maxtime);
					$('#avgtime').text("Average "+(a[0].avgtime).toFixed(0));
					$('#mintime').text("Min "+a[0].mintime);
					$('#maxclosures').text("Max "+a[0].maxclosures);
					$('#avgclosures').text("Average "+(a[0].avgclosures).toFixed(0));
					$('#minclosures').text("Min "+a[0].minclosures); 
					  }
					  else{
						  console.log("empty values")
						   $('#maxviews').text("Max "+0);
					$('#avgviews').text("Average "+(0).toFixed(0));
					$('#minviews').text("Min "+0);
					$('#maxclicks').text("Max "+0);
					$('#avgclicks').text("Average "+(0).toFixed(0));
					$('#minclicks').text("Min "+0);
					$('#maxtime').text("Max "+0);
					$('#avgtime').text("Average "+(0).toFixed(0));
					$('#mintime').text("Min "+0);
					$('#maxclosures').text("Max "+0);
					$('#avgclosures').text("Average "+(0).toFixed(0));
					$('#minclosures').text("Min "+0); 
					  }
               },
				error: function (err) {
						
						console.log(err);
					},
				
			});

/* 		 		
		jQuery.ajax
			({
				type: 'POST',
				url: baseUrl+'/adURL/totalMetrics',
				data:{"fromDate":from_date,"toDate":to_date,"urlsId":id},
				datatype: 'jsonp',
				success: function (response) {
					
					
					console.log(response);
					//console.log(response[0].sumviews);
					 if(response[0]!=null){
					$('#totalViews').text(response[0].sumviews);
					$('#totalClicks').text(response[0].sumclicks);
					$('#totalTime').text(response[0].sumtime);
					 }else{
						$('#totalViews').text(0);
					$('#totalClicks').text(0);
					$('#totalTime').text(0);
					 
					 }

               },
				error: function (err) {
						
						console.log(err);
					},
				
			});
  */




			
	  }


      var optionSet1 = {
        startDate: moment().subtract(1, 'days'),
        endDate: moment(),
        minDate: '01/01/2000',
        maxDate: '12/31/2020',
        dateLimit: {
          days: 60
        },
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: true,
        opens: 'left',
        buttonClasses: ['btn btn-default'],
        applyClass: 'btn-small btn-primary',
        cancelClass: 'btn-small',
        format: 'MM/DD/YYYY',
        separator: ' to ',
        locale: {
          applyLabel: 'Submit',
          cancelLabel: 'Clear',
          fromLabel: 'From',
          toLabel: 'To',
          customRangeLabel: 'Custom',
          daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          firstDay: 1
        }
      };
   
   $('.reportrange1 span').html("Select Span");
   
   $('.reportrange1').daterangepicker(optionSet1, cb1)
   
   {
	    cb1(optionSet1.startDate, optionSet1.endDate)
   };
   
   
   
      $('#destroy').click(function() {
        $('.reportrange1').data('daterangepicker').remove();
      });
   
	
	
	
	
	 var optionSet = {
        startDate: moment().subtract(1, 'days'),
        endDate: moment(),
        minDate: '01/01/2000',
        maxDate: '12/31/2020',
        dateLimit: {
          days: 60
        },
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: true,
        opens: 'left',
        buttonClasses: ['btn btn-default'],
        applyClass: 'btn-small btn-primary',
        cancelClass: 'btn-small',
        format: 'MM/DD/YYYY',
        separator: ' to ',
        locale: {
          applyLabel: 'Submit',
          cancelLabel: 'Clear',
          fromLabel: 'From',
          toLabel: 'To',
          customRangeLabel: 'Custom',
          daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          firstDay: 1
        }
      };
   
   $('.reportrange span').html("Select Span");
   
   $('.reportrange').daterangepicker(optionSet, cb)
   
   {
	    cb(optionSet.startDate, optionSet.endDate)
   };
   
   
   
      $('#destroy').click(function() {
        $('.reportrange').data('daterangepicker').remove();
      });
   

	
	
}

		
	 

	 
	 function getUrls()
			   {
				   var params = document.URL;
					 var msg = params.split("?");
									 
					 var val = msg[1].split("=");
					 console.log(val[1]);
				$.ajax
				({
					type: 'post',
					url: baseUrl+'/adInfo/getTitle',
					datatype:'jsonp',
					data :{userId:val[1]},
					jsonp:"callback",
					
					success:function(response)
					{
						
						$(".title").append(response[0].adTitle);
				
				/*    var option,totalURLS="<option value=''>Select URL</option>"; 
					var totAdUrls='';
					for(var i=0;i<response.length;i++)
						{
				  
						console.log(response[i].adURL);
						var option="<option value='"+response[i]._id+"'  id='"+response[i]._id+"'>"+response[i].adURL+"</option>";
						totalURLS+=option; 
						var adurl="<tr class='even pointer'>"+
							 "<td>"+response[i].adTitle+"</td>"+
							 "<td>"+response[i].adURL+"</td>"+
							  "<td>"+response[i].incomeGroup+"</td>"+
							  "<td >"+response[i].zip+"</td>"+
							  "<td class='last'><a href='viewMetrics.html?id="+response[i]._id+"'>View Metrics</a></td>"+
							  "</tr>"
						totAdUrls=totAdUrls+adurl;
						}
						console.log("asgdsagdg"+totAdUrls)
						$('#totalUrls').append(totAdUrls);*/
					
					},
					error: function(error)
					{
						console.log(error);
					}
				});
    
	}
	

	 
	 