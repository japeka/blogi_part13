import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,screen,cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import blogs from './testblog'
import Blog from './Blog'
import Card from './Card'

describe('<Blog /> component', () => {
  let container = ''
  beforeEach(() => {
    container = render(<Blog blog={blogs[0]} likes={() => {}} remove = {() => {}}/>).container
  })

  test('renders title and author of a blog but not url nor likes (5.13)', () => {

    const titleElement = screen.getByText(/testiblogi/i)
    expect(titleElement).toHaveClass('title')
    expect(titleElement).toBeInTheDocument()

    const authorElement = screen.getByText(/arik300/i)
    expect(authorElement).toHaveClass('author')
    expect(authorElement).toBeInTheDocument()

    const url = container.querySelector('.url')
    const likes = container.querySelector('.likes')
    expect(url).not.toBeInTheDocument()
    expect(likes).not.toBeInTheDocument()

  })

  test('renders url and likes when a view button is clicked (5.14)', async () => {

    const user = userEvent.setup()
    await user.click(screen.getByText('view'))

    const likes = container.querySelector('.likes')
    const url = container.querySelector('.url')

    expect(likes).toBeInTheDocument()
    expect(url).toBeInTheDocument()

  })

  test('registers 2 handler calls when likes button clicked twice (5.15)', async () => {
    const likes = jest.fn()
    const remove = jest.fn()

    render(<Card blog={blogs[0]} likes={likes} remove = {remove}/>)
    const likesButton = screen.getByText('likes')
    expect(likesButton).toBeInTheDocument()
    expect(likesButton).toHaveTextContent('likes')
    expect(likesButton).toHaveClass('bg-blue-400')

    const user = userEvent.setup()
    await user.click(likesButton)
    await user.click(likesButton)
    expect(likes.mock.calls).toHaveLength(2)

  })

  afterEach(() => {
    cleanup()
  })
})