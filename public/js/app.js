var data = {
	medications:[
	    {name: "Medicine Name", brandName:"Metchek", times:{w:0,b:1,l:0,d:1,bt:0}},
	    {name: "Medicine Name", brandName:"Metchek", times:{w:0,b:1,l:0,d:1,bt:0}},
	    {name: "Medicine Name", brandName:"Metchek", times:{w:0,b:1,l:0,d:1,bt:0}},
	    {name: "Medicine Name", brandName:"Metchek", times:{w:0,b:1,l:0,d:1,bt:0}},
	    {name: "Medicine Name", brandName:"Metchek", times:{w:0,b:1,l:0,d:1,bt:0}},
	]
}

var config = {
 apiKey: "AIzaSyAkMPKIfxCSg8aaCGz6Mq6AQYvtfAMufxM",
 authDomain: "medipro-d5254.firebaseapp.com",
 databaseURL: "https://medipro-d5254.firebaseio.com",
 storageBucket: "medipro-d5254.appspot.com",
 messagingSenderId: "195395633003"
};

firebase.initializeApp(config);

var dbRef = firebase.database().ref('/');
dbRef.on('value', function(snapshot) {
  console.log(snapshot.val());
});





render();

function render(){
	var source = $('#medicine-template').html();
	var template = Handlebars.compile(source);
	var html = template(data); 
	$('.medication-list').html(html);
}