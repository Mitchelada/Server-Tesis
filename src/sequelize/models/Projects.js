import Sequelize from 'sequelize'

const Projects = sequelize.define("Projects", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  UserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  active: {
    type: Sequelize.BOOLEAN,
    default: false
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  timestamps: true
})

export default Projects