import { useNavigate } from "react-router-dom"
import { Filme } from "../types/types";
import { useState } from "react";
import axios from "axios";

function FormAdd() {
    const [formData, setFormData] = useState<Filme>({
        title: "",
        description: "",
        director: '',
        rate: 0
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:1302/filmes", formData)
            console.log("Filme adicionado:", response.data)
            alert("Filme adicionado com sucesso!")
            setFormData({
                title: "",
                description: "",
                director: '',
                rate: 0
            })
            alert("Filme adicionado!")
            navigate("/")
        } catch (error: any) {
            console.error("Erro ao adicionar o filme:", error?.message || error)
            alert("Erro ao adicionar o filme!")
        }
    }

    const navigate = useNavigate()

    const handleCancel = () => {
        navigate("/")
    }
    return (
        <section className="w-screen p-10 flex flex-col justify-center items-center gap-10">
            <h1 className="text-4xl font-semibold">Adicionar filme</h1>
            <form onSubmit={handleSubmit} className="bg-gray-100 rounded-xl w-1/2 py-10 px-14 flex flex-col gap-2">
                <label htmlFor="title">Título:</label>
                <input onChange={handleChange} value={formData.title} maxLength={50} type="text" name="title" className="mb-5 py-2 px-3 rounded" required />
                <label htmlFor="description">Descrição:</label>
                <textarea onChange={handleChange} value={formData.description} maxLength={200} name="description" className="mb-5 py-2 px-3 rounded resize-none" required />
                <label htmlFor="director">Diretor:</label>
                <input onChange={handleChange} value={formData.director} maxLength={50} type="text" name="director" className="mb-5 py-2 px-3 rounded" required />
                <label htmlFor="rate">Nota: </label>
                <input onChange={handleChange} value={formData.rate} type="number" step="0.1" name="rate" max={10} min={0} className="mb-5 py-2 px-3 rounded" required />
                <div className="w-full flex flex-row justify-between mt-2 text-lg font-semibold">
                    <button className="w-[48%] bg-gray-300 py-3 rounded-lg hover:bg-gray-200 transition" onClick={handleCancel}>Cancelar</button>
                    <button className="w-[48%] bg-gray-600 text-white py-3 rounded-lg hover:bg-slate-500 transition" type="submit">Adicionar</button>
                </div>
            </form>
        </section>
    )
}

export default FormAdd