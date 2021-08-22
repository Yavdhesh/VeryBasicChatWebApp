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
//server.listen(process.env.PORT, function(){
server.listen(8082, function(){
	
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
	res.send("Namastey, "+new Date() +" ye hai dinaak, testing commit");
	
});

app.get("/styla/index.css",function(req,res){
	res.sendFile(__dirname+"/Styla/index.css");
	
	
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
