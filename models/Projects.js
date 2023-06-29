import { Schema, model, models } from "mongoose"

const ProjectsSchema = new Schema({
  title: String,
  category: String,
  project_img: {
    public_id: String,
    secure_url: String,
  },
  images: [],
  state: String,
  videoUrl: String,
  team: String,
  year: Number,
  tags: [],
})

export default models.Projects || model("Projects", ProjectsSchema)
