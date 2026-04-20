import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CheckoutForm } from './CheckoutForm'

/**
 * Exercício 3 — CheckoutForm
 *
 * Nível de dificuldade: Misto
 * Alguns casos têm o render() ou parte da interação prontos.
 * Outros estão completamente em branco.
 *
 * Conceitos praticados:
 *  - getByLabelText / getByRole
 *  - userEvent.type() para preencher campos
 *  - Validação de formulário (erros)
 *  - toHaveBeenCalledWith() com dados do formulário
 *  - not.toHaveBeenCalled()
 */

describe('CheckoutForm', () => {
  
  const user = userEvent.setup()

  it('renderiza todos os campos do formulário', () => {
    render(<CheckoutForm onSubmit={jest.fn()} />)

    
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cep/i)).toBeInTheDocument()
  })

  it('exibe erro quando o nome está vazio ao tentar submeter', async () => {
    const onSubmit = jest.fn()
    render(<CheckoutForm onSubmit={onSubmit} />)

    const button = screen.getByRole('button', { name: /finalizar/i })
    await user.click(button)

   
    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument()
    })
  })

  it('exibe erro quando o e-mail é inválido', async () => {
    const onSubmit = jest.fn()
    render(<CheckoutForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/nome completo/i), 'João Silva')
    await user.type(screen.getByLabelText(/e-mail/i), 'nao-é-email')
    await user.type(screen.getByLabelText(/cep/i), '12345678')
    
    await user.click(screen.getByRole('button', { name: /finalizar/i }))

    await waitFor(() => {
      expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument()
    })
  })

  it('exibe erro quando o CEP tem menos de 8 dígitos', async () => {
    const onSubmit = jest.fn()
    render(<CheckoutForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/nome completo/i), 'João Silva')
    await user.type(screen.getByLabelText(/e-mail/i), 'joao@email.com')
    await user.type(screen.getByLabelText(/cep/i), '1234')
    
    await user.click(screen.getByRole('button', { name: /finalizar/i }))

    await waitFor(() => {
      expect(screen.getByText(/cep deve ter 8 dígitos/i)).toBeInTheDocument()
    })
  })

  it('chama onSubmit com os dados corretos quando o formulário é válido', async () => {
    const onSubmit = jest.fn()
    render(<CheckoutForm onSubmit={onSubmit} />)

   
    await user.type(screen.getByLabelText(/nome completo/i), 'João Silva')
    await user.type(screen.getByLabelText(/e-mail/i), 'joao@email.com')
    await user.type(screen.getByLabelText(/cep/i), '12345678')
    
    await user.click(screen.getByRole('button', { name: /finalizar/i }))

   
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        nome: 'João Silva',
        email: 'joao@email.com',
        cep: '12345678'
      })
    })
  })

  it('não chama onSubmit quando há erros de validação', async () => {
    const onSubmit = jest.fn()
    render(<CheckoutForm onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: /finalizar/i }))

    
    expect(onSubmit).not.toHaveBeenCalled()
  })
})