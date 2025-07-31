const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  
  return blogs.reduce((favorite, current) => {
    return (current.likes > (favorite?.likes || 0)) 
      ? { title: current.title, author: current.author, likes: current.likes }
      : favorite
  }, {})
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  
  const authorCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})
  
  const topAuthor = Object.entries(authorCounts).reduce((top, [author, count]) => {
    return count > (top?.blogs || 0) 
      ? { author, blogs: count }
      : top
  }, {})
  
  return topAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  
  const likeCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + blog.likes
    return counts
  }, {})
  
  const topAuthor = Object.entries(likeCounts).reduce((top, [author, likes]) => {
    return likes > (top?.likes || 0)
      ? { author, likes }
      : top
  }, {})
  
  return topAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
