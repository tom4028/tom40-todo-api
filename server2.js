var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');


var todos = [];
var todoNextId=1;;

app.use(bodyParser.json());

app.get('/',function(req,res){
	res.send('Todos1 API Root');
});

app.get('/todos',function(req,res){
	var queryParams = req.query;
	console.log(queryParams);
	var filteredTodos =todos;
	if(queryParams.hasOwnProperty('completed') && queryParams.completed==="true"){
		filteredTodos =_.where(filteredTodos,{
			completed:true
		});

	}else if(queryParams.hasOwnProperty('completed') && queryParams.completed==="false"){
			filteredTodos =_.where(filteredTodos,{
				completed:false
			});
	}

	if(queryParams.hasOwnProperty('q')&&queryParams.q.length>0){
		filteredTodos = _.filter(filteredTodos,function(todo){
			return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase())> -1;
		});
}
		res.json(filteredTodos);
	
	
});

app.get('/todos/:id',function(req,res){
	var todoId= parseInt(req.params.id);
	var matchedTodo =_.findWhere(todos,{id:todoId});
	// var matchedTodo;

	// todos.forEach(function(todo){	
	// 	if(todoId === todo.id){
	// 		matchedTodo = todo;
	// 	}
	// });

	if(matchedTodo){
		res.json(matchedTodo);
	}else{
		res.status(404).send('No matched todo.');
	}	
});


app.post('/todos',function(req,res){
	var body =_.pick(req.body,'description','completed');
	console.log(body);

	if(!_.isBoolean(body.completed) || !_.isString(body.description)|| body.description.trim().length ===0){
		return res.status(400).send("Coś poszło nie tak ale działa.");
	}
	
	body.id = todoNextId++;
	body.description =body.description.trim();
	todos.push(body);
	

	res.json(body);
});

app.delete('/todos/:id',function(req,res){
	var todoId= parseInt(req.params.id);
	var matchedTodo =_.findWhere(todos,{id:todoId});
	

	if(!matchedTodo){
		res.status(400).send("Id nie pasuje.");
	}else{
		todos =_.without(todos,matchedTodo);
	}
	res.json(matchedTodo);

});
app.put('/todos/:id',function(req,res){
	var todoId= parseInt(req.params.id);
	var matchedTodo =_.findWhere(todos,{id:todoId});
	var body =_.pick(req.body,'description','completed');
	var validAttribute = {};

	if(!matchedTodo){
		return res.status(404).send('Nic nie pasuje.');
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttribute.completed = body.completed;
	}else if(body.hasOwnProperty('completed')){
		return res.status(400).send("Ale coś tam działa.");
	}

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length>0){
		validAttribute.description = body.description;
	}else if(body.hasOwnProperty('description')){
		return res.status(400).send('Coś działa ale nie do końca.');
	}

	matchedTodo =_.extend(matchedTodo,validAttribute);
	res.json(matchedTodo);

});

db.sequalize.sync().then(function(){
	app.listen(PORT,function(){
	console.log('Express listening on Port:'+PORT+"!");
});
});


