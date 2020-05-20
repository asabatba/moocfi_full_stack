
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

    if (!request.body.title && !request.body.url) {
        return response.status(400).json({ error: 'both title and url should not be missing' })
    }
    const blog = new Blog(request.body)

    const result = await blog
        .save()

    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {

    const id = request.params['id']

    if (!id) {
        return response.status(400).json({ error: 'missing identifier' })
    }

    let deletedCount;
    try {
        deletedCount = (await Blog.deleteMany({ _id: id })).deletedCount;
    } catch (err) {
        return response.status(400).json({ error: `identifier is not valid ${err.name}` })
    }


    if (deletedCount > 0) {
        return response.status(204).end()
    } else {
        return response.status(404).json({ error: `no blogs found with specified id = "${id}"` })
    }

})

module.exports = blogsRouter
