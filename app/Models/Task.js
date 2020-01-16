'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  project() {
    return this.belongsTo('App/Models/Projec')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  file() {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task
