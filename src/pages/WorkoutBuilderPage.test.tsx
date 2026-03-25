import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { WorkoutBuilderPage } from './WorkoutBuilderPage'

describe('WorkoutBuilderPage', () => {
  it('cria um treino novo pelo modal', async () => {
    const user = userEvent.setup()
    render(<WorkoutBuilderPage />)

    await user.click(screen.getByRole('button', { name: /\+ novo treino/i }))
    await user.type(screen.getByLabelText(/nome do treino/i), 'Treino D')
    await user.click(screen.getByRole('button', { name: /criar treino/i }))

    expect(screen.getAllByText('Treino D').length).toBeGreaterThanOrEqual(1)
  })
})
