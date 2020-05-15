
var _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 0) return undefined

    const fav = blogs.reduce((most, blog) => blog.likes > most.likes ? blog : most, { likes: -1 })

    return { title: fav.title, author: fav.author, likes: fav.likes }
}

const mostBlogs = (blogs) => {
    const blogsByAuthor = _.groupBy(blogs, (b) => b.author)

    const b2 = _.map(blogsByAuthor, (v, k) => ({ author: k, count: v.length }))
    const top = _.maxBy(b2, b => b.count)

    return top;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
