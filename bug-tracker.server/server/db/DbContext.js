import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import BugSchema from '../models/Bug'
import NoteSchema from '../models/Note'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bug', BugSchema);
  Notes = mongoose.model('Note', NoteSchema);
}

export const dbContext = new DbContext()
