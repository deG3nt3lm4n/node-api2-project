// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')
const router = express.Router()

// GET - /api/posts
router.get('/', (req,res) => {

  Posts.find()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({ message: "The posts information could not be retrieved" }))

})

// GET - /api/posts/:id
router.get('/:id', (req,res) => {

  const {id} = req.params

  if(!id){
    res.status(404).json({ message: "The post with the specified ID does not exist" })
  }

  Posts.findById(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({ message: "The post information could not be retrieved" }))

})

// POST - /api/posts
router.post('/', (req,res) => {

  const userInput = req.body

  if(!userInput.title || !userInput.contents){
    res.status(400).json({ message: "Please provide title and contents for the post" })
  }

  Posts.insert(userInput)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => res.status(500).json({ message: "There was an error while saving the post to the database" }))

})

// PUT - /api/posts/:id
router.put('/:id', async (req,res) => {

  const {id} = req.params
  const userInput = req.body

  if(!id){
    res.status(404).json({ message: "The post with the specified ID does not exist" })
  }

  if(!userInput.title || !userInput.contents){
    res.status(400).json({ message: "Please provide title and contents for the post" })
  }

  try {

    const updateData = await Posts.update(id, userInput)

    if(!updateData){
      res.status(500).json({ message: "The post information could not be modified" })
    }else{
      res.status(200).json(updateData)
    }

  } catch (error) {
    res.status(500).json({ message: "The post information could not be modified" })
  }

})

// DELETE - /api/posts/:id
router.delete('/:id', (req, res) => {

  const {id} = req.params

  if(!id){
    res.status(404).json({ message: "The post with the specified ID does not exist" })
  }

  Posts.remove(id)
    .then(() => {
      res.status(200).json({message: 'deleted'})
    })
    .catch(err => res.status(500).json({ message: "The post could not be removed" }))

})

// [GET] /api/posts/:id/comments
router.get('/:id/comments', (req,res) => {

  const {id} = req.params
  if(!id){
    res.status(404).json({ message: "The post with the specified ID does not exist" })
  }

  Posts.findCommentById(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({ message: "The comments information could not be retrieved" }))

})

module.exports = router