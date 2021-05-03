import Sequelize from 'sequelize'

const Elements = sequelize.define("Elements", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  priority: {
    type: Sequelize.ENUM('HIGH','MEDIUM','LOW')
  },
  AspectId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
    references: {
      model: 'Aspects',
      key: 'id'
    }
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  timestamps: true
})

export default Elements