import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Apartment = sequelize.define("apartments",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            unique:true,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        area: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        noOfFlats: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // field: "no_of_flats",
        },
        ownerName: {
            type: DataTypes.STRING,
            allowNull: false,
            // field: "owner_name",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        contactNumber: {
            type: DataTypes.STRING(15),
        },
        image:{
            type:DataTypes.TEXT,
            allowNull:true
        }
    },
    {
        tableName: "apartments",
        timestamps: true,
        // underscored: true,
    }
);





