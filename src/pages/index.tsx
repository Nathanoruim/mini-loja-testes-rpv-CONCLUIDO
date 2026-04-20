import { useState } from 'react'
import { ProductCard } from '../components/ProductCard/ProductCard'
import { Cart } from '../components/Cart/Cart'
import { CheckoutForm } from '../components/CheckoutForm/CheckoutForm'
import { products } from '../data/products'
import { CartItem, CheckoutData } from '../types'

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [submitted, setSubmitted] = useState(false)

  function handleAddToCart(productId: number) {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === productId)
      if (existing) {
        return prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  function handleRemove(productId: number) {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  function handleCheckout(data: CheckoutData) {
    console.log('Pedido finalizado:', data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f7ff 0%, #e3f2fd 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        color: '#1a3a52'
      }}>
        <div style={{
          textAlign: 'center',
          background: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 102, 204, 0.2)',
          maxWidth: '500px'
        }}>
          <h1 style={{
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            ✓ Pedido Realizado com Sucesso!
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#0066cc',
            marginBottom: '2rem'
          }}>
            Obrigado por sua compra! Você receberá um email com os detalhes do seu pedido.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0, 102, 204, 0.2)'
            }}
          >
            Voltar à Loja
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f0f7ff 0%, #e3f2fd 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      color: '#1a3a52',
      minHeight: '100vh'
    }}>
      <header style={{
        background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
        color: 'white',
        padding: '2rem',
        marginBottom: '3rem',
        borderRadius: '0 0 12px 12px',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0, 102, 204, 0.3)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '0.5rem',
          color: 'white'
        }}>
          Loja
        </h1>
        <p style={{
          color: '#e3f2fd',
          fontSize: '1.1rem'
        }}>
          Compre os melhores produtos com qualidade garantida
        </p>
      </header>

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 2rem'
      }}>
        <section style={{
          marginBottom: '3rem',
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 102, 204, 0.1)',
          borderLeft: '5px solid #0066cc'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            color: '#0066cc',
            borderBottom: '3px solid #0066cc',
            paddingBottom: '0.5rem',
            marginBottom: '2rem'
          }}>
            Produtos em Destaque
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        <section style={{
          marginBottom: '3rem',
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 102, 204, 0.1)',
          borderLeft: '5px solid #0066cc'
        }}>
          <Cart items={cartItems} onRemove={handleRemove} />
        </section>

        <section style={{
          marginBottom: '3rem',
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 102, 204, 0.1)',
          borderLeft: '5px solid #0066cc'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            color: '#0066cc',
            borderBottom: '3px solid #0066cc',
            paddingBottom: '0.5rem',
            marginBottom: '2rem'
          }}>
            Finalizar Compra
          </h2>
          <CheckoutForm onSubmit={handleCheckout} />
        </section>

        <footer style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#0066cc',
          borderTop: '2px solid #e0e0e0',
          marginTop: '3rem'
        }}>
          
        </footer>
      </main>
    </div>
  )
}
