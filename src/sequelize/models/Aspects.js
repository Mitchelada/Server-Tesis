import Sequelize from 'sequelize'

const Aspects = sequelize.define("Aspects", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  importance: {
    type: Sequelize.INTEGER
  },
  type: {
    type: Sequelize.ENUM('COST','BENEFIT')
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

export default Aspects