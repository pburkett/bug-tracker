import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import { bugsService } from '../services/BugsService'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await notesService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      // REVIEW This should prevent a user from deleting a note unless the bug matches their user ID. Is this a good way to do this?
      const note = await notesService.find({ _id: req.params.id })
      const bug = await bugsService.findOne(note[0].bug)
      // If you made the bug or the note, you should be able to remove the note.s
      if (bug.creatorId === req.userInfo.id || note[0].creatorId === req.userInfo.id) {
        const query = { _id: req.params.id }
        query._id = req.params.id
        res.send(await notesService.remove(query))
      }
    } catch (error) {
      next(error)
    }
  }
}
