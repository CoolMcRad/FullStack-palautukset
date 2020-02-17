const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('correct amount of JSON type blogs returned', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(8)
  })

test('blogs defined by id', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
  })

  test('blogscanbeadded', async () => {
    const newBlog = {
      title: 'Eeeeei',
      author: `Kalja Keisari`,
      url: `www.Miksii1-2.com`,
      likes: 15,
      userId: "5e4a9ff6a7e9b333d09dfc29",
    }

    const initialState = await api.get('/api/blogs')
    const initialAmount = initialState.body.length
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ 'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkthbGphIEtlaXNhcmkiLCJpZCI6IjVlNGE5ZmY2YTdlOWIzMzNkMDlkZmMyOSIsImlhdCI6MTU4MTk1MzY5NH0.Eqofx62DGY0oU-j4z8mz5om0bEetAoMgvM4LZ-bwSr0', 'Content-Type': 'application/json' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(b => b.author)
  
    expect(response.body.length).toBe(initialAmount + 1)
    expect(contents).toContain('Kalja Keisari')
  })

  test('blogs without likes can be added', async () => {
    const newBlog = {
      title: 'Hihi olen paras ja kaikki tykkää jee',
      author: `Mikki Hiiri`,
      url: `www.Luota_itseesi_hihhihi.com`,
      userId: "5e4a9ff6a7e9b333d09dfc29",
    }

    const initialState = await api.get('/api/blogs')
    const initialAmount = initialState.body.length
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ 'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkthbGphIEtlaXNhcmkiLCJpZCI6IjVlNGE5ZmY2YTdlOWIzMzNkMDlkZmMyOSIsImlhdCI6MTU4MTk1MzY5NH0.Eqofx62DGY0oU-j4z8mz5om0bEetAoMgvM4LZ-bwSr0', 'Content-Type': 'application/json' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(b => b.author)
  
    expect(response.body.length).toBe(initialAmount + 1)
    expect(contents).toContain('Mikki Hiiri')
  })

  test('blog without title and url wont be added', async () => {
    const newblog = {
      author: `EnHal UaListalle`,
      likes: 5,
    }

    const initialState = await api.get('/api/blogs')
    const initialAmount = initialState.body.length
  
    await api
      .post('/api/blogs')
      .send(newblog)
      .set({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkthbGphIEtlaXNhcmkiLCJpZCI6IjVlNGE5ZmY2YTdlOWIzMzNkMDlkZmMyOSIsImlhdCI6MTU4MTk1MzY5NH0.Eqofx62DGY0oU-j4z8mz5om0bEetAoMgvM4LZ-bwSr0' })
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(initialAmount)
  })
  
  afterAll(() => {
    mongoose.connection.close()
  })