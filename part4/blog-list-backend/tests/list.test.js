

const blogs = require('./test_helper').blogs;

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('total likes are added', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })

})

describe('favorite blog', () => {

    test('several blogs', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({ title: "Canonical string reduction", author: "Edsger W. Dijkstra", likes: 12, })
    })
    test('empty blog list', () => {
        expect(listHelper.favoriteBlog([])).toEqual(undefined)
    })
})

describe('most blogs', () => {

    test('several blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({ author: "Robert C. Martin", blogs: 3, })
    })
    test('empty blog list', () => {
        expect(listHelper.mostBlogs([])).toEqual(undefined)
    })
})

describe('most likes', () => {

    test('several blogs', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17, })
    })
    test('empty blog list', () => {
        expect(listHelper.mostLikes([])).toEqual(undefined)
    })
})
