import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import e from 'express'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/notes', this.getNotes)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      res.send(await bugsService.find())
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      res.send(await bugsService.findOne(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getNotes(req, res, next) {
    try {
      const query = { bug: req.params.id }
      res.send(await notesService.find(query))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(await bugsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const query = { _id: req.params.id, closed: false }
      res.send(await bugsService.update(query, req.body))
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const query = { _id: req.params.id, creatorId: req.userInfo.id }
      query.closed = false

      res.send(await bugsService.remove(query))
    } catch (error) {
      next(error)
    }
  }
}
