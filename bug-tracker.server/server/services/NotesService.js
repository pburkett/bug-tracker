import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async find(query = {}) {
    const notes = await dbContext.Notes.find(query).populate('creator')
    return notes
  }

  async create(body) {
    const note = await dbContext.Notes.create(body)
    const popNote = await this.find({ _id: note.id })
    return popNote
  }

  async remove(query) {
    await dbContext.Notes.findOneAndRemove(query)
    return 'Note Deleted.'
  }
}

export const notesService = new NotesService()
