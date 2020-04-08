var express = require("express");
var http= require("http");
var Excel = require('exceljs');
var fs = require('fs');
var bodyParser     =        require("body-parser");
//var workbook = new Excel.Workbook();

var app= express();
var server = http.Server(app);

var io=require('socket.io')(server);

var users=[];
server.listen(8080, function(){
	
	console.log("Yavdhesh ri chaat application saale hai");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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

// random question json from excel

function randomQuestionJson(rowCount){
	
	return Math.floor((Math.random() * rowCount) + 1);
}

//questionJson
async function questionJson(){

let questionJso=null;

let workbook = new Excel.Workbook();
workbook = await workbook.xlsx.readFile(__dirname+"/Question-file.xlsx");
		var worksheet = workbook.getWorksheet(1);
		var index =2;
		index=  randomQuestionJson(worksheet.rowCount);
		while(index<2){
			index=  randomQuestionJson(worksheet.rowCount);
		}
		
		//var worksheet = workbook.getWorksheet(1);
        var row = worksheet.getRow(index);
		//console.log(worksheet.rowCount);
        //console.log(row.getCell(1).value);
        //console.log(row.getCell(2).value);
		
		questionJso=row.getCell(2).value;
	
	return  questionJso;
	
}

// 7-04-2020 testing ke liye niche waalaa method hai, yavdhesh ne banaayaa

function faaltu(){
workbook.xlsx.readFile(__dirname+"/Question-file.xlsx")
    .then(function() {
		
		var worksheet = workbook.getWorksheet(1);
        var row = worksheet.getRow(2);
		console.log(worksheet.rowCount);
        console.log(row.getCell(1).value)
        console.log(row.getCell(2).value);
		
		var row2=worksheet.getRow(3);
		row2.getCell(1).value=2;
		row2.getCell(2).value='sasasas';
		row2.commit();
		
		console.log(worksheet.rowCount);
        console.log(row2.getCell(1).value)
        console.log(row2.getCell(2).value);
		workbook.xlsx.writeFile(__dirname+"/new.xlsx");
		
	/*	var sh = wb.getWorksheet("Sheet1");

    sh.getRow(1).getCell(2).value = 32;
    wb.xlsx.writeFile("sample2.xlsx");
    console.log("Row-3 | Cell-2 - "+sh.getRow(3).getCell(2).value);

    console.log(sh.rowCount);
    //Get all the rows data [1st and 2nd column]
    for (i = 2; i <= sh.rowCount; i++) {
        console.log(sh.getRow(i).getCell(1).value);
        console.log(sh.getRow(i).getCell(2).value);
    }*/
		
        
		// A5's value set to 5
        //row.commit();
        //return workbook.xlsx.writeFile('new.xlsx');
    }).then(()=>{
	var filePath = __dirname+"/Question-file.xlsx"; 
	fs.unlinkSync(filePath);
	fs.rename(__dirname+"/new.xlsx", filePath, function(err) {
    if ( err ) console.log('ERROR: ' + err);
     });	
		
	});
	
	
    
   // fs.unlinkSync(filePath);
	
	/*fs.rename(__dirname+"/new.xlsx", "Question-file.xlsx", function(err) {
    if ( err ) console.log('ERROR: ' + err);
});*/
	
}	



// modifyjsonExcel
async function modifyJsonExcel(json){
	let workbook = new Excel.Workbook();
	workbook = await workbook.xlsx.readFile(__dirname+"/Question-file.xlsx");
    var worksheet = workbook.getWorksheet(1);
        
		var rowToBeUpdatedCount=worksheet.rowCount+1;
		//console.log(worksheet.rowCount);
		var row = worksheet.getRow(rowToBeUpdatedCount);
		
		//yahaa par kram samkhyaa hi daalni padegi
		row.getCell(1).value=worksheet.rowCount-1;
		
		//yahaa par json daalte hai
		row.getCell(2).value=json;
        console.log(row.getCell(1).value)
        console.log(row.getCell(2).value);
		
		row.commit();
		//var workbook1=null;
		let workbook1=await workbook.xlsx.writeFile(__dirname+"/Question-file.xlsx");   
		
		return "done";
	
}

var jtemp =   {"quiz_questions":[{"id":"1","question":"Sparing in words, using very few words","possible_answers":"Loquacious,Laconic,Integral,Judicious","correct_answer":"2"}, {"id":"2","question":"Freedom from punishment","possible_answers":"Impunity,Indolent,Jaded,Hedonist","correct_answer":"1"}, {"id":"3","question":"An instrument for measuring","possible_answers":"Gallant ,Gauge ,Gamester ,Gastric ","correct_answer":"2"}, {"id":"4","question":"Inflammation of the stomach  ","possible_answers":"Insurgent ,Impudence ,Garrulous ,Gastritis ","correct_answer":"4"}, {"id”:”5”,”question":"unoriginal","possible_answers":"Imperious ,Impudence ,Hackneyed ,Inane ","correct_answer":"3"}, {"id”:”6”,”question":"To draw principle inferences","possible_answers":"Gaseous ,Generalize ,Garrote ,Garrison ","correct_answer":"2"}, {"id”:”7”,”question":"To imbue with life or animation ","possible_answers":"Galvanize ,Garnish ,Garrulous ,Gaseous ","correct_answer":"1"}, {"id”:”8”,”question":"Decorate or embellish ","possible_answers":"Gamut ,Genealogist ,Gambol ,Garnish ","correct_answer":"4"}, {"id”:”9”,”question":"Given to constant trivial talking","possible_answers":"Gaseous ,Gendarme ,Garrulous ,Genitive ","correct_answer":"3"}, {"id”:”10”,”question":"To risk money or other possession on an event","possible_answers":"Gallant ,Gaily ,Gamble ,Gastronomy ","correct_answer":"3"}, {"id”:”11”,”question":"A tracer of pedigrees","possible_answers":"Genealogist ,Genealogy ,Generic ,Gentile ","correct_answer":"1"}, {"id":"12","question":"Loud and flashy","possible_answers":"Garish ,Indolent,Jaded,Hedonist","correct_answer":"1"}, {"id":"13","question":"anything that foreshadows the future event","possible_answers":"Hedonist ,Harbinger ,Implicit ,Inane ","correct_answer":"2"}, {"id":"14","question":"a person’s manner of walking","possible_answers":"Gaily ,Gait ,Gauge ,Galvanize ","correct_answer":"2"}, {"id”:”15”,”question":"A whole range or sequence","possible_answers":"Garrulous ,Indolent,Gambol ,Gamut ","correct_answer":"4"}, {"id”:”16”,”question":"To produce or cause to be","possible_answers":"Generate ,Generosity ,Harbinger, Gendarme","correct_answer":"1"}, {"id":"17","question":"Easily persuaded to believe something ","possible_answers":"Glutton , Jaded,Gregarious ,Gullible ","correct_answer":"4"}, {"id":"18","question":"The quality of being kind and generous","possible_answers":"Genesis , Generosity, Gallant, Garrote","correct_answer":"2"}, {"id":"19","question":"Festivity, the state of being lighthearted or cheerful","possible_answers":"Gait ,Gaiety ,Gallant ,Gamester ","correct_answer":"2"}, {"id":"20","question":"Abundant","possible_answers":"Galore ,Garrison ,Gamble ,Gendarme ","correct_answer":"1"}, {"id":"21","question":"Light and unsubstantial","possible_answers":"Gastritis ,Garrison ,Gaseous ,Genealogy ","correct_answer":"3"}, {"id":"22","question":"refined or respectable","possible_answers":"Impunity,Genitive ,Genteel ,Garish ","correct_answer":"3"}, {"id":"23","question":"habitual overeater","possible_answers":"Gregarious ,Glutton ,Grandiose ,Gullible ","correct_answer":"2"}, {"id":"24","question":"A person who pursue pleasure, often to excess","possible_answers":"Impunity,Indolent,Jaded,Hedonist","correct_answer":"4"}, {"id":"25","question":"Exaggeration","possible_answers":"Hyperbole ,Indolent,Impudence ,Impeccable ","correct_answer":"1"}, {"id":"26","question":"Arrogant","possible_answers":"Loquacious,Laconic,Imperious ,Implicit ","correct_answer":"3"}, {"id":"27","question":"Stupid, pointless, absurd","possible_answers":"Inane ,Indolent,Jaded,Hedonist","correct_answer":"1"}, {"id":"28","question":"Poor, needy","possible_answers":"Gallant ,Indigent  ,Insipid  ,Indolent  ","correct_answer":"2"}, {"id":"29","question":"notorious","possible_answers":"Insurgent ,Impudence ,Garrulous ,Infamous  ","correct_answer":"4"}, {"id":"30","question":"Dull, boring, lifeless","possible_answers":"Imperious ,Impudence ,Insipid  ,Inane ","correct_answer":"3"}, {"id":"31","question":"Rebellious","possible_answers":"Gaseous ,Insurgent  ,Garrote ,Integral  ","correct_answer":"2"}, {"id”:”32”,”question":"Looking inward ","possible_answers":"Introspective  , Indigent , Imperious , Laconic ","correct_answer":"1"}, {"id":"33","question":"Faultless, perfect ","possible_answers":"Gamut , Indolent ,Imperious  ,Impeccable  ","correct_answer":"4"}, {"id":"34","question":"Essential, necessary","possible_answers":"Laconic  ,Jaded  ,Integral  ,Genitive ","correct_answer":"3"}, {"id":"35","question":"Talkative","possible_answers":"Gallant , Laconic ,Loquacious  ,Listless  ","correct_answer":"3"}, {"id”:”36”,”question":"wise, marked by good judgment","possible_answers":"Judicious   , Insurgent , Indigent ,Gentile ","correct_answer":"1"}, {"id”:”37”,”question":"Good natured, merry, given to joking, cheerful and friendly","possible_answers":"Jovial  ,Indolent,Kinetic ,Laud ","correct_answer":"1"}, {"id":"38","question":"Impressive or magnificent in appearance or style, excessively grand or ambitious","possible_answers":"Hedonist ,Grandiose  ,Implicit ,Inane ","correct_answer":"2"}, {"id":"39","question":"of pertaining to, or near the stomach","possible_answers":"Gaily ,Gastric  ,Gauge ,Gait ","correct_answer":"2"}, {"id":"40","question":" A list, in the order of succession, of ancestors and their descendants","possible_answers":"Garrulous ,Generality ,Gambol ,Genealogy  ","correct_answer":"4"}, {"id”:”41”,”question":"In a cheerful or lighthearted way, without thinking of consequences, Merrily","possible_answers":"Gaily  ,Generosity ,Harbinger, Gullible","correct_answer":"1"}, {"id":"42","question":"To execute by strangling","possible_answers":"Glutton , Jaded,Gregarious ,Garrote  ","correct_answer":"4"}, {"id":"43","question":"habitual overeater","possible_answers":"Genesis , Glutton , Gallant, Garrote","correct_answer":"2"}, {"id":"44","question":"Stupid, pointless, absurd","possible_answers":"Gait ,Inane  , Insipid , Indolent ","correct_answer":"2"}, {"id":"45","question":"Pertaining to motion","possible_answers":"Galore ,Kinetic  , Garrulous ,Gendarme ","correct_answer":"2"}, {"id":"46","question":"Lazy","possible_answers":"Innate  ,Infamous  ,Indolent  ,Indigent  ","correct_answer":"3"}, {"id":"47","question":"Sparing in words, using very few words","possible_answers":"Impunity,Genitive ,Laconic  ,Garish ","correct_answer":"3"}, {"id":"48","question":"habitual overeater","possible_answers":"Gregarious ,Glutton ,Grandiose ,Gullible ","correct_answer":"2"}, {"id":"49","question":"Tired, bored, or lacking enthusiasm, typically after having too much of something","possible_answers":"Impunity,Indolent, Grandiose, Jaded","correct_answer":"4"}, {"id”:”50”,”question":"Talkative","possible_answers":"Loquacious  ,Laconic ,Impudence ,Jaded  ","correct_answer":"1"}
]} ;

//modifyJsonExcel(jtemp);
//modifyJsonExcel(jtemp);
//modifyJsonExcel(jtemp);
//modifyJsonExcel(jtemp);
//modifyJsonExcel(jtemp);
//modifyJsonExcel(jtemp);
//modifyJsonExcel(jtemp);

// modifyUserExcel
async function modifyUserResultExcel(user,result){
    let workbook = new Excel.Workbook();
	
	workbook = await workbook.xlsx.readFile(__dirname+"/user-lastresult.xlsx");
	
		var worksheet = workbook.getWorksheet(1);
        let row =null;
		var userExists=false;
		for (i = 2; i <= worksheet.rowCount; i++) {
        console.log(worksheet.getRow(i).getCell(1).value);
        console.log(worksheet.getRow(i).getCell(2).value);
		
		row = worksheet.getRow(i);
		if(user.trim() === row.getCell(1).value){
			userExists=true;
			row=worksheet.getRow(i);
			break ;
		}
    }
	
	if(!userExists){
		row=worksheet.getRow(worksheet.rowCount+1);
		row.getCell(1).value=user;
		row.getCell(2).value=result;
		
	}else{
		row.getCell(1).value=user;
		row.getCell(2).value=result;
	}
	
	row.commit();
	
	let workbook1=null;
	
	workbook1=await workbook.xlsx.writeFile(__dirname+"/user-lastresult.xlsx");
	
		return "done";

	
}

async function getUserResultExcel(user){

let workbook = new Excel.Workbook();
	
	workbook = await workbook.xlsx.readFile(__dirname+"/user-lastresult.xlsx");
	    let result="";
		var worksheet = workbook.getWorksheet(1);
        let row =null;
		var userExists=false;
		for (i = 2; i <= worksheet.rowCount; i++) {
        console.log(worksheet.getRow(i).getCell(1).value);
        console.log(worksheet.getRow(i).getCell(2).value);
		
		row = worksheet.getRow(i);
		if(user.trim() === row.getCell(1).value){
			userExists=true;
			row=worksheet.getRow(i);
			break ;
		}
    }
	
	if(!userExists){
		result = "-1";
		
	}else{
		result=row.getCell(2).value;
		
	}
	
		return {result:result};	
	
}

function addIntAfter4Seconds(x) { 
  return new Promise(resolve => { 
    setTimeout(() => { 
      resolve(x + 4); 
    }, 2000); 
  }); 
} 

function renamingfile(x) { 
  return new Promise(resolve => { 
    setTimeout(() => { 
      resolve(x + 4); 
    }, 2000); 
  }); 
} 
// Await expression will pause the async function 
// and wait for the promise to resolve before moving forward 
// addAsync is used to set up a promise chain 
async function addAsync(x) { 
  const a = await addIntAfter4Seconds(10); 
  const b = await addIntAfter4Seconds(20); 
  const c = await addIntAfter4Seconds(30); 
  return x + a + b + c; 
} 
  
// then method to conclude the logic 
// the returned value is logged to the console 
/*addAsync(x).then((sum) => { 
  console.log(sum); 
}); */

//modifyUserResultExcel('ssasas',176.7);
//modifyUserResultExcel('ssasas',13343430);
//modifyUserResultExcel('lassan',1740);
//modifyUserResultExcel('bhaagi',170.99);



	
// string se object	
//JSON.parse(yourJsonString);

/*var json =   {"quiz_questions":[{"id":"1","question":"Sparing in words, using very few words","possible_answers":"Loquacious,Laconic,Integral,Judicious","correct_answer":"2"}, {"id":"2","question":"Freedom from punishment","possible_answers":"Impunity,Indolent,Jaded,Hedonist","correct_answer":"1"}, {"id":"3","question":"An instrument for measuring","possible_answers":"Gallant ,Gauge ,Gamester ,Gastric ","correct_answer":"2"}, {"id":"4","question":"Inflammation of the stomach  ","possible_answers":"Insurgent ,Impudence ,Garrulous ,Gastritis ","correct_answer":"4"}, {"id”:”5”,”question":"unoriginal","possible_answers":"Imperious ,Impudence ,Hackneyed ,Inane ","correct_answer":"3"}, {"id”:”6”,”question":"To draw principle inferences","possible_answers":"Gaseous ,Generalize ,Garrote ,Garrison ","correct_answer":"2"}, {"id”:”7”,”question":"To imbue with life or animation ","possible_answers":"Galvanize ,Garnish ,Garrulous ,Gaseous ","correct_answer":"1"}, {"id”:”8”,”question":"Decorate or embellish ","possible_answers":"Gamut ,Genealogist ,Gambol ,Garnish ","correct_answer":"4"}, {"id”:”9”,”question":"Given to constant trivial talking","possible_answers":"Gaseous ,Gendarme ,Garrulous ,Genitive ","correct_answer":"3"}, {"id”:”10”,”question":"To risk money or other possession on an event","possible_answers":"Gallant ,Gaily ,Gamble ,Gastronomy ","correct_answer":"3"}, {"id”:”11”,”question":"A tracer of pedigrees","possible_answers":"Genealogist ,Genealogy ,Generic ,Gentile ","correct_answer":"1"}, {"id":"12","question":"Loud and flashy","possible_answers":"Garish ,Indolent,Jaded,Hedonist","correct_answer":"1"}, {"id":"13","question":"anything that foreshadows the future event","possible_answers":"Hedonist ,Harbinger ,Implicit ,Inane ","correct_answer":"2"}, {"id":"14","question":"a person’s manner of walking","possible_answers":"Gaily ,Gait ,Gauge ,Galvanize ","correct_answer":"2"}, {"id”:”15”,”question":"A whole range or sequence","possible_answers":"Garrulous ,Indolent,Gambol ,Gamut ","correct_answer":"4"}, {"id”:”16”,”question":"To produce or cause to be","possible_answers":"Generate ,Generosity ,Harbinger, Gendarme","correct_answer":"1"}, {"id":"17","question":"Easily persuaded to believe something ","possible_answers":"Glutton , Jaded,Gregarious ,Gullible ","correct_answer":"4"}, {"id":"18","question":"The quality of being kind and generous","possible_answers":"Genesis , Generosity, Gallant, Garrote","correct_answer":"2"}, {"id":"19","question":"Festivity, the state of being lighthearted or cheerful","possible_answers":"Gait ,Gaiety ,Gallant ,Gamester ","correct_answer":"2"}, {"id":"20","question":"Abundant","possible_answers":"Galore ,Garrison ,Gamble ,Gendarme ","correct_answer":"1"}, {"id":"21","question":"Light and unsubstantial","possible_answers":"Gastritis ,Garrison ,Gaseous ,Genealogy ","correct_answer":"3"}, {"id":"22","question":"refined or respectable","possible_answers":"Impunity,Genitive ,Genteel ,Garish ","correct_answer":"3"}, {"id":"23","question":"habitual overeater","possible_answers":"Gregarious ,Glutton ,Grandiose ,Gullible ","correct_answer":"2"}, {"id":"24","question":"A person who pursue pleasure, often to excess","possible_answers":"Impunity,Indolent,Jaded,Hedonist","correct_answer":"4"}, {"id":"25","question":"Exaggeration","possible_answers":"Hyperbole ,Indolent,Impudence ,Impeccable ","correct_answer":"1"}, {"id":"26","question":"Arrogant","possible_answers":"Loquacious,Laconic,Imperious ,Implicit ","correct_answer":"3"}, {"id":"27","question":"Stupid, pointless, absurd","possible_answers":"Inane ,Indolent,Jaded,Hedonist","correct_answer":"1"}, {"id":"28","question":"Poor, needy","possible_answers":"Gallant ,Indigent  ,Insipid  ,Indolent  ","correct_answer":"2"}, {"id":"29","question":"notorious","possible_answers":"Insurgent ,Impudence ,Garrulous ,Infamous  ","correct_answer":"4"}, {"id":"30","question":"Dull, boring, lifeless","possible_answers":"Imperious ,Impudence ,Insipid  ,Inane ","correct_answer":"3"}, {"id":"31","question":"Rebellious","possible_answers":"Gaseous ,Insurgent  ,Garrote ,Integral  ","correct_answer":"2"}, {"id”:”32”,”question":"Looking inward ","possible_answers":"Introspective  , Indigent , Imperious , Laconic ","correct_answer":"1"}, {"id":"33","question":"Faultless, perfect ","possible_answers":"Gamut , Indolent ,Imperious  ,Impeccable  ","correct_answer":"4"}, {"id":"34","question":"Essential, necessary","possible_answers":"Laconic  ,Jaded  ,Integral  ,Genitive ","correct_answer":"3"}, {"id":"35","question":"Talkative","possible_answers":"Gallant , Laconic ,Loquacious  ,Listless  ","correct_answer":"3"}, {"id”:”36”,”question":"wise, marked by good judgment","possible_answers":"Judicious   , Insurgent , Indigent ,Gentile ","correct_answer":"1"}, {"id”:”37”,”question":"Good natured, merry, given to joking, cheerful and friendly","possible_answers":"Jovial  ,Indolent,Kinetic ,Laud ","correct_answer":"1"}, {"id":"38","question":"Impressive or magnificent in appearance or style, excessively grand or ambitious","possible_answers":"Hedonist ,Grandiose  ,Implicit ,Inane ","correct_answer":"2"}, {"id":"39","question":"of pertaining to, or near the stomach","possible_answers":"Gaily ,Gastric  ,Gauge ,Gait ","correct_answer":"2"}, {"id":"40","question":" A list, in the order of succession, of ancestors and their descendants","possible_answers":"Garrulous ,Generality ,Gambol ,Genealogy  ","correct_answer":"4"}, {"id”:”41”,”question":"In a cheerful or lighthearted way, without thinking of consequences, Merrily","possible_answers":"Gaily  ,Generosity ,Harbinger, Gullible","correct_answer":"1"}, {"id":"42","question":"To execute by strangling","possible_answers":"Glutton , Jaded,Gregarious ,Garrote  ","correct_answer":"4"}, {"id":"43","question":"habitual overeater","possible_answers":"Genesis , Glutton , Gallant, Garrote","correct_answer":"2"}, {"id":"44","question":"Stupid, pointless, absurd","possible_answers":"Gait ,Inane  , Insipid , Indolent ","correct_answer":"2"}, {"id":"45","question":"Pertaining to motion","possible_answers":"Galore ,Kinetic  , Garrulous ,Gendarme ","correct_answer":"2"}, {"id":"46","question":"Lazy","possible_answers":"Innate  ,Infamous  ,Indolent  ,Indigent  ","correct_answer":"3"}, {"id":"47","question":"Sparing in words, using very few words","possible_answers":"Impunity,Genitive ,Laconic  ,Garish ","correct_answer":"3"}, {"id":"48","question":"habitual overeater","possible_answers":"Gregarious ,Glutton ,Grandiose ,Gullible ","correct_answer":"2"}, {"id":"49","question":"Tired, bored, or lacking enthusiasm, typically after having too much of something","possible_answers":"Impunity,Indolent, Grandiose, Jaded","correct_answer":"4"}, {"id”:”50”,”question":"Talkative","possible_answers":"Loquacious  ,Laconic ,Impudence ,Jaded  ","correct_answer":"1"}
]} ; */

//yavdhesh 

async function randomIdGenerator(){
//***************************

var nonrepeatingList =[];
let dds=await questionJson();
json = dds ;
json= JSON.parse(json);
//console.log("Json jo ab random me jaayegaa");
//console.log(typeof json);
//console.log(json.quiz_questions);
console.log("Question Size");
console.log(json.quiz_questions.length);
var arr = [];
var jsonToBe = {"quiz_questions":[]};
while(arr.length < 5){
    var randomnumber = Math.floor(Math.random()*(json.quiz_questions.length));
    if(arr.indexOf(randomnumber) > -1 || nonrepeatingList.indexOf(randomnumber) > -1) 
		continue;
	arr[arr.length] = randomnumber;
	nonrepeatingList.push(randomnumber);
		 
	}
	console.log("non repeating ki lambai = "+nonrepeatingList.length);
	console.log("non repeating ki lambai = "+nonrepeatingList);
	if(json.quiz_questions.length == nonrepeatingList.length){
	nonrepeatingList=[];	
	}
	for(var i=0;i<arr.length;i++){
 	jsonToBe.quiz_questions.push(json.quiz_questions[arr[i]]);
 }
 
 //console.log(jsonToBe);
 return jsonToBe;
}

 

 
 app.get('/initialQuizData', function(req, res){
	console.log("vei giyo");
		randomIdGenerator().then(function(data){
		console.log('reponse niche hai');
		console.log(data);
		res.send(data)	;
		});
	
	
	//res.sendFile(__dirname+"/index.html");
	console.log(__dirname+"/index.html tejash quiz App wali service");

});

app.get('/emptyList', function(req, res){
	//var size=nonrepeatingList.length;
	var nonrepeatingList=[];	
	res.send("safaltapurvak nasht kiya gaya jiski lambai hai = "+nonrepeatingList.length);
	//res.sendFile(__dirname+"/index.html");
	console.log(__dirname+"/index.html tejash quiz App wali service");

});

//yeh prashnaa ke liye hai 8 april ko ki
app.post('/questionUpdate',function(request,res){
	//json update
	modifyJsonExcel(request.body).then((data)=>{
	res.send(data);	
	});
	
	

});

app.post('/get-user-result', function(req, res){
	
	getUserResultExcel(req.body.user).then((data)=>{
		res.send(data);
	})

});

//yeh aagantuk parinaam ke liye hai
app.post('/user-result',function(request,res){
	//json update
	
	modifyUserResultExcel(request.body.user,request.body.result).then((data)=>{
		res.send(data);

	});
	
	
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