import { Schema, model, models } from "mongoose"

const NewsSchema = new Schema({
  title: String,
  date: String,
  image: {
    public_id: String,
    secure_url: String,
  },
  firstText: String,
  secondText: String,
  highlightedText: String,
  thirdText: String,
  author: {
    userName: String,
    area: String,
    picture: String,
  },
  featured: Boolean,
})

export default models.News || model("News", NewsSchema)
