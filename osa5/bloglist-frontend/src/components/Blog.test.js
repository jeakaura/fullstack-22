import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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
