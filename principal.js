let linkBestMovie = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=";

let linkBestMovies = "http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre=&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&rating=&rating_contains=&sort_by=-imdb_score&title=&title_contains=&writer=&writer_contains=&year=&page="
let linkBestThriller = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=thriller&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=&page=";
let linkBestHistory = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=history&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=&page=";
let linkBestScifi = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=sci-fi&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=&page=";

let links = new Map();
links.set(linkBestMovies, "group_best");
links.set(linkBestThriller, "group_thriller");
links.set(linkBestHistory, "group_history");
links.set(linkBestScifi, "group_scifi");

async function modalMaker(clickedId){
    await fetch("http://localhost:8000/api/v1/titles/" + clickedId)
        .then(response => response.json())
        .then(response => {
            let modal = document.getElementById("modal");
            let modal_content = `
            <div id="modal_content">
                <span id="close">&times;</span>
                <h3>${response.title}</h3>
                <h4>Genres : ${response.genres}</h4>
                <h4>Année de sortie : ${response.year}</h4>
                <h4>Score du publique : ${response.votes}</h4>
                <h4>Score imdb : ${response.imdb_score}</h4>
                <h4>Réalisateur : ${response.directors}</h4>
                <h4>Acteurs : ${response.actors}</h4>
                <h4>Durée : ${response.duration}min</h4>
                <h4>Pays d'origine : ${response.countries}</h4>
                <h4>Box office : ${response.usa_gross_income}$</h4>
                <h4>Résumé : ${response.description}</h4>
            </div>
            `;
            modal.innerHTML = modal_content;
            modal.style.display = "block";

            let span = document.getElementById("close");
            span.onclick = function(){
                modal.style.display = "none";
            }
            window.onclick = function(event){
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        })
}

// Fonction async qui récupère 7 films
async function fetch7Movies(link){
    let movies = [];
    let link1 = link + "1";
    let link2 = link + "2";

    // Le link1 va chercher tous les films (5) de la page 1
    await fetch(link1)
        .then(response => response.json())
        .then(response => {
            for (let result of response.results){
                movies.push(result);
            }
        })
        .then(
            // Le link2 va chercher tous les films (5) de la page 2
            await fetch(link2)
                .then(response => response.json())
                .then(response => {
                    for (let result of response.results){
                        movies.push(result);
                    }
                    let i = 0;
                    // Je retire les 3 derniers afin qu'il n'en reste que 7
                    while (i < 3) {
                        movies.pop();
                        i ++;
                    }
                    
                })
        )
    return movies;
}

// J'itère mon objet Map pour avoir accès aux liens et aux id
for (const [link, elementId] of links.entries()){
    fetch7Movies(link)
        // Après avoir récupéré mes 7 films :
        .then(movies => {            
            let carousselsContainers = document.getElementById(elementId);
            for (let movie of movies) {
                let content = `
                <div class="caroussel_square" onClick="modalMaker(this.id) "id="${movie.id}">
                    <img class="movie_cover" src="${movie.image_url}">
                    <h5>${movie.title}</h5>
                </div>
                `;
                carousselsContainers.innerHTML += content;
            }
        })
}

fetch(linkBestMovie)
    .then(response => response.json())
    .then(response => {
        let data = response.results;
        let linkAllData = data[0].url;

        fetch(linkAllData)
            .then(response => response.json())
            .then(response => {
                let dataBestMovie = response;
                var divBestMovieInfos = document.getElementById("best_movie_infos");
                var divBestMovieImg = document.getElementById("best_movie_img")

                let contentImg = `<img src="${dataBestMovie.image_url}">`;
                let contentInfos = `
                <h3>${dataBestMovie.title}</h3>
                <h4>Genres : ${dataBestMovie.genres}</h4>
                <h4>Année de sortie : ${dataBestMovie.year}</h4>
                <h4>Score du publique : ${dataBestMovie.votes}</h4>
                <h4>Score imdb : ${dataBestMovie.imdb_score}</h4>
                <h4>Réalisateur : ${dataBestMovie.directors}</h4>
                <h4>Acteurs : ${dataBestMovie.actors}</h4>
                <h4>Durée : ${dataBestMovie.duration}min</h4>
                <h4>Pays d'origine : ${dataBestMovie.countries}</h4>
                <h4>Box office : ${dataBestMovie.usa_gross_income}$</h4>
                <h4>Résumé : ${dataBestMovie.description}</h4>
                `
                divBestMovieImg.innerHTML = contentImg;
                divBestMovieInfos.innerHTML = contentInfos;
            })
    })

