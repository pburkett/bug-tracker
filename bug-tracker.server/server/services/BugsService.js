import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async find(query = {}) {
    const bugs = await dbContext.Bugs.find(query).populate('creator')
    return bugs
  }

  async findOne(id) {
    const bugs = await dbContext.Bugs.findById(id).populate('creator')
    return bugs
  }

  async create(body) {
    const bug = await dbContext.Bugs.create(body)
    return bug
  }

  async update(query, body) {
    const bug = await dbContext.Bugs.findOneAndUpdate(query, body, { new: true })
    return bug
  }

  async remove(query) {
    const bug = await dbContext.Bugs.findOneAndUpdate(query, { closed: true }, { new: true }).populate('creator')
    return bug
  }
}

export const bugsService = new BugsService()
