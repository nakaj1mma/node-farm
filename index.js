//
//----------------MODULES----------------
//

// Core modules
const http = require('http')
const url = require('url')
const fs = require('fs')

// Library modules
const slugify = require('slugify')

// Custom modules
const replaceTemplate = require('./modules/replaceTemplate')
const sendNotFoundPage = require('./modules/sendNotFoundPage')

//
//----------------SERVER----------------
//

// Server configuration
const hostname = '127.0.0.1'
const port = 8000

// HTML templates
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

// Data from API
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
// Parsing JSON data
const dataObj = JSON.parse(data)

// Custom slugs
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }))

// Creating the HTTP server
const server = http.createServer((req, res) => {
  // Url parsing
  const { query, pathname } = url.parse(req.url, true)

  // Pages
  switch (pathname) {
    // Overview page
    case '/':
    case '/overview':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      })
      const cardsHtml = dataObj
        .map((el, index) => {
          const productSlug = slugs[index]
          const modifiedCard = replaceTemplate(tempCard, el)
          return modifiedCard.replace('{%PRODUCT_SLUG%}', productSlug)
        })
        .join('')

      const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

      res.end(output)
      break

    // Product page
    case '/product':
      const { item } = query
      const productIndex = slugs.indexOf(item)
      const product = dataObj[productIndex]
      if (!item || !product) {
        return sendNotFoundPage(res, 'Product is not found', tempNotFound, 404)
      }
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      })
      const outputProduct = replaceTemplate(tempProduct, product)
      res.end(outputProduct)
      break

    // API
    case '/api':
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(data)
      break

    // 404 image
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

    // 404 page
    default:
      sendNotFoundPage(res, 'Page is not found', tempNotFound, 404)
  }
})

// Starting the server and listening on the specified port
server.listen(port, hostname, () => {
  console.log(`Server has been started at the http://${hostname}:${port}`)
})
