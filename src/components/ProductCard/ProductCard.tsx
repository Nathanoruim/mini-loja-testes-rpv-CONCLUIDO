import { Product } from '../../types'

interface ProductCardProps {
  product: Product
  onAddToCart: (id: number) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <article style={{
      background: 'white',
      border: '2px solid #e3f2fd',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(0, 102, 204, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)'
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 102, 204, 0.2)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 102, 204, 0.1)'
    }}
    >
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        height: '200px',
        background: '#f0f7ff'
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: '#0066cc',
          color: 'white',
          padding: '0.4rem 0.8rem',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: '600'
        }}>
          {product.category}
        </span>
      </div>

      <div style={{
        padding: '1.5rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h3 style={{
          fontSize: '1.3rem',
          color: '#003d7a',
          marginBottom: '0.5rem'
        }}>
          {product.name}
        </h3>
        <p style={{
          color: '#666',
          fontSize: '0.95rem',
          marginBottom: '1rem',
          flex: 1
        }}>
          {product.description}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#0066cc'
          }}>
            {formattedPrice}
          </p>
          {!product.inStock && (
            <span style={{
              background: '#ff5252',
              color: 'white',
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}>
              Esgotado
            </span>
          )}
        </div>

        <button
          onClick={() => onAddToCart(product.id)}
          disabled={!product.inStock}
          style={{
            width: '100%',
            padding: '0.9rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            background: !product.inStock
              ? 'linear-gradient(135deg, #b0bec5 0%, #90a4ae 100%)'
              : 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: !product.inStock ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: !product.inStock
              ? '0 4px 6px rgba(176, 190, 197, 0.2)'
              : '0 4px 6px rgba(0, 102, 204, 0.2)'
          }}
          onMouseEnter={(e) => {
            if (product.inStock) {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 102, 204, 0.3)'
            }
          }}
          onMouseLeave={(e) => {
            if (product.inStock) {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 102, 204, 0.2)'
            }
          }}
        >
          {product.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
        </button>
      </div>
    </article>
  )
}
