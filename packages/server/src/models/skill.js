import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Unnamed Skill"
  },
  type: {
    type: String,

  },
  description: {
    type: String
  },
  game: {
    type: ObjectId,
    ref: 'Game',
  },


})

const Skill = mongoose.model('Skill', SkillSchema)

export default Skill