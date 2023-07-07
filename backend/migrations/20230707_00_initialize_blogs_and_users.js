const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
      await queryInterface.createTable('blogs', {
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
        date: {
          type: DataTypes.DATE
        },
      })
      await queryInterface.createTable('users', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {isEmail: true}
        },
      })
      await queryInterface.addColumn('blogs', 'user_id', {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      })

      await queryInterface.addColumn('blogs', 'created_at', {
        type: DataTypes.DATE,
        allowNull: true,
      })

      await queryInterface.addColumn('users', 'created_at', {
        type: DataTypes.DATE,
        allowNull: true,
      })

      await queryInterface.addColumn('blogs', 'updated_at', {
        type: DataTypes.DATE,
        allowNull: true,
      })

      await queryInterface.addColumn('blogs', 'year', {
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
    })

      await queryInterface.addColumn('users', 'updated_at', {
        type: DataTypes.DATE,
        allowNull: true,
      })




    },
    down: async ({ context: queryInterface }) => {
      await queryInterface.dropTable('blogs')
      await queryInterface.dropTable('users')
    },
  }