import { useNavigate, useParams } from "react-router-dom"
import { Filme } from "../types/types";
import { useEffect, useState } from "react";
import axios from "axios";

function FormEdit() {
    const { id } = useParams<{ id: string }>()
    const [formData, setFormData] = useState<Filme>()
    const navigate = useNavigate()

    const fetchFilme = async () => {
        try {
            const response = await axios.get<Filme>(`http://localhost:1302/filmes/${id}`)
            setFormData(response.data)
            console.log(response.data)
        } catch (error) {
            console.error("Erro ao buscar o filme:", error)
        }
    }

    useEffect(() => {
        if (id) {
            fetchFilme()
        }

    }, [id])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => (prevData && { ...prevData, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            try {
                await axios.put(`http://localhost:1302/filmes/${id}`, formData)
                alert("Filme atualizado com sucesso!")
                navigate("/")
            } catch (error) {
                console.error("Erro ao atualizar o filme:", error)
                alert("Erro ao atualizar o filme!")
            }
        }
    }


    const handleCancel = () => {
        navigate("/")
    }

    if (!formData) return <p>Carregando dados do filme...</p>

    return (
        <section className="w-screen p-10 flex flex-col justify-center items-center gap-10">
            <h1 className="text-4xl font-semibold">Editar filme</h1>
            <form onSubmit={handleSubmit} className="bg-gray-100 rounded-xl w-1/2 py-10 px-14 flex flex-col gap-2">
                <label htmlFor="title">Título:</label>
                <input onChange={handleChange} value={formData.title} maxLength={50} type="text" name="title" className="mb-5 py-2 px-3 rounded" required />
                <label htmlFor="description">Descrição:</label>
                <textarea onChange={handleChange} value={formData.description} maxLength={200} name="description" className="mb-5 py-2 px-3 rounded resize-none" required />
                <label htmlFor="director">Diretor:</label>
                <input onChange={handleChange} value={formData.director} maxLength={50} type="text" name="director" className="mb-5 py-2 px-3 rounded" required />
                <label htmlFor="rate">Nota: </label>
                <input onChange={handleChange} value={formData.rate} type="number" name="rate" step="0.1" max={10} min={0} className="mb-5 py-2 px-3 rounded" required />
                <div className="w-full flex flex-row justify-between mt-2 text-lg font-semibold">
                    <button className="w-[48%] bg-gray-300 py-3 rounded-lg hover:bg-gray-200 transition" onClick={handleCancel}>Cancelar</button>
                    <button className="w-[48%] bg-gray-600 text-white py-3 rounded-lg hover:bg-slate-500 transition" type="submit">Adicionar</button>
                </div>
            </form>
        </section>
    )
}

export default FormEdit