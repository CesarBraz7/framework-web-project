import FilmeModel from '../models/Filme.js'

export default class BookController {
    static async findAll(req, res) {
        const films = await FilmeModel.findAll()

        res.status(200).json({films: films})
    }

    static async findById(req, res) {
        const { id } = req.params

        const film = await FilmeModel.findOne({ where: { id } })

        film == null && res.status(404).json({ error: "film not found" })

        res.status(200).json({ film: film })
    }

    static async create(req, res) {
        const { title, description, director, rate } = req.body

        const film = {
            title, description, director, rate
        }

        const createdFilm = await FilmeModel.create(film)

        res.status(201).json({ film: createdFilm })
    }

    static async update(req, res) {
        const { id } = req.params
        const { title, description, director, rate } = req.body

        const film = {
            title, description, director, rate
        }

        const [numberOfAffectedRows] = await FilmeModel.update(film, { where: { id } })

        const updatedFilm = await FilmeModel.findOne({ where: { id } })

        numberOfAffectedRows === 0 && res.status(404).json({ error: "film not found" })

        res.status(200).json({ film: updatedFilm })
    }

    static async delete(req, res) {
        const { id } = req.params

        const deletedFilm = await FilmeModel.destroy({ where: { id } })

        !deletedFilm && res.status(404).json({ error: "film not found" })

        res.status(200).json({ message: "film deleted" })
    }
}