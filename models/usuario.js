module.exports = function(sequelize, DataTypes) {
	var Usuario = sequelize.define('usuarios', {
		name: DataTypes.STRING,
		username: DataTypes.STRING,
		password: DataTypes.STRING
	});
	return Usuario;
}
