import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Bug = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    closed: { type: Boolean, required: true, default: false },
    closedDate: { type: Date },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Bug.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Bug
