import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import blogs from './testblog'

test('<BlogForm /> renders a form with inputs filled in by test, button create is clicked and mockcalls is expected to be 1 and contents being same as initial input values (5.16)', async () => {
  const createBlog = jest.fn()
  let container = render(<BlogForm createBlog={createBlog} />).container

  const title = container.querySelector('.title')
  const author = container.querySelector('.author')
  const url = container.querySelector('.url')
  const createButton = screen.getByText('create')

  expect(title).toBeInTheDocument()
  expect(author).toBeInTheDocument()
  expect(url).toBeInTheDocument()
  expect(createButton).toBeInTheDocument()

  const user = userEvent.setup()
  await user.type(title, blogs[1].title )
  await user.type(author, blogs[1].author )
  await user.type(url, blogs[1].url )
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(blogs[1].title)
  expect(createBlog.mock.calls[0][0].author).toBe(blogs[1].author)
  expect(createBlog.mock.calls[0][0].url).toBe(blogs[1].url)

})

afterEach(() => {
  cleanup()
})
