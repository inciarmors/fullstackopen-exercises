const blogsRouter = require('express').Router()
const { tokenExtractor } = require('../middleware/tokenExtractor')
const { userExtractor } = require('../middleware/userExtractor')
const blogController = require('../controllers/blogs')

blogsRouter.get('/', blogController.getAllBlogs)
blogsRouter.post('/', tokenExtractor, userExtractor, blogController.createBlog)
blogsRouter.delete('/:id', tokenExtractor, userExtractor, blogController.deleteBlog)
blogsRouter.put('/:id', blogController.updateBlog)

module.exports = blogsRouter
