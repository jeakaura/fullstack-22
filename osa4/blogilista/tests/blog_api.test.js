const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const bcrypt = require('bcrypt')
const User = require('../models/user')

const helper = require('./test_helper')

const testiBlogit = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(testiBlogit[0])
  await blogObject.save()
  blogObject = new Blog(testiBlogit[1])
  await blogObject.save()
})

describe('jotain blogeja on tallennettuna aluksi', () => {
  test('blogit palautuu json muodossa HTTP GET -pyynnöllä', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('kaikki blogit palautuu', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(testiBlogit.length)
  })

  test('blogeissa on id-kenttä', async () => {
    const response = await api.get('/api/blogs')

    for (let i=0; i < testiBlogit.length; i++) {
      expect(response.body[i].id).toBeDefined()
    }
  })

  test('uuden blogin lisäys onnistuupi', async () => {
    const uusi = {
      title: 'Kissat ovat parhaita',
      author: 'jeakaura',
      url: 'http://localhost:3003/kissat',
      likes: 25,
    }

    await api
      .post('/api/blogs')
      .send(uusi)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(testiBlogit.length + 1)
  })

  test('blogipostauksen poisto', async () => {
    const response = await api.get('/api/blogs')
    const ekanId = response.body[0].id

    await api
    .delete(`/api/blogs/${ekanId}`)
    .expect(204)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  
})

afterAll(() => {
  mongoose.connection.close()
})
