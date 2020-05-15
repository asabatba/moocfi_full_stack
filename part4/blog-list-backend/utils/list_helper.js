


const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 0) return null

    const fav = blogs.reduce((most, blog) => blog.likes > most.likes ? blog : most, { likes: -1 })

    return { title: fav.title, author: fav.author, likes: fav.likes }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
