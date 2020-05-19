
const app = require('../app');
const blogs = require('./test_helper').blogs;
const Blog = require('../models/blog');
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')

describe('get api blogs endpoint', () => {

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

    test('verify that first blog contain id', async () => {

        const response = await api.get('/api/blogs')
        expect(response.body[0].id)
            .toBeDefined()
    })

})

describe('post api blogs endpoint', () => {

    test('reponse is created and json', async () => {

        await api.post('/api/blogs', blogs[0])
            .expect(201)
            .expect('Content-Type', /json/)
    })

    test('verify blog count increases', async () => {

        const get1 = await api.get('/api/blogs')
        const initialLength = get1.body.length;

        await api.post('/api/blogs', blogs[0])
        const getResponse = await api.get('/api/blogs')
        expect(getResponse.body)
            .toHaveLength(initialLength + 1)
    })

    test('verify new blog is added', async () => {

        const postResponse = await api.post('/api/blogs', blogs[0])
        const id = postResponse.body.id;

        const getResponse = await api.get('/api/blogs')
        expect(getResponse.body.map(b => b.id))
            .toContain(id)
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