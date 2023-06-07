const LOCAL_STORAGE_MOVIE = "@omdbapi-request/data"
const OMDB_API_KEY = "1521a362"

const InfoData = (data) =>{
    const titleElem = document.getElementById("title")
    const yearElem = document.getElementById("year")
    const runtimeElem = document.getElementById("runtime")
    const genreElem = document.getElementById("genre")
    const directorElem = document.getElementById("director")
    const plotElem = document.getElementById("plot")
    const awardsElem = document.getElementById("awards")
    const posterElem = document.getElementById("poster")

    titleElem.innerHTML = data.Title
    yearElem.innerHTML = data.Year
    runtimeElem.innerHTML = data.Runtime
    genreElem.innerHTML = data.Genre
    directorElem.innerHTML = data.Director
    plotElem.innerHTML = data.Plot
    awardsElem.innerHTML = data.Awards
    posterElem.src = data.Poster

    const mensageError = document.getElementById("msg-error")
    mensageError.classList.add ("error-hidden")

    
}


const pesquisar = async () =>{
    try{
        const movieinput = document.getElementById("input-movie")
        const moviename = movieinput.value

        const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${moviename}`)
        const data = await response.json()

        if (!!data.Error){
            throw new Error(data.Error)
        }

        localStorage.setItem(LOCAL_STORAGE_MOVIE, JSON.stringify(data))
        InfoData(data)

    }catch (err)
    {
        const mensageError = document.getElementById("msg-error")
        mensageError.classList.remove ("error-hidden")
        localStorage.removeItem(LOCAL_STORAGE_MOVIE)
    }
}

const retriveLocalCache = () => {

    const dataStr = localStorage.getItem(LOCAL_STORAGE_MOVIE) 
    const dado = JSON.parse(dataStr)
    InfoData(dado)
}

retriveLocalCache()