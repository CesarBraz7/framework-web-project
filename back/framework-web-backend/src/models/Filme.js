import { DataTypes } from "sequelize"
import db from "../db/db.js"

export default db.define("filmes", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(200)
    },
    director: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    rate: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
})