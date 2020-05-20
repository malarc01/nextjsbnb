
const user = 'melky'
const password = 'pass'
const host = 'localhost'
const database = 'nextbnb'

const Sequelize = require('sequelize')


const sequelize = new Sequelize(database,user,password,{
    host,
    dialect:'postgres',
    logging: false
})

module.exports = sequelize

// const Database = {
//     user :'melky',
//     password :'pass',
//     host :'localhost',
//     database :'nextbnb'
// }
// module.exports = Database
