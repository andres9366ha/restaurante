module.exports = function(sequelize, DataTypes) {
	var Mesero = sequelize.define('meseros', {
		name: DataTypes.STRING,
		username: DataTypes.STRING
	});
	return Mesero;
}
