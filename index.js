const express = require('express')
const router = require('./src/router')
const app = express()
const port = 3000

app.use(express.json())

app.use('/', router)
app.post('/', router)
app.delete('/id', router)
app.put('/id', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})