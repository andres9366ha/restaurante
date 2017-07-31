module.exports = function(sequelize, DataTypes) {
	var Platillo = sequelize.define('platillos', {
		name: DataTypes.STRING,
		description: DataTypes.STRING,
    price :DataTypes.INTEGER
	});
	return Platillo;
}
