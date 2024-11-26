import axios from "axios"
import Filmes from "./components/Filmes"
import FormAdd from "./components/FormAdd"
import FormEdit from "./components/FormEdit"
import { useEffect, useState } from "react"
import { Filme } from "./types/types"
import { Routes, Route } from "react-router-dom"

function App() {

  const [filmes, setFilmes] = useState<Filme[]>([])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:1302/filmes')
      setFilmes(response.data.films)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Filmes filmes={filmes} />} />
        <Route path="/add" element={<FormAdd />} />
        <Route path="/edit/:id" element={<FormEdit />} />
      </Routes>
    </>
  )
}

export default App
