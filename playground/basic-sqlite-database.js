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


var User = sequelize.define('user',{
	email:Sequelize.STRING    //or{type:sequelize.STRING}
});

Todo.belongsTo(User);
User.hasMany(Todo);

console.time('zakładanie i wpis do bazy danych');
sequelize.sync(
	//{force:true}
	).then(function(){
	console.log('Everything is synced');

	User.findById(1).then(function(user){
		user.getTodos({
			where:{
				completed:false
			}
		}).then(function(todos){
			todos.forEach(function(todo){
				console.log(todo.toJSON());
			});
		});
	});

	// User.create({
	// 	email:'bundy@com.pl'
	// }).then(function(){
	// 	return Todo.create({
	// 		description:'Clean yard'
	// 	});
	// }).then(function(todo){
	// 	User.findById(1).then(function(user){
	// 		user.addTodo(todo)
	// 	})
	// })

	
	
});
console.timeEnd('zakładanie i wpis do bazy danych');

