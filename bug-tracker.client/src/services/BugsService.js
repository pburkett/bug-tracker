import { AppState } from '../AppState'
import { api } from './AxiosService'

class BugsService {
  async getAll(query) {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async getById(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.bugs = [res.data]
  }

  async create(body) {
    const res = await api.post('api/bugs', body)
    AppState.bugs = [res.data]
    return res.data._id
  }

  async update(id, body) {
    const res = await api.put('api/bugs/' + id, body)
    AppState.bugs = [res.data]
  }

  async remove(id) {
    const res = await api.delete('api/bugs/' + id)
    AppState.bugs = [res.data]
  }
}

export const bugsService = new BugsService()
