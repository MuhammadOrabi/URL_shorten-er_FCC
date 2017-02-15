// Create new SQL LITE DB

var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/data/dev-api.sqlite'
});
var db = {};
db.url = sequelize.import(__dirname + '/models/urls.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;