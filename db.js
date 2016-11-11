var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if(env ==='production'){
	sequelize = new Sequelize('postgres://qnugeuvfcjdoab:mGkriVKB1xQVROp84am6NQKHL7@ec2-50-17-253-74.compute-1.amazonaws.com:5432/d7d5s7523s8dle',{
		dialect:'postgres'
	})
	}else{
		sequelize = new Sequelize(undefined,undefined,undefined,{
			'dialect':'sqlite',
			'storage':__dirname+'/data/dev-todo-api.sqlite'
			});
	}
// var sequelize = new Sequelize(undefined,undefined,undefined,{
// // 	'dialect':'sqlite',
// // 	'storage':__dirname+'/data/dev-todo-api.sqlite'
// });

var db ={};


db.todo = sequelize.import(__dirname+'/models/todo.js');
db.user = sequelize.import(__dirname +'/models/user.js');
db.sequelize = sequelize;
db.Sequelize =Sequelize;

db.todo.belongsTo(db.user);
db.user.hasMany(db.todo);


module.exports =db;
