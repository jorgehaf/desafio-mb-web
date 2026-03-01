const express = require('express')
const path = require('path')
const registrationRouter = require('./routes/registration')

const app = express()
const PORT = process.env.PORT || 3001
const isDev = process.env.NODE_ENV !== 'production'
const DIST_DIR = path.resolve(__dirname, '../dist')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API de cadastro
app.use('/registration', registrationRouter)

// Em produção, serve os assets do build do Vite
if (!isDev) {
  app.use(express.static(DIST_DIR))

  // Qualquer rota não coberta pela API devolve o index.html (SPA)
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'))
  })
}

app.listen(PORT, () => {
  const mode = isDev ? 'development' : 'production'
  console.log(`Server (${mode}) running on http://localhost:${PORT}`)
  if (isDev) {
    console.log('Client (Vite) expected at http://localhost:3000')
  }
})
