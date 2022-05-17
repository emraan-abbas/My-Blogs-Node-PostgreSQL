'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users }) {
      // define association here
      this.belongsTo(users, { foreignKey: 'userId' }) // "this" here means BLOGS MODEL
      // If FOREIGN KEY not provided (Like above case) then postgress look for PRIMARY KEY of other table and make it FOREIGN KEY
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  blogs.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'blogs',
  });
  return blogs;
};