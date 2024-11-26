import { Router } from "express"
import FilmesController from "../controllers/FilmesController.js"

const router = Router()

router.get("/filmes", FilmesController.findAll)
router.post("/filmes", FilmesController.create)
router.put("/filmes/:id", FilmesController.update)
router.delete("/filmes/:id", FilmesController.delete)
router.get("/filmes/:id", FilmesController.findById)

export default router