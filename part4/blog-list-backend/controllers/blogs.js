
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

blogsRouter.use('/:id', async (request, response, next) => {

    const id = request.params['id']

    if (!id) {
        return response.status(400).json({ error: 'missing identifier' })
    }
    next()
})

blogsRouter.delete('/:id', async (request, response) => {

    const id = request.params['id']

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

blogsRouter.put('/:id', async (request, response) => {

    const id = request.params['id']

    let newBlog;
    try {
        newBlog = await Blog.findByIdAndUpdate(id, request.body, { new: true })
    } catch (err) {
        return response.status(400).json({ error: 'trouble while updating blog ' + id });
    }
    // console.log(newBlog)
    if (!newBlog)
        return response.status(404).json({ error: 'id not found' })

    return response.json(newBlog);

})

module.exports = blogsRouter
