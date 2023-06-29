import dbConnect from "lib/dbConnect"
import Projects from "models/Projects"
import uploadFiles from "services/uploadFiles"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "POST") {
    try {
      let body = req.body
      const project = Projects.create(body)
      return res.status(201).json(project)
    } catch (error) {
      let msg = "Ocurrió un error. Por favor comuníquese con el administrador."
      return res.status(500).json({
        message: msg,
      })
    }
  }

  try {
    await dbConnect()
    const result = await Projects.find({})
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send(`Ocurrió un error inesperado. Error: ${error}`)
  }
}
