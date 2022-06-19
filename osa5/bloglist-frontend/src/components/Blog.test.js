import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const handleUusiBlogi = jest.fn()

  render(<BlogForm
    handleUusiBlogi={handleUusiBlogi}
  />)

  const input = screen.getByPlaceholderText('write here blog title')
  const sendButton = screen.getByText('Luo uusi blogi')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})