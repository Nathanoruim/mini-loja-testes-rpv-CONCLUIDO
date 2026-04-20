import { CartItem as CartItemType } from '../../types'
import { CartItem } from './CartItem'

interface CartProps {
  items: CartItemType[]
  onRemove: (productId: number) => void
}

export function Cart({ items, onRemove }: CartProps) {
  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  const formattedTotal = total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  if (items.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #f0f7ff 100%)',
        borderRadius: '12px',
        border: '2px dashed #0066cc'
      }}>
        <p style={{
          fontSize: '1.2rem',
          color: '#0066cc',
          fontWeight: '500'
        }}>
          Seu carrinho está vazio
        </p>
        <p style={{
          color: '#90caf9',
          marginTop: '0.5rem'
        }}>
          Adicione produtos para começar suas compras!
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 style={{
        fontSize: '1.8rem',
        color: '#0066cc',
        borderBottom: '3px solid #0066cc',
        paddingBottom: '0.5rem',
        marginBottom: '2rem'
      }}>
        Carrinho de Compras
      </h2>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: '2rem 0'
      }}>
        {items.map((item) => (
          <li key={item.product.id} style={{ marginBottom: '1rem' }}>
            <CartItem item={item} onRemove={onRemove} />
          </li>
        ))}
      </ul>
      <div style={{
        background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        textAlign: 'right',
        marginTop: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          fontWeight: 'bold'
        }}>
          Total: {formattedTotal}
        </p>
      </div>
    </div>
  )
}
