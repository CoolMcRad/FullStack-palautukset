import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('lomake toimii', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, { 
    target: { value: 'Tes Taaja' } 
  })
  fireEvent.change(title, { 
    target: { value: 'Testauksen testaus' } 
  })
  fireEvent.change(url, { 
    target: { value: 'www.testaatestaamaantestaamalla' } 
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].author).toBe('Tes Taaja' )
  expect(createBlog.mock.calls[0][0].title).toBe('Testauksen testaus' )
  expect(createBlog.mock.calls[0][0].url).toBe('www.testaatestaamaantestaamalla' )
})