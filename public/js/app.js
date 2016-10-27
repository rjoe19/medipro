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

function bootstrapData(){
	firebase.database().ref('/').set({
		name: 'Ngaio Smith',
		medications:[
		    {dosage: 1,
		    name: "Aspirin 100mg Tablet", 
		    brandName:"Ethics Enteric Coated Aspirin",
		    genericName: "Aspirin 100mg Enteric coated Tablets", 
		    isTaken: false, 
		    times:{w:0,b:1,l:0,d:0,bt:0},
		    whatsItsFor: "Helps prevent stoke and heart attack",
		    extraInfo: 'Swallow whole, take with food'},

		    {dosage: 1,
		    name: "Metformin 500mg Tablet", 
		    brandName:"Metcheck",
		    genericName: "Metformin hydrochloride 500mg Tablets", 
		    isTaken: false, 
		    times:{w:0,b:1,l:0,d:1,bt:0},
		    whatsItsFor: "Diabetes",
		    extraInfo: 'Take after food'},

		    {dosage: 1,
		    name: "Amlodipine 2.5mg Tablet", 
		    brandName:"Apo-Amlodipine",
		    genericName: "Amlodipine 2.5mg Tablets", 
		    isTaken: false, 
		    times:{w:0,b:1,l:0,d:0,bt:0},
		    whatsItsFor: "For angina or blood pressure",
		    extraInfo: ''},

		    {dosage: 1,
		    name: "Losartan 25mg Tablet", 
		    brandName:"Cozaar",
		    genericName: "Losartan potassium 25mg Tablets", 
		    isTaken: false, 
		    times:{w:0,b:1,l:0,d:0,bt:0},
		    whatsItsFor: "For blood pressure and to help improve heart function",
		    extraInfo: ''},
		    
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
	$('#infoRender').removeClass('active');
	$('#summaryRender').removeClass('active');
});

$('#adherence').click(function(){
	$('#adherence-render').addClass('active');
	$('#infoRender').removeClass('active');
	$('#summaryRender').removeClass('active');
});

$('#info').click(function(){
	$('#infoRender').addClass('active');
	$('#adherence-render').removeClass('active');
	$('#summaryRender').removeClass('active');
})

$('#summary').click(function(){
	$('#summaryRender').addClass('active');
	$('#infoRender').removeClass('active');
	$('#adherence-render').removeClass('active');
})

function expand(el){
	var element = $(el);
	var elementArrays  = element.parent().siblings($('.dropdown'));
	var dropdown = elementArrays[2];
	$(dropdown).toggleClass('active');
}


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

	var source = $('#summary-template').html();
	var template = Handlebars.compile(source);
	var html = template(data); 
	$('#summaryYield').html(html);
}