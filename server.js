<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 17fcf4ed00c39744656e886c71cd856b9c82a5e3
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
<<<<<<< HEAD
	var query = req.query;
	var where = {};

	if(query.hasOwnProperty('completed')&& query.completed==='true'){
		where.completed = true;
	}else if(query.hasOwnProperty('completed')&& query.completed==='false'){
		where.completed =false;
	}

	if(query.hasOwnProperty('q')&& query.q.length>0){
		where.description = {
			$like:'%'+query.q+'%'
		};
	}

	db.todo.findAll({where:where}).then(function(todos){
		res.json(todos);
	},function(e){
		res.status(500).send();
	})
	
// 	var filteredTodos =todos;
// 	if(queryParams.hasOwnProperty('completed') && queryParams.completed==="true"){
// 		filteredTodos =_.where(filteredTodos,{
// 			completed:true
// 		});

// 	}else if(queryParams.hasOwnProperty('completed') && queryParams.completed==="false"){
// 			filteredTodos =_.where(filteredTodos,{
// 				completed:false
// 			});
// 	}

// 	if(queryParams.hasOwnProperty('q')&&queryParams.q.length>0){
// 		filteredTodos = _.filter(filteredTodos,function(todo){
// 			return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase())> -1;
// 		});
// }
// 		res.json(filteredTodos);
=======
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
>>>>>>> 17fcf4ed00c39744656e886c71cd856b9c82a5e3
	
	
});

app.get('/todos/:id',function(req,res){
	var todoId= parseInt(req.params.id,10);

		db.todo.findById(todoId).then(function(todo){
			if(!!todo){
				res.json(todo.toJSON());
			}else{
				res.status(404).send();
			}
		},function(e){
			res.status(500).send();
		});
	// var matchedTodo =_.findWhere(todos,{id:todoId});
	// // var matchedTodo;

	// // todos.forEach(function(todo){	
	// // 	if(todoId === todo.id){
	// // 		matchedTodo = todo;
	// // 	}
	// // });

	// if(matchedTodo){
	// 	res.json(matchedTodo);
	// }else{
	// 	res.status(404).send('No matched todo.');
	// }	
});


app.post('/todos',function(req,res){
	var body =_.pick(req.body,'description','completed');
	
	db.todo.create(body).then(function(todo){
		res.json(todo.toJSON());
	},function(e){
		res.status(400).json(e);
	});
	
	
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

db.sequelize.sync().then(function(){
	app.listen(PORT,function(){
	console.log('Express listening on Port:'+PORT+"!");
});
<<<<<<< HEAD
});
=======
});


=======
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
	
	db.todo.create(body).then(function(todo){
		res.json(todo.toJSON());
	},function(e){
		res.status(400).json(e);
	});
	
	// if(!_.isBoolean(body.completed) || !_.isString(body.description)|| body.description.trim().length ===0){
	// 	return res.status(400).send("Coś poszło nie tak ale działa.");
	// }
	
	// body.id = todoNextId++;
	// body.description =body.description.trim();
	// todos.push(body);
	

	// res.json(body);
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

db.sequelize.sync().then(function(){
	app.listen(PORT,function(){
	console.log('Express listening on Port:'+PORT+"!");
});
});


>>>>>>> 7645dd078a395294ada78667cb841fd84f258597
>>>>>>> 17fcf4ed00c39744656e886c71cd856b9c82a5e3
