
function getMusica() {
    const artista = document.querySelector('.artista').value.trim()
    const musica = document.querySelector('.musica').value.trim()

    const url = ` https://api.vagalume.com.br/search.php?art=${artista}&mus=${musica}&apikey={key}`
    const urlImg = `https://api.vagalume.com.br/search.php?art=${artista}&extra=artpic&nolyrics=1&apikey={key}`

    fetch(url)
        .then(response => response.json())
        .then(response => {
            if (response.type != 'exact') {
                document.querySelector('.conteiner h2').innerHTML = 'Letra não encontrada'
                document.querySelector('.capa').style.display = 'none'
                document.querySelector('.pt p').innerHTML = ''
                document.querySelector('.en p').innerHTML = ''
                return
            }
            const textoPt = response.mus[0].translate[0].text.replace(/(\r\n|\r|\n)/g, '<br>')
            const textoEn = response.mus[0].text.replace(/(\r\n|\r|\n)/g, '<br>')

            document.querySelector('.pt p').innerHTML = textoPt
            document.querySelector('.en p').innerHTML = textoEn
            document.querySelector('.conteiner h2').innerHTML = `${response.art.name} : ${response.mus[0].name}`

            fetch(urlImg)
                .then(response => response.json())
                .then(response => {
                    document.querySelector('.capa').style.display = 'flex'
                    document.querySelector('.capa img').src = response.art.pic_medium
                })
        })
}

const artista = document.querySelector('.artista')
const musica = document.querySelector('.musica')


artista.addEventListener('keyup', getMusica)
musica.addEventListener('keyup', getMusica)