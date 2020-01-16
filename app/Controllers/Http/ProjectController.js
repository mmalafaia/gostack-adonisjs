'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  async index({ request, response, view }) {
    const project = await Project.query()
      .with('user')
      .fetch()

    return project
  }

  async store({ request, response, auth }) {
    const data = request.only(['title', 'description'])

    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  async show({ params, response }) {
    try {
      const project = await Project.findOrFail(params.id)

      await project.load('user')
      await project.load('tasks')

      return project
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Erro, esse projeto não existe.' }
      })
    }
  }

  async update({ params, request, response }) {
    try {
      const project = await Project.findOrFail(params.id)
      const data = request.only(['title', 'description'])

      project.merge(data)

      await project.save()

      return project
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Erro, esse projeto não existe.' }
      })
    }
  }

  async destroy({ params, response }) {
    try {
      const project = await Project.findOrFail(params.id)

      await project.delete()
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Erro, esse projeto não existe.' }
      })
    }
  }
}

module.exports = ProjectController
