import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('renders only author and title of blog initially', () => {
  const blog = {
    title: 'OuJiaBeibi',
    author: 'Kalja Keisari',
    url: 'www.NannaaKakkaa.com',
    likes: 12,
    user: {name:`perkele`, username:`kaalimies`}
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'OuJiaBeibi' && 'Kalja Keisari'
  )
})

test('kun like nappia painetaan kahdesti, niin tapahtumakutsujaa kutsutaan myös kahdesti', async () => {
    const blog = {
        title: 'OuJiaBeibi',
        author: 'Kalja Keisari',
        url: 'www.NannaaKakkaa.com',
        likes: 12,
        user: {name:`perkele`, username:`kaalimies`}
      }
  
    const mockHandler = jest.fn()
  
    const component = render(
      <Blog blog={blog} handleLike={mockHandler} />
    )
  
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })