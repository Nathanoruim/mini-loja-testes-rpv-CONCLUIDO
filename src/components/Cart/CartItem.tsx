import { CartItem as CartItemType } from '../../types'

interface CartItemProps {
  item: CartItemType
  onRemove: (productId: number) => void
}

export function CartItem({ item, onRemove }: CartItemProps) {
  const subtotal = item.product.price * item.quantity

  const formattedSubtotal = subtotal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.2rem',
      background: '#f0f7ff',
      border: '1px solid #b3e5fc',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      gap: '1rem'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = '#e3f2fd'
      e.currentTarget.style.borderColor = '#0066cc'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = '#f0f7ff'
      e.currentTarget.style.borderColor = '#b3e5fc'
    }}
    >
      <div style={{ flex: 1 }}>
        <h4 style={{
          color: '#003d7a',
          marginBottom: '0.5rem',
          fontSize: '1.1rem'
        }}>
          {item.product.name}
        </h4>
        <div style={{
          display: 'flex',
          gap: '2rem',
          color: '#0066cc',
          fontSize: '0.95rem'
        }}>
          <span>
            <strong>Quantidade:</strong> {item.quantity}
          </span>
          <span>
            <strong>Subtotal:</strong> {formattedSubtotal}
          </span>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.product.id)}
        style={{
          background: '#ff5252',
          color: 'white',
          border: 'none',
          padding: '0.6rem 1.2rem',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px rgba(255, 82, 82, 0.2)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(255, 82, 82, 0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(255, 82, 82, 0.2)'
        }}
      >
        ✕ Remover
      </button>
    </div>
  )
}
