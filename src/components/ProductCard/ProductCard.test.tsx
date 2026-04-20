import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductCard } from './ProductCard'
import { mockProduct, mockOutOfStockProduct } from '../../data/products'

/**
 * Exercício 1 — ProductCard
 *
 * Nível de dificuldade: Intermediário (scaffolding parcial)
 * O render() já está feito em alguns casos. Você escreve as queries e assertions.
 *
 * Conceitos praticados:
 *  - screen.getByRole / screen.getByText
 *  - toBeInTheDocument()
 *  - Assertions negativas (.not.)
 *  - userEvent.click()
 *  - toHaveBeenCalledWith()
 *  - toBeDisabled()
 */

describe('ProductCard', () => {
  it('renderiza o nome do produto', () => {
    render(<ProductCard product={mockProduct} onAddToCart={jest.fn()} />)
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
  })

  it('renderiza o preço formatado em reais (R$)', () => {
    render(<ProductCard product={mockProduct} onAddToCart={jest.fn()} />)
    expect(screen.getByText(/R\$\s?49,90/)).toBeInTheDocument()
  })

  it('exibe o badge "Esgotado" quando o produto está fora de estoque', () => {
    render(<ProductCard product={mockOutOfStockProduct} onAddToCart={jest.fn()} />)
    expect(screen.getByText(/esgotado/i)).toBeInTheDocument()
  })

  it('não exibe o badge "Esgotado" quando o produto está em estoque', () => {
    render(<ProductCard product={mockProduct} onAddToCart={jest.fn()} />)
    expect(screen.queryByText(/esgotado/i)).not.toBeInTheDocument()
  })

  it('chama onAddToCart com o id correto ao clicar no botão', async () => {
    const onAddToCart = jest.fn()
    const user = userEvent.setup()
    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />)

    const button = screen.getByRole('button', { name: /adicionar/i })
    await user.click(button)

    expect(onAddToCart).toHaveBeenCalledWith(mockProduct.id)
  })

  it('o botão fica desabilitado quando o produto está fora de estoque', () => {
    render(<ProductCard product={mockOutOfStockProduct} onAddToCart={jest.fn()} />)

    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })
})