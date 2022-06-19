import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title & author', () => {
  const blog = {
    title: 'Testi blogiotsikko',
    author: 'Matti Meikäläinen',
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'Testi blogiotsikko' && 'Matti Meikäläinen'
  )
})

test('clicking the button calls event handler once', async () => {
    const blog = {
        title: 'Testi blogiotsikko',
        author: 'Matti Meikäläinen',
        likes: 4,
        url: 'http://localhost:3000',
      }
  
    const mockHandler = jest.fn()
  
    const { container } = render(<Blog blog={blog} toggleVisibility={mockHandler} />)
    container.querySelector('.blog')

    const user = userEvent.setup()
    const button = screen.getByText('Avaa')
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
})

test('clicking like button twice', async () => {
    const blog = {
        title: 'Testi blogiotsikko',
        author: 'Matti Meikäläinen',
        likes: 4,
        url: 'http://localhost:3000',
      }
  
    const mockHandler = jest.fn()
  
    const { container } = render(<Blog blog={blog} toggleVisibility={mockHandler} />)
    container.querySelector('.blog')

    const user = userEvent.setup()
    const avaabutton = screen.getByText('Avaa')
    await user.click(avaabutton)

    const likebutton = screen.getByText('Tykkää')
    await user.click(likebutton)
    await user.click(likebutton)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
})
