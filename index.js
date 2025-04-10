//MODULES
const http = require('http')
const url = require('url')
const fs = require('fs')

//SERVER
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)
  output = output.replace(/{%FROM%}/g, product.from)
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  output = output.replace(/{%ID%}/g, product.id)

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
  }
  return output
}

const hostname = '127.0.0.1'
const port = 8000

const tempNotFound = fs.readFileSync(
  `${__dirname}/templates/template-404.html`,
  'utf-8'
)

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
  const { query, pathname } = url.parse(req.url, true)

  switch (pathname) {
    //Overview page
    case '/':
    case '/overview':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      })
      const cardsHtml = dataObj
        .map((el) => replaceTemplate(tempCard, el))
        .join('')

      const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

      res.end(output)
      break

    //Product page
    case '/product':
      const { id } = query
      const product = dataObj[id]
      if (!id || !product) {
        res.writeHead(404, {
          'Content-Type': 'text/html; charset=utf-8',
        })
        let notFoundOutput = tempNotFound.replace(
          /{%PRODUCTNAME%}/g,
          'Product is not found'
        )
        notFoundOutput = notFoundOutput.replace(/{%IMAGE%}/g, '⚠️')
        return res.end(notFoundOutput)
      }
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      })
      const outputProduct = replaceTemplate(tempProduct, product)
      res.end(outputProduct)
      break

    //API
    case '/api':
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(data)
      break

    case '/images/404-error-illustration.png':
      fs.readFile(
        `${__dirname}/images/404-error-illustration.png`,
        (err, data) => {
          if (err) {
            res.writeHead(404)
            res.end('Image not found')
          } else {
            res.writeHead(200, { 'Content-Type': 'image/png' })
            res.end(data)
          }
        }
      )
      break

    //404 page
    default:
      res.writeHead(404, {
        'Content-Type': 'text/html; charset=utf-8',
      })
      let notFoundOutput = tempNotFound.replace(
        /{%PRODUCTNAME%}/g,
        'Page is not found'
      )
      notFoundOutput = notFoundOutput.replace(/{%IMAGE%}/g, '⚠️')
      res.end(notFoundOutput)
  }
})

server.listen(port, hostname, () => {
  console.log(`Server has been started at the http://${hostname}:${port}`)
})
