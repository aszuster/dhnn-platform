import dbConnect from "lib/dbConnect"
import bcrypt from "bcrypt"
import User from "models/User"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "POST") {
    const body = req.body
    try {
      const user = await User.create(body)
      return res.status(201).json(user)
    } catch (error) {
      let msg = "Ocurrió un error. Por favor comuníquese con el administrador."
      if (error.code === 11000) {
        msg = "El email que intenta registrar ya existe."
      }
      return res.status(500).json({
        message: msg,
      })
    }
  }

  try {
    const result = await User.find({})
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send(`Ocurrió un error inesperado. Error: ${error}`)
  }
}
