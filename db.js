// Create new SQL LITE DB
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'develpment';
var sequelize;
if (env === 'develpment') {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/data/dev-api.sqlite'
	});
}else {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		'dialect': 'postgres'
	});
}
var db = {};
db.url = sequelize.import(__dirname + '/models/urls.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;