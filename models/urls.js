// Define Modal
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('urls',{
		url: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1,250]
			}
		}
	});
}