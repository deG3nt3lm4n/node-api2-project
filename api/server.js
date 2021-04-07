// implement your server here
// require your posts router and connect it here
const express = require('express')
const cors = require('cors')

const postRouter = require('./posts/posts-router')
const server = express()

server.use(express.json())
server.use(cors())

server.use('/api/posts', postRouter)

// Mini little thingy
// server.get('*', (req,res) => {
//   res.send('<h1>What is life?</h1>')
// })

module.exports = server