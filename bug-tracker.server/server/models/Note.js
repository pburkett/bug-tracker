import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Note = new Schema(
  {
    content: { type: String, required: true },
    bug: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    flagged: { type: String, required: true, enum: ['pending', 'completed', 'rejected'] }

  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Note.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Note
