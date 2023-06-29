import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Ingrese el email."],
    unique: true,
  },
  role: String,
  name: {
    type: String,
    required: [true, "Ingrese el nombre."],
  },
  area: String,
  occupation: String,
  picture: {
    public_id: String,
    secure_url: String,
  },
  state: String,
  birthday: String,
  profile_link: String,
})

export default models.User || model("User", UserSchema)
