'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ blogs }) {
      // define association here
      this.hasMany(blogs, { foreignKey: 'userId' })
    }

    toJSON() {
      return { ...this.get(), id: undefined } // as we didn't needed ID so we excluded it here
    } // This functions LIMIT the output of JSON (USERS DATA)
  }
  users.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { // press ctrl + space to view options
        notNull: { msg: 'User Must have a name' }, // or TRUE would be fine too
        notEmpty: { msg: 'Name must not be empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: 'Must be a valid email address' },
        notNull: { msg: 'User Must have an email' },
        notEmpty: { msg: 'Enter the email.' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};