import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description:{
      type: String
  },

  
})

const Skill = mongoose.model('Skill', SkillSchema)

export default Skill