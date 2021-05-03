import Sequelize from 'sequelize'

const Rankings = sequelize.define("Rankings", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    score: {
        type: Sequelize.FLOAT
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
    RequirementId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: 'Requirements',
            key: 'id'
        }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {
    timestamps: true
})

export default Rankings