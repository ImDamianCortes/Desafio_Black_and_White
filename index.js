//   NOTA
//   Paso 1 : al importar proyecto, como primer paso se deben instalar las dependencias a traves de la consola
//   npm install
//   Paso 2 : iniciar archivo mediante CLI
//   node index.js acceso -k=123

//Importando paquetes en constantes
const http = require('http')
const url = require('url')
const fs = require('fs')
const yargs = require('yargs')
const Jimp = require('jimp')

const pass = 123
const port = 3000

const argv = yargs
    .command(
        // Paso 3 
        'acceso',
        // Paso 4
        'Acceso a desafio',
        {
            // Paso 6
            key: {
                describe: 'Key',
                demand: true,
                alias: 'k',
            },
        },
        (args) => {
            // Paso 7
            args.key == pass
                ? // Funcionalidad
                http
                    .createServer((req, res) => {
                        if (req.url == '/') {
                            //console.log(req.url)
                            res.writeHead(200, { 'Content-Type': 'text/html' })
                            fs.readFile('index.html', 'utf8', (err, html) => {
                                res.end(html)
                            })
                        }
                        if (req.url == '/style') {
                            //console.log(req.url)
                            res.writeHead(200, { 'Content-Type': 'text/css' })
                            fs.readFile('public/css/style.css', (err, css) => {
                                res.end(css)
                            })
                        }
                        //procesamineto de imagen
                        if (req.url.includes('/cargar')) {
                            //fs.readFile(imagen)

                            const params = url.parse(req.url, true).query
                            const urlImg = params.imagen

                            console.log(urlImg)

                            Jimp.read(`${urlImg}`, (err, imagen) => {
                                imagen
                                    .resize(350, Jimp.AUTO)
                                    .quality(60)
                                    .greyscale()
                                    .writeAsync('public/img/newImg.jpg') // save
                                    .then(() => {
                                        fs.readFile('public/img/newImg.jpg', (err, Imagen) => {
                                            res.writeHead(200, { 'Content-Type': 'image/jpeg' })
                                            res.end(Imagen)
                                        })
                                    })
                            })
                        }
                    })
                    .listen(`${port}`, () => console.log(`Servidor encendido. http://localhost:${port}`))
                : // Paso 9
                console.log('Key incorrecta')
        }
    )
    .help().argv




