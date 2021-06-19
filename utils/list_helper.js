/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, { likes }) => sum + likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const favLikes = blogs.map((blog) => blog.likes)
  const maxNumberOfLikes = Math.max(...favLikes)
  const mostBlogLikes = blogs.find((blog) => blog.likes === maxNumberOfLikes)
  if (mostBlogLikes) {
    const { title, author, likes } = mostBlogLikes
    return { title, author, likes }
  } 
  return
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
