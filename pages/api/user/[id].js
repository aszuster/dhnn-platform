import dbConnect from "lib/dbConnect"
import bcrypt from "bcrypt"
import User from "models/User"

export default async function handler(req, res) {
  await dbConnect()
  const { id } = req.query
  if (id) {
    // READ
    if (req.method === "GET") {
      try {
        const result = await User.findById(id)
        res.status(200).send(result)
      } catch (error) {
        res.status(500).send(`Ocurrió un error inesperado. Error: ${error}`)
      }
    }

    //UPDATE
    if (req.method === "PUT") {
      const body = req.body
      if (body.password) {
        const passwordHash = await bcrypt.hash(body.password, 10)
        body.password = passwordHash
      } else {
        delete body.password
      }
      try {
        const result = await User.findByIdAndUpdate(id, body)
        res.status(200).send(result)
      } catch (error) {
        res.status(304).send(`Ocurrió un error inesperado. Error: ${error}`)
      }
    }

    //DELETE
    if (req.method === "DELETE") {
      try {
        const result = await User.deleteOne({ _id: id })
        res.status(200).send(result)
      } catch (error) {
        res.status(304).send(`Ocurrió un error inesperado. Error: ${error}`)
      }
    }
  }
}
