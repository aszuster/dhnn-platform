import dbConnect from "lib/dbConnect"
import People from 'models/People'

export default async function handler(req, res){
    await dbConnect()
    
    if (req.method === "POST") {
        try {
            const body = req.body
            const people = People.create(body)
            return res.status(201).json(people)
        } catch (error) {
            let msg = "Ocurrió un error. Por favor comuníquese con el administrador."
            return res.status(500).json({
                message: msg,
            })
        }
    }

    try {
        await dbConnect()
        const result = await People.find({})
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(`Ocurrió un error inesperado. Error: ${error}`)
    }
}