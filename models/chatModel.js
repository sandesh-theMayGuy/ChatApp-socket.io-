import { DataTypes } from "sequelize";
import sequelize from "./index.js";

const message = sequelize.define('User', {

    // Model attributes are defined here

    id :{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT
      // allowNull defaults to true
    }
  }, {
    timestamps : false,
  });

  export default message;