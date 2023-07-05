const dummy = () => {
    return 1
}

const totalLikes = blogs => {
    return blogs.length === 0 
        ? 0
        : blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = blogs => {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))

    const blog = blogs.find(blog => blog.likes === maxLikes)
    delete blog._id
    delete blog.__v
    delete blog.url

    return blog
}

const mostBlogs = blogs => {
    if (blogs.length === 0)
        return null

    let  authors = []

    blogs.map(blog => {
        if (!authors.some(a => a.author === blog.author))
            authors = [...authors, {author: blog.author, blogs: 0}]
    })

    blogs.map(blog => {
        authors.find((author, i) => {
            if (author.author === blog.author)
                authors[i].blogs++
        })
    })

    const max = Math.max(...authors.map(a => a.blogs))
    const allMaxs = authors.filter(author => author.blogs === max)

    if (allMaxs.length > 1) {
        return {
            authors: allMaxs.map(a => a.author),
            blogs: max
        }
    }

    return {
        author: allMaxs[0].author,
        blogs: max
    }
}

const mostLikes = blogs => {
    const max = Math.max(...blogs.map(blog => blog.likes))

    const authors = blogs.filter(blog => blog.likes === max)

    if (authors.length > 1) 
        return {
            authors: authors.map(a => a.author),
            likes: max
        }
    return {
        author: authors[0].author,
        likes: max
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}