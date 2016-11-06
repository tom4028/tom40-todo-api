var Sequelize = require('node_modules/../sequelize');
var sequelize = new Sequelize(undefined,undefined,undefined,{
	'dialect':'sqlite',
	'storage':__dirname+'/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo',{
	description:{
		type:Sequelize.STRING,
		allowNull:false,
		validate:{
			len:[1,250]
		}
	},
	completed:{
		type:Sequelize.BOOLEAN,
		allowNull:false,
		defaultValue:false
	}
});

console.time('zakładanie i wpis do bazy danych');
sequelize.sync().then(function(){
	console.log('Everything is synced');

	Todo.findById(3).then(function(todo){
		if(todo){
			console.log(todo.toJSON());
		}else{
			console.log('Todo not found!');
		}
	});

	// Todo.create({
	// 	description:'Take our trash'
		
	// }).then(function(todo){
	// 	return Todo.create({
	// 		description:'Clean office'
	// 	});
	// }).then(function(){
	// 	//return Todo.findById(1)
	// 	return Todo.findAll({
	// 		where:{
	// 			description:{
	// 				$like:'%Office%'
	// 			}
	// 		}
	// 	})
	// }).then(function(todos){
	// 		if(todos){
	// 			todos.forEach(function(todo){
	// 				console.log(todo.toJSON());
	// 			})
				
	// 		}else{
	// 			console.log('No todo found!');
	// 		}
	// })
	// .catch(function(e){
	// 	console.log(e);
	// });
});
console.timeEnd('zakładanie i wpis do bazy danych');

