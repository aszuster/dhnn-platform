import { Schema, model, models } from "mongoose"

const PeopleSchema = new Schema({
  text: String,
  image: String,
  type: String,
})

export default models.PeopleSchema || model("People", PeopleSchema)
