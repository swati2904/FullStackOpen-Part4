const Blog = require('../models/blog')
const User = require('../models/user')
const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.send(blogs)
})
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  if (blog) response.send(blog)
  else  response.status(404).send({ message:'Id is not available' })
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.find({})
  const userSelected = user[Math.floor(Math.random() * user.length)]

  const blog = new Blog({
    ...body,
    user: userSelected._id
  })
  const result = await blog.save()
  userSelected.blogs = userSelected.blogs.concat(result._id)
  await userSelected.save()
  response.status(201).send(result)

 
})

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  )
  response.status(201).json(updatedBlog)
})

module.exports = blogRouter
