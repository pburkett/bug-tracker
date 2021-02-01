import { AppState } from '../AppState'
import { api } from './AxiosService'
class NotesService {
  async getByBug(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    AppState.notes = res.data
  }

  async post(content) {
    const body = { content: content, bug: AppState.bugs[0].id, flagged: 'pending' }
    const res = await api.post('api/notes', body)
    AppState.notes.push(res.data[0])
  }

  async remove(id) {
    await api.delete('api/notes/' + id)
    AppState.notes = AppState.notes.filter(n => n.id !== id)
  }
}

export const notesService = new NotesService()
