import Sequelize from 'sequelize'

const Requirements = sequelize.define("Requirements", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  weight: {
    type: Sequelize.INTEGER,
    default: null
  },
  ProjectId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
    references: {
      model: 'Projects',
      key: 'id'
    }
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  timestamps: true
})

export default Requirements