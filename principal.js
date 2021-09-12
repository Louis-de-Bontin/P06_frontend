let nbOfPages = 17171;
let movies = [];
let linkBestMovie = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="

fetch(linkBestMovie)
    .then(response => response.json())
    .then(response => {
        let linkAllData = response.results[0].url;
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

    // L’image de la pochette du film
    // Le Titre du film
    // Le genre complet du film
    // Sa date de sortie
    // Son Rated
    // Son score Imdb
    // Son réalisateur
    // La liste des acteurs
    // Sa durée
    // Le pays d’origine
    // Le résultat au Box Office
    // Le résumé du film

// fetch (link)
//     .then(response => response.json())
//     .then(response => {
//         var div = document.getElementById("top");
//         for (let result of response.results){
//             let content = `<h3> ${result.title} </h3>
//             toto`
//             div.innerHTML += content;
//         }
//     })
//     // .then(console.log(movies))

// fetch (link2)
//     .then(response => response.json())
//     .then(response => {
//         for (let result of response.results){
//             movies.push(result)
//         }
//     })
//     .then(console.log(movies))



// Questions à poser :
// -Comment récupérer plus de 5 éléments
// -Comment manipuler l'objet en js
// -Ca me fait 2 tableaux de 5, je comprends pas...