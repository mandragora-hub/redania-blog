/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react'

import NotFound from '../pages/404'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('NotFound', () => {
  it('renders a 404 heading', () => {
    useRouter.mockImplementationOnce(() => ({
      query: { 404: 'not-found' },
    }))
    const { container } = render(<NotFound />)

    const heading = screen.getByRole('heading', {
      name: /404/i,
    })

    expect(heading).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})
