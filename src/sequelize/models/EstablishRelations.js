import Users from './Users'
import Projects from './Projects'
import Aspects from './Aspects'
import Elements from './Elements'
import Requirements from './Requirements'
import Rankings from './Rankings'

Users.hasMany(Projects, {
  foreignKey: 'UserId',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Projects.hasMany(Aspects, {
  foreignKey: 'ProjectId',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Aspects.hasMany(Elements, {
  foreignKey: 'AspectId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: true
})

Projects.hasMany(Requirements, {
  foreignKey: 'ProjectId',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Projects.hasMany(Rankings, {
  foreignKey: 'ProjectId',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Requirements.hasMany(Rankings, {
  foreignKey: 'RequirementId',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Projects.belongsTo(Users)
Aspects.belongsTo(Projects)
Elements.belongsTo(Aspects)
Requirements.belongsTo(Projects)
Rankings.belongsTo(Projects)
Rankings.belongsTo(Requirements)

Elements.belongsToMany(Requirements, { through: 'ElementsHasRequirements' })
Requirements.belongsToMany(Elements, { through: 'ElementsHasRequirements' })