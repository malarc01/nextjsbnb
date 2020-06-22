const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

// const Model = Sequelize.Model
// const DataTypes = Sequelize.DataTypes

const sequelize = require('../database.js');

class User extends Sequelize.Model {}

// const Database = require('./database.js')
// const {user,password,host,database} = Database

// const sequelize = new Sequelize(database,user,password,{
//     host,
//     dialect:'postgres',
//     logging: false
// })

//  class User extends Model{}

User.init(
	{
		email: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize,
		modelName: 'user',
		timestamps: false,
		hooks: {
			beforeCreate: async (user) => {
				const saltRounds = 10;
				const salt = await bcrypt.genSalt(saltRounds);
				user.password = await bcrypt.hash(user.password, salt);
			}
		}
	}
);

User.prototype.isPasswordValid = async function(password) {
	return await bcrypt.compare(password, this.password);
};
//   exports.sequelize = sequelize
module.exports = User;
