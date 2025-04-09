const http = require('http')
const url = require('url')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 3000

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
)
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
)
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
)
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  const pathName = req.url
  switch (pathName) {
    //Overview page

    case '/':
    case '/overview':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      })
      res.end(tempOverview)
      break

    //Product page
    case '/product':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      })
      res.end('<h1>Продукт</h1>')
      break

    //API

    case '/api':
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(data)
      break

    //404 page
    default:
      res.writeHead(404, {
        'Content-Type': 'text/html; charset=utf-8',
        'my-custom': 'hello-world',
      })
      res.end('<h1>Страница не найдена!</h1>')
  }
})

server.listen(port, hostname, () => {
  console.log(`Server has been started at the http://${hostname}:${port}`)
})
