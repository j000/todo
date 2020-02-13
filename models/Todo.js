'use strict'

module.exports = (sequelize, DataTypes) => {
	sequelize.define("Todo", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		done: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	}, {
		timestamps: true,
		createdAt: false,
		updatedAt: 'updated',
	})
}
