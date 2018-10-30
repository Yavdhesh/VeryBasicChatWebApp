var express = require("express");
var http= require("http");

var app= express();
var server = http.Server(app);

var io=require('socket.io')(server);

var users=[];
server.listen(8080, function(){
	
	console.log("Yavdhesh ri chaat application saale hai");
});


app.get('/', function(req, res){
	console.log("vei giyo");
	//res.send("Namastey")
	res.sendFile(__dirname+"/index.html");
	console.log(__dirname+"/index.html");
	
})

app.get('/test', function(req, res){
	console.log("vei giyo /test maayne");
	res.send("Namastey")
	
});

app.get("/styla/index.css",function(req,res){
	res.sendFile(__dirname+"/Styla/index.css");
	
	
});

var json =   {"quiz_questions":[{"id":"1","question":"Sparing in words, using very few words","possible_answers":"Loquacious,Laconic,Integral,Judicious","correct_answer":"2"}, {"id":"2","question":"Freedom from punishment","possible_answers":"Impunity,Indolent,Jaded,Hedonist","correct_answer":"1"}, {"id":"3","question":"An instrument for measuring","possible_answers":"Gallant ,Gauge ,Gamester ,Gastric ","correct_answer":"2"}, {"id":"4","question":"Inflammation of the stomach  ","possible_answers":"Insurgent ,Impudence ,Garrulous ,Gastritis ","correct_answer":"4"}, {"id”:”5”,”question":"unoriginal","possible_answers":"Imperious ,Impudence ,Hackneyed ,Inane ","correct_answer":"3"}, {"id”:”6”,”question":"To draw principle inferences","possible_answers":"Gaseous ,Generalize ,Garrote ,Garrison ","correct_answer":"2"}, {"id”:”7”,”question":"To imbue with life or animation ","possible_answers":"Galvanize ,Garnish ,Garrulous ,Gaseous ","correct_answer":"1"}, {"id”:”8”,”question":"Decorate or embellish ","possible_answers":"Gamut ,Genealogist ,Gambol ,Garnish ","correct_answer":"4"}, {"id”:”9”,”question":"Given to constant trivial talking","possible_answers":"Gaseous ,Gendarme ,Garrulous ,Genitive ","correct_answer":"3"}, {"id”:”10”,”question":"To risk money or other possession on an event","possible_answers":"Gallant ,Gaily ,Gamble ,Gastronomy ","correct_answer":"3"}, {"id”:”11”,”question":"A tracer of pedigrees","possible_answers":"Genealogist ,Genealogy ,Generic ,Gentile ","correct_answer":"1"}, {"id":"12","question":"Loud and flashy","possible_answers":"Garish ,Indolent,Jaded,Hedonist","correct_answer":"1"}, {"id":"13","question":"anything that foreshadows the future event","possible_answers":"Hedonist ,Harbinger ,Implicit ,Inane ","correct_answer":"2"}, {"id":"14","question":"a person’s manner of walking","possible_answers":"Gaily ,Gait ,Gauge ,Galvanize ","correct_answer":"2"}, {"id”:”15”,”question":"A whole range or sequence","possible_answers":"Garrulous ,Indolent,Gambol ,Gamut ","correct_answer":"4"}, {"id”:”16”,”question":"To produce or cause to be","possible_answers":"Generate ,Generosity ,Harbinger, Gendarme","correct_answer":"1"}, {"id":"17","question":"Easily persuaded to believe something ","possible_answers":"Glutton , Jaded,Gregarious ,Gullible ","correct_answer":"4"}, {"id":"18","question":"The quality of being kind and generous","possible_answers":"Genesis , Generosity, Gallant, Garrote","correct_answer":"2"}, {"id":"19","question":"Festivity, the state of being lighthearted or cheerful","possible_answers":"Gait ,Gaiety ,Gallant ,Gamester ","correct_answer":"2"}, {"id":"20","question":"Abundant","possible_answers":"Galore ,Garrison ,Gamble ,Gendarme ","correct_answer":"1"}, {"id":"21","question":"Light and unsubstantial","possible_answers":"Gastritis ,Garrison ,Gaseous ,Genealogy ","correct_answer":"3"}, {"id":"22","question":"refined or respectable","possible_answers":"Impunity,Genitive ,Genteel ,Garish ","correct_answer":"3"}, {"id":"23","question":"habitual overeater","possible_answers":"Gregarious ,Glutton ,Grandiose ,Gullible ","correct_answer":"2"}, {"id":"24","question":"A person who pursue pleasure, often to excess","possible_answers":"Impunity,Indolent,Jaded,Hedonist","correct_answer":"4"}, {"id":"25","question":"Exaggeration","possible_answers":"Hyperbole ,Indolent,Impudence ,Impeccable ","correct_answer":"1"}, {"id":"26","question":"Arrogant","possible_answers":"Loquacious,Laconic,Imperious ,Implicit ","correct_answer":"3"}, {"id":"27","question":"Stupid, pointless, absurd","possible_answers":"Inane ,Indolent,Jaded,Hedonist","correct_answer":"1"}, {"id":"28","question":"Poor, needy","possible_answers":"Gallant ,Indigent  ,Insipid  ,Indolent  ","correct_answer":"2"}, {"id":"29","question":"notorious","possible_answers":"Insurgent ,Impudence ,Garrulous ,Infamous  ","correct_answer":"4"}, {"id":"30","question":"Dull, boring, lifeless","possible_answers":"Imperious ,Impudence ,Insipid  ,Inane ","correct_answer":"3"}, {"id":"31","question":"Rebellious","possible_answers":"Gaseous ,Insurgent  ,Garrote ,Integral  ","correct_answer":"2"}, {"id”:”32”,”question":"Looking inward ","possible_answers":"Introspective  , Indigent , Imperious , Laconic ","correct_answer":"1"}, {"id":"33","question":"Faultless, perfect ","possible_answers":"Gamut , Indolent ,Imperious  ,Impeccable  ","correct_answer":"4"}, {"id":"34","question":"Essential, necessary","possible_answers":"Laconic  ,Jaded  ,Integral  ,Genitive ","correct_answer":"3"}, {"id":"35","question":"Talkative","possible_answers":"Gallant , Laconic ,Loquacious  ,Listless  ","correct_answer":"3"}, {"id”:”36”,”question":"wise, marked by good judgment","possible_answers":"Judicious   , Insurgent , Indigent ,Gentile ","correct_answer":"1"}, {"id”:”37”,”question":"Good natured, merry, given to joking, cheerful and friendly","possible_answers":"Jovial  ,Indolent,Kinetic ,Laud ","correct_answer":"1"}, {"id":"38","question":"Impressive or magnificent in appearance or style, excessively grand or ambitious","possible_answers":"Hedonist ,Grandiose  ,Implicit ,Inane ","correct_answer":"2"}, {"id":"39","question":"of pertaining to, or near the stomach","possible_answers":"Gaily ,Gastric  ,Gauge ,Gait ","correct_answer":"2"}, {"id":"40","question":" A list, in the order of succession, of ancestors and their descendants","possible_answers":"Garrulous ,Generality ,Gambol ,Genealogy  ","correct_answer":"4"}, {"id”:”41”,”question":"In a cheerful or lighthearted way, without thinking of consequences, Merrily","possible_answers":"Gaily  ,Generosity ,Harbinger, Gullible","correct_answer":"1"}, {"id":"42","question":"To execute by strangling","possible_answers":"Glutton , Jaded,Gregarious ,Garrote  ","correct_answer":"4"}, {"id":"43","question":"habitual overeater","possible_answers":"Genesis , Glutton , Gallant, Garrote","correct_answer":"2"}, {"id":"44","question":"Stupid, pointless, absurd","possible_answers":"Gait ,Inane  , Insipid , Indolent ","correct_answer":"2"}, {"id":"45","question":"Pertaining to motion","possible_answers":"Galore ,Kinetic  , Garrulous ,Gendarme ","correct_answer":"2"}, {"id":"46","question":"Lazy","possible_answers":"Innate  ,Infamous  ,Indolent  ,Indigent  ","correct_answer":"3"}, {"id":"47","question":"Sparing in words, using very few words","possible_answers":"Impunity,Genitive ,Laconic  ,Garish ","correct_answer":"3"}, {"id":"48","question":"habitual overeater","possible_answers":"Gregarious ,Glutton ,Grandiose ,Gullible ","correct_answer":"2"}, {"id":"49","question":"Tired, bored, or lacking enthusiasm, typically after having too much of something","possible_answers":"Impunity,Indolent, Grandiose, Jaded","correct_answer":"4"}, {"id”:”50”,”question":"Talkative","possible_answers":"Loquacious  ,Laconic ,Impudence ,Jaded  ","correct_answer":"1"}
]} ; 

//yavdhesh 
var nonrepeatingList =[];
function randomIdGenerator(){
//***************************
var arr = [];
var jsonToBe = {"quiz_questions":[]};
while(arr.length < 5){
    var randomnumber = Math.floor(Math.random()*50);
    if(arr.indexOf(randomnumber) > -1 || nonrepeatingList.indexOf(randomnumber) > -1) 
		continue;
	arr[arr.length] = randomnumber;
	nonrepeatingList.push(randomnumber);
		 
	}
	console.log("non repeating ki lambai = "+nonrepeatingList.length);
	if(json.quiz_questions.length == nonrepeatingList.length){
	nonrepeatingList=[];	
	}
	for(var i=0;i<arr.length;i++){
 	jsonToBe.quiz_questions.push(json.quiz_questions[arr[i]]);
 }
 return jsonToBe;
}

 

 
 app.get('/initialQuizData', function(req, res){
	console.log("vei giyo");
		var jsonObj=randomIdGenerator();
	res.send(jsonObj)
	//res.sendFile(__dirname+"/index.html");
	console.log(__dirname+"/index.html tejash quiz App wali service");

});

app.get('/emptyList', function(req, res){
	var size=nonrepeatingList.length;
	nonrepeatingList=[];	
	res.send("safaltapurvak nasht kiya gaya jiski lambai hai = "+size);
	//res.sendFile(__dirname+"/index.html");
	console.log(__dirname+"/index.html tejash quiz App wali service");

});



io.on("connection",function(socket){
	var name='';
	console.log("A user has connected");
	socket.on("disconnect", function(){
		users.splice(users.indexOf(name),1);
		console.log("User has disconnected");
	
		socket.emit('has disconnected',{username:name,usersList:users});
	})
	
	socket.on("has connected", function(username){
	
		users.push(username);
		console.log(username);
		io.emit('has connected',{username:username,usersList:users});
		
	})
	
	socket.on("nayo message", function(data){
	console.log("message aayo"+data.message);
	console.log("message aayo"+data.username);
		io.emit('nayo message',data);
		
	})
	
});