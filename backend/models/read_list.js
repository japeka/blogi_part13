const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadList extends Model {}

ReadList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'UNREAD',
    allowNull: false,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'readList'
})

module.exports = ReadList

