import Sequelize from 'sequelize'

const sequelize = new Sequelize(
    "prioritization",
    "admin",
    "Stackoverflow1", {
        host: "tesis-michel-araya.cd0d0vj649kh.us-west-2.rds.amazonaws.com",
        dialect: "mysql",
        operatorAliases: false
    }
)

export default sequelize
global.sequelize = sequelize