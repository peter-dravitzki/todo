const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./posts')

// Prevent Jest from timing out (5s often isn't enough)
jest.setTimeout(10000)

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getAllPosts', () => {
  it('gets all blog posts', () => {
    return db.getAllPosts(testDb)
      .then((posts) => {
        expect(posts).toHaveLength(2)
        return null
      })
  })
})

describe('getPostsByGardenId', () => {
  it('return all of the posts related to the garden id', () => {
    return db.getPostsByGardenId(1, testDb)
      .then((posts) => {
        expect(posts).toHaveLength(2)
        return null
      })
  })
})

describe('getPostById', () => {
  it('returns the correct Post', () => {
    return db.getPostById(1, testDb)
      .then(post => {
        expect(post.id).toBe(1)
        expect(post.gardenId).toBe(1)
        expect(post.author).toBe(2)
        expect(post.title).toMatch('Lettuce Picking Season')
        return null
      })
  })
  it('returns the correct name of the author', () => {
    return db.getPostById(1, testDb)
      .then(post => {
        expect(post.firstName).toMatch('User')
        expect(post.lastName).toMatch('second')
        return null
      })
  })
})

describe('addBlogPost', () => {
  it('adds the new blog post to the db', () => {
    const newPost = {
      gardenId: 7,
      author: 1,
      title: 'Testing the tests',
      createdOn: '30/11/2021',
      content: 'This is just a test'
    }
    return db.addBlogPost(newPost, testDb)
      .then(([id]) => {
        return db.getPostById(id, testDb)
      })
      .then((post) => {
        expect(post.id).toBe(3)
        expect(post.gardenId).toBe(7)
        expect(post.author).toBe(1)
        expect(post.title).toMatch('Testing the tests')
        return null
      })
  })
})

// Deletes post in testDb and then checks all posts to see if post exists
describe('deleteBlogPost', () => {
  it('deletes the blog post from the db by id', () => {
    return db.deleteBlogPost(1, testDb)
      .then(() => {
        return db.getAllPosts(testDb)
      })
      .then(posts => {
        const filtered = posts.filter(element => element.id === 1)
        expect(filtered).toEqual([])
        return null
      })
  })

  it('removes all of the comments on the blog post from the comments table', () => {
    // Do it
  })
})
