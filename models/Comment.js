const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    contents: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    author_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id'
        }
    },
}, {
    sequelize,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
});

module.exports = Comment;