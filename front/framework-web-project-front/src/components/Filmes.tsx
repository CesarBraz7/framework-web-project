import axios from 'axios'
import { FilmesType } from '../types/types'
import { Link } from 'react-router-dom'

function Filmes({ filmes }: FilmesType) {
    const handleDelete = async (id: number | undefined) => {
        try {
            await axios.delete(`http://localhost:1302/filmes/${id}`)
            location.reload()
        } catch (error: any) {
            console.log(error.message)
        }
    }
    return (
        <main className='mt-10 flex flex-col items-center gap-10'>
            <Link to="/add">
                <button className="bg-gray-800 text-white text-2xl font-semibold rounded-xl shadow-md px-7 py-3 hover:bg-gray-700 transition">Adicionar filme</button>
            </Link>
            <section className="bg-gray-400 mx-10 rounded-xl px-10 py-5">
                {filmes.length > 0 ?
                    filmes.map(filme => (
                        <section className="flex flex-row items-center justify-between py-4 gap-20" key={filme.id}>
                            <h1 className="w-[25%] text-4xl font-semibold">{filme.title}</h1>
                            <div className="w-[60%]">
                                <span>{filme.description}</span>
                            </div>
                            <div className="w-[10%] flex flex-col text-center">
                                <span className="text-lg font-semibold">{filme.director}</span>
                                <span className="font-bold">{filme.rate}</span>
                            </div>
                            <div className="w-[7%] flex flex-col items-center gap-3">
                                <Link className='w-full' to={`/edit/${filme.id}`}><button className="bg-gray-300 rounded w-full py-1 hover:bg-gray-200 transition">Editar</button></Link>
                                <button className="bg-gray-600 rounded w-full py-1 hover:bg-gray-500 transition text-white" onClick={() => handleDelete(filme.id)}>Apagar</button>
                            </div>
                        </section>
                    ))
                    : 'Não há filmes registrados'
                }
            </section>
        </main>
    )
}

export default Filmes