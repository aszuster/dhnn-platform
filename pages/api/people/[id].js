import dbConnect from "lib/dbConnect"
import People from 'models/People'

export default async function handler(req, res){
    const { id } = req.query
    if (id) {
        if (req.method === "GET") {
            try {
                await dbConnect()
                const result = await People.findById(id)
                res.status(200).send(result)
            } catch (error) {
                res.status(500).send(`Ocurrió un error inesperado. Error: ${error}`)
            }
        }
        if (req.method === "PUT") {
            try {
                await dbConnect()
                const body = req.body
                const result = await People.findByIdAndUpdate(id, body)
                res.status(200).send(result)
            } catch (error) {
                res.status(304).send(`Ocurrió un error inesperado. Error: ${error}`)
            }
        }
        if (req.method === "DELETE") {
            try {
                await dbConnect()
                const result = await People.deleteOne({_id:id})
                res.status(200).send(result)
            } catch (error) {
                res.status(304).send(`Ocurrió un error inesperado. Error: ${error}`)
            }
        }
    }
}