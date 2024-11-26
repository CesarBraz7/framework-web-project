export type FilmesType = {
    filmes: Filme[]
}

export type Filme = {
    id?: number,
    title: string,
    description: string,
    director: string,
    rate: number
}