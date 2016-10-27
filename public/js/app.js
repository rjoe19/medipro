//Configuring firebase database connection
var config = {
 apiKey: "AIzaSyAkMPKIfxCSg8aaCGz6Mq6AQYvtfAMufxM",
 authDomain: "medipro-d5254.firebaseapp.com",
 databaseURL: "https://medipro-d5254.firebaseio.com",
 storageBucket: "medipro-d5254.appspot.com",
 messagingSenderId: "195395633003"
};

firebase.initializeApp(config);

// Render app on every change
var dbRef = firebase.database().ref('/');
dbRef.on('value', function(snapshot) {
  render(snapshot.val());
});
render();

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
	});
}

function handleTaken(el){
	var element = $(el);
	var value = element.is(':checked');
	var index = element.attr('id')

	// Save to database

	firebase.database().ref('/medications').set({
		name: 'Ngaio Smith',

		medications:[
		    {name: "Medicine Name", brandName:"Metchek", isTaken: false, times:{w:0,b:1,l:0,d:1,bt:0}},
		    {name: "Medicine Name", brandName:"Metchek", isTaken: true, times:{w:0,b:1,l:0,d:1,bt:0}},
		    {name: "Medicine Name", brandName:"Metchek", isTaken: false, times:{w:0,b:1,l:0,d:1,bt:0}},
		    {name: "Medicine Name", brandName:"Metchek", isTaken: false, times:{w:0,b:1,l:0,d:1,bt:0}},
		    {name: "Medicine Name", brandName:"Metchek", isTaken: false, times:{w:0,b:1,l:0,d:1,bt:0}},
		],
	});
}


function render(snapData){
	var source = $('#medicine-template').html();
	var template = Handlebars.compile(source);
	var html = template(snapData); 
	$('.medication-list').html(html);
}