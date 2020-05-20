
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

const testBlog = { title: 'demo blog post', url: 'http://example.com', author: 'unknown', likes: 10 }

describe('post api blogs endpoint', () => {

    test('reponse is created and json', async () => {

        await api.post('/api/blogs')
            .send(testBlog)
            .expect(201)
            .expect('Content-Type', /json/)

    })

    test('verify blog count increases', async () => {

        const get1 = await api.get('/api/blogs')
        const initialLength = get1.body.length;

        await api.post('/api/blogs').send(testBlog)
        const getResponse = await api.get('/api/blogs')
        expect(getResponse.body)
            .toHaveLength(initialLength + 1)

    })

    test('verify new blog is added', async () => {

        const postResponse = await api.post('/api/blogs').send(testBlog)
        const id = postResponse.body.id;

        const getResponse = await api.get('/api/blogs')
        expect(getResponse.body.map(b => b.id))
            .toContain(id)

    })

    test('verify new blog likes are zero if undefined', async () => {

        const postResponse = await api.post('/api/blogs').send({ title: 'demo blog post', url: 'http://example.com', author: 'unknown' })
        expect(postResponse.body.likes).toBe(0)

    })

    test('verify request fails if title and url missing', async () => {

        await api.post('/api/blogs', { author: 'unknown' })
            .expect(400)

    })

})

describe('try to delete a blog post', () => {

    test('with a known id', async () => {
        await api.delete('/api/blogs/' + blogs[0]._id)
            .expect(204);
    })

    test('with an invalid id', async () => {

        await api.delete('/api/blogs/abcdef12345')
            .expect(400);
    })

    test('that does not exist', async () => {

        await api.delete('/api/blogs/5a422ba71b54a616234d11fb')
            .expect(404);
    })

    test('and check that the total amount decreases', async () => {

        const count = (await api.get('/api/blogs')).body.length;
        await api.delete('/api/blogs/' + blogs[0]._id);
        const b2 = (await api.get('/api/blogs')).body;
        expect(b2).toHaveLength(count - 1);
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