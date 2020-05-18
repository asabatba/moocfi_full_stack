
const app = require('../app');
const blogs = require('./test_helper').blogs;
const Blog = require('../models/blog');
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')

describe('api blogs endpoint', () => {

    test('reponse is ok and json', async () => {

        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /json/)
    })

    test('correct number of blogs', async () => {

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(blogs.length)
    })

    test('one blog contains a specific url', async () => {

        const response = await api.get('/api/blogs')
        expect(response.body.map(b => b.url))
            .toContain('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
    })

})


beforeEach(async () => {

    await Blog.deleteMany({})
    const promises = blogs.map(obj => new Blog(obj))
        .map(blog => blog.save());
    await Promise.all(promises);
})

afterAll(() => {
    mongoose.connection.close()
})