var express = require('express');
var bodyParser = require('body-parser');
var _=require('underscore');

var app = express();

var PORT = process.env.PORT || 3000;

// var todos =[{
	// id:1,
	// description:'Meet Ben for lunch',
	// completed:false
// },
// {
	// id:2,
	// description:'Gp to market',
	// completed:false
// },
// {
	// id:3,
	// description:"Feed the cat",
	// completed:true
// }];
var todos = [];
var todoNextId =1;


app.use(bodyParser.json());
app.get('/',function(req,res){
	res.send('Todo API Root');
});

//GET  /todos

app.get('/todos',function(req,res){
	res.json(todos);
});
//GET /todos/id

app.get('/todos/:id',function(req,res){
	
	var todoId =parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos,{id:todoId});
	// var matchedTodo;
	// todos.forEach(function(todo){
	// 	if(todoId ===todo.id){
	// 		matchedTodo = todo;
	// 	}
	// });
	if(matchedTodo){
		res.json(matchedTodo);
	}else{
		res.status(404).send();
	}
	
	// res.send('Asking for todo with id of '+req.params.id);
});

//POST /todos

app.post('/todos',function(req,res){
	var body = _.pick(req.body,'description','completed');//_.pick ti only pick description and completed
		console.log(body);



		if(!_.isBoolean (body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
			return res.status(400).send();
		}
		body.description = body.description.trim();
		//set body.description to be trimmed value


	//add id field
	body.id = todoNextId++;

	//push body into array
	todos.push(body);

	//console.log('description: '+ body.description);

	res.json(body);
});

//DELETE /todos/:id

app.delete('/todos/:id',function(req,res){
	
	var todoId =parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos,{id:todoId});

	if(!matchedTodo){
			res.status(404).send({"error":"no todo found with that id"});
	}else{
		todos = _.without(todos,matchedTodo);
		res.json(matchedTodo );
	}
	
});

app.listen(PORT,function(){
	console.log(process.cwd());
	console.log(process.pid);
	console.log('Express listening on port: '+PORT+'!');
});