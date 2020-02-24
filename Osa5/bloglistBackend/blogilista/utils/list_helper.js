const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    blogs.map(b => likes += b.likes)
    return blogs.length === 0 ? 0 : likes
}

const favoriteBlog = (blogs) => {
    let blog = blogs[0]
    blogs.map(b => blog.likes < b.likes ? blog = b : blog = blog)
    return blog
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }
  