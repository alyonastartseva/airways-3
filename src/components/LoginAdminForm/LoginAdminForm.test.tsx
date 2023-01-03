import '@testing-library/jest-dom'
import {render, screen, cleanup, fireEvent} from '@testing-library/react'
import {expect, describe, afterEach, beforeEach, vi} from 'vitest'
import {LoginAdminForm} from '@components/LoginAdminForm'
import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()
beforeEach(() => {
    render(
        <QueryClientProvider client={queryClient}>
            <LoginAdminForm/>
        </QueryClientProvider>
    )
})
afterEach(() => {
    vi.restoreAllMocks()
    cleanup()
})

describe('Admin login form', () => {
    it('Test render component', async () => {
        expect(screen.getByTestId('modal-open')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('modal-open'))
        const modal = screen.getByTestId('modal')
        const closeButton = screen.getByTestId('modal-close')
        expect(modal).toBeInTheDocument()
        fireEvent.click(closeButton)
        expect(screen.getByTestId('modal-open')).toBeInTheDocument()
    })

    it('Test query login', async () => {
        vi.mock('react-query', async () => {
            const actual = await vi.importActual(
                '/node_modules/react-query/lib/index.js'
            )
            const testData = [
                {
                    accessToken:
                        'string',
                    refreshToken:
                        'string',
                    type: 'Bearer',
                },
            ]
            return {
                ...(actual as Object),
                useQuery: vi.fn().mockReturnValue({data: testData}),
            }
        })
    })
})
