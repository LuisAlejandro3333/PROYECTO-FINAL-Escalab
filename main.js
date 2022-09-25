const api_url_trending = `https://api.giphy.com/v1/gifs/trending?api_key=d0enPboUaYVoSYhIjpuFSZWPlwNX0VMg`;
const api_url_search = `https://api.giphy.com/v1/gifs/search`;
let buscar = "?q=";
const apikey = `&api_key=d0enPboUaYVoSYhIjpuFSZWPlwNX0VMg`;

let q = "";
urlCompleta = "";
let pagina = 1;

let observador = new IntersectionObserver((entradas, observador) => {
    entradas.forEach(entradas => {
        if (entradas.isIntersecting) {
            pagina++;
            traerDestacados();
        }
    })
}, {
    rootMargin: '0px 0px 50px 0px',
    threshold: 1.0
})

const traerDestacados = async() => {
    await fetch(api_url_trending).then((Response) => {
        return Response.json();
    }).then((giphy) => {
        console.log(giphy);

        for (let i = 0; i < giphy.data.length; i++) {
            const gif = document.createElement("img");
            gif.src = giphy.data[i].images["original"].url;
            document.getElementById("galeria").appendChild(gif);
        }
    })
    const gifsEnPantalla = document.querySelectorAll('#galeria img');
    let ultimoGif = gifsEnPantalla[gifsEnPantalla.length - 1];
    observador.observe(ultimoGif);
}
traerDestacados();

const boton = document.getElementById("boton");
boton.onclick = () => {
    document.getElementById('galeria').innerHTML = "";
    q = document.getElementById('search').value;
    urlCompleta = api_url_search + buscar + q + apikey;
    getData();
}

boton.onclick = () => {
    searchValue();
}



let observador1 = new IntersectionObserver((entradas, observador) => {
    entradas.forEach(entradas => {
        if (entradas.isIntersecting) {
            pagina++;
            getData();
        }
    })
}, {
    rootMargin: '0px 0px 100px 0px',
    threshold: 1.0
})



const getData = async() => {
    try {
        await fetch(urlCompleta).then((response) => {
            return response.json();
        }).then((giphy) => {
            console.log(giphy);

            for (let i = 0; i < giphy.data.length; i++) {
                const gif = document.createElement("img");
                gif.src = giphy.data[i].images["original"].url;
                document.getElementById("galeria").appendChild(gif);
            }
        })
        const gifsEnPantalla = document.querySelectorAll('#galeria img')
        let ultimoGif = gifsEnPantalla[gifsEnPantalla.length - 1];
        observador.observe(ultimoGif);
        
    } catch (e) {
        document.getElementById('galeria').innerHTML = "<b style='color:red'>Su busqueda no ha arrojado un resultado</b>";
    }
}


const enviarValor = (search) => {
    document.getElementById('search2').value = search;
    searchValue();
}

const searchValue = () => {
    document.getElementById('galeria').innerHTML = "";
    q = document.getElementById('search').value;
    
    if (q == "") {
        q = document.getElementById('search2').value;
        document.getElementById('search').value = '';
    }
    urlCompleta = api_url_search + buscar + q + apikey
    getData();
}
