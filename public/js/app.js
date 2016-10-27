//Configuring firebase database connection
var config = {
apiKey: "AIzaSyCx91jPeudnRbstZizPed0KH0qIjBIbnY0",
authDomain: "medipro-ed4ec.firebaseapp.com",
databaseURL: "https://medipro-ed4ec.firebaseio.com",
storageBucket: "medipro-ed4ec.appspot.com",
messagingSenderId: "1036653595445"
};
firebase.initializeApp(config);

var data; // the global data object which is the truth for all time

// Render app on every change
var dbRef = firebase.database().ref('/');
dbRef.on('value', function(snapshot) {
  data = snapshot.val();
  render();
});

var selectedTab = 'index';

function bootstrapData(){
	firebase.database().ref('/').set({
		name: 'Ngaio Smith',
		medications:[
		    {name: "Medicine Name", brandName:"Metchek", isTaken: false, times:{w:0,b:1,l:0,d:1,bt:0}},
		    {name: "Medicine Name", brandName:"Metchek", isTaken: true, times:{w:0,b:1,l:0,d:1,bt:0}},
		    {name: "Medicine Name", brandName:"Metchek", isTaken: false, times:{w:0,b:1,l:0,d:1,bt:0}},
		    {name: "Medicine Name", brandName:"Metchek", isTaken: false, times:{w:0,b:1,l:0,d:1,bt:0}},
		    {name: "Medicine Name", brandName:"Metchek", isTaken: false, times:{w:0,b:1,l:0,d:1,bt:0}},
		],

		adherence:[100,100,80,50,100,100,100],
	});
}

function handleTaken(el){
	var element = $(el);
	var value = element.is(':checked');
	var index = element.attr('id')

	// Save to database
	firebase.database().ref('/medications/' + index).update({
		isTaken: value,
	});
}

$('#list').click(function(){
	$('#adherence-render').removeClass('active');
});

$('#adherence').click(function(){
	$('#adherence-render').addClass('active');
});


function render(){
	var source = $('#medicine-template').html();
	var template = Handlebars.compile(source);
	var html = template(data); 
	$('.medication-list').html(html);


	var ctx = $("#adherence-chart");
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
	        datasets: [{
	            data: data.adherence,
	            borderWidth: 0,
	            borderColor: 'rgba(0,0,0,0.0)',
	            backgroundColor: 'rgba(0,0,0,0.8)',
	        }]
	    },
	    options: {
	        responsive: true,
	        legend:{
	        	display: false
	        },
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                },
	                display: false,
	               	gridlines: {
	               		display: false,
	               	}
	            }]
	        }
	    }
	});
}