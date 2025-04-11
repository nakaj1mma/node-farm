module.exports = (res, message, template, statusCode) => {
  res.writeHead(statusCode, {
    'Content-Type': 'text/html; charset=utf-8',
  })
  let output = template.replace(/{%PRODUCTNAME%}/g, message)
  output = output.replace(/{%IMAGE%}/g, '⚠️')
  res.end(output)
}
