'use strict'

const fs = require('fs')
const path = require('path')

const Sequelize = require('sequelize')
const config = require('./config/db')
const sequelize = new Sequelize(config)
const modelsDir = path.join(__dirname, '/models/')

fs
	.readdirSync(modelsDir)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		sequelize.import(path.join(modelsDir, file));
	})

module.exports = sequelize;
