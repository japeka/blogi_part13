const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isBetween(value) {
          const currentYear = new Date().getFullYear();
          if(value < 1991) {
            throw new Error('Year cannot be less than 1991');
          } else if(value > currentYear) {
            throw new Error('Year cannot be greater than the current year');
          }
        },
      }
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
  })

  module.exports = Blog