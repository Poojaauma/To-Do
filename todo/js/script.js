var noti=new Array();
if(window.Notification)
{
	Notification.permission="granted";
	/*Notification.requestPermission(function(status) {
  					console.log('Status: ', status); // show notification permission if permission granted then show otherwise message will not show
	});*/
}
else {
  				alert('Your browser doesn\'t support notifications.');
  			}
$(document).one('pageinit', function(){
	showRuns();
	$('#submitAdd').on('tap', addRun);
	$('#submitEdit').on('tap', editRun);
	$('#stats').on('tap','#deleteLink', deleteRun);
	$('#stats').on('tap','#editLink', setCurrent);
	$('#clearRuns').on('tap', clearRuns);
	
	 function showRuns(){

		var runs = getRunsObject();
	
		if(runs != '' && runs != null){
			for(var i = 0;i < runs.length;i++){
				$('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong><span  style="color: teal">'+runs[i]["date"]+
				'</span> <br><strong>TO-DO: </strong><strong><span  style="color: teal">'+runs[i]["miles"]+'</span></strong><div class="controls">' +
				'<a href="#edit" id="editLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'">Edit</a> | <a href="#" id="deleteLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'"">Delete</a></li>');
			}
			$('#home').bind('pageinit', function(){
				$('#stats').listview('refresh');
			});
		} else {
			$('#stats').html('<p>You have no upcoming events ahead</p>');
		}
		setDate();
	 }
	
	 function addRun(){
		// Get form values
		var miles = $('#addMiles').val();
		var date = $('#addDate').val();
		var run = {
			date: date,
			miles:miles
		};
		
		var runs = getRunsObject();
		runs.push(run);
		localStorage.setItem('runs', JSON.stringify(runs));
		window.location.href="index.html";
		
		return false;
	 }
	 
	 function editRun(){
		currentMiles = localStorage.getItem('currentMiles');
		currentDate = localStorage.getItem('currentDate');
		
		var runs = getRunsObject();
		for(var i = 0;i < runs.length;i++){
			if(runs[i].miles == currentMiles && runs[i].date == currentDate){
				runs.splice(i,1);
			}
			localStorage.setItem('runs',JSON.stringify(runs));
		}
		
		var miles = $('#editMiles').val();
		var date = $('#editDate').val();
		
		var update_run = {
			date: date,
			miles: miles
		};
		
		runs.push(update_run);
		
		localStorage.setItem('runs', JSON.stringify(runs));
		
		window.location.href="index.html";
		
		return false;
	 }
	 
	 function clearRuns(){
		if(confirm("Are you Sure")==true)
		{
			localStorage.removeItem('runs');
			$('#stats').html('<p>You have no upcoming events ahead</p>');
		}
	 }
	 function deleteRun(){
		
		if(confirm("Are you sure?")==true)
		{
		localStorage.setItem('currentMiles', $(this).data('miles'));
		localStorage.setItem('currentDate', $(this).data('date'));
		currentMiles = localStorage.getItem('currentMiles');
		currentDate = localStorage.getItem('currentDate');
		
		var runs = getRunsObject();
		for(var i = 0;i < runs.length;i++){
			if(runs[i].miles == currentMiles && runs[i].date == currentDate){
				runs.splice(i,1);
			}
			localStorage.setItem('runs',JSON.stringify(runs));
		}
		
		window.location.href="index.html";
		
		return false;
	 }
	 }
	 
	 function getRunsObject(){
		var runs = new Array();
		
		var currentRuns = localStorage.getItem('runs');
		
		if(currentRuns != null){
			
			var runs = JSON.parse(currentRuns);
		}
		return runs.sort(function(a, b){return new Date(a.date) - new Date(b.date)});
	 }
	
	 function setCurrent(){
		
		localStorage.setItem('currentMiles', $(this).data('miles'));
		localStorage.setItem('currentDate', $(this).data('date'));
		
		$('#editMiles').val(localStorage.getItem('currentMiles'));
		$('#editDate').val(localStorage.getItem('currentDate'));
	 }
	 function setDate(){
		
		 const newDate=new Date();
		 var runs=getRunsObject();
		 var v='';
		 var v1='';
		 if(newDate.getMonth()+1<=9)
		 {
			 v='0';
		 }
		 if(newDate.getDate()<=9)
		 {
			 v1='0';
		 }
		 var s=(v+(newDate.getMonth()+1))+'/'+(v1+newDate.getDate())+'/'+newDate.getFullYear();
		 var count=0;
		 for(var i=0;i<runs.length;i++)
		 {
			 if(runs[i].date==s)
			 count++;
		 }
		 console.log(count);
		 if(count!=0)
		 {
			 showNotification(count);
		 }
		
 
		
		 
	 }
	 
	function showNotification(count) {
		console.log('Displaying');
  			if(window.Notification) {
              var options = {
                  body: 'No.of Tasks TODAY: '+count, // body part of the notification
				  dir: 'ltr', // use for direction of message
                  }
				  var n = new Notification('Todo List', options);
				n.onclick = (e) => {window.location.href = "http://127.0.0.1:5500/index.html";};
  			}
		  }
});