import { useState } from 'react'
import { CheckoutData } from '../../types'

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void
}

interface FormErrors {
  nome?: string
  email?: string
  cep?: string
}

export function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cep, setCep] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  function validate(): FormErrors {
    const newErrors: FormErrors = {}

    if (!nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!cep.trim()) {
      newErrors.cep = 'CEP é obrigatório'
    } else if (cep.replace(/\D/g, '').length < 8) {
      newErrors.cep = 'CEP deve ter 8 dígitos'
    }

    return newErrors
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors = validate()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({ nome, email, cep })
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      maxWidth: '600px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <label htmlFor="nome" style={{
          color: '#003d7a',
          fontWeight: '600',
          fontSize: '0.95rem'
        }}>
          Nome Completo
        </label>
        <input
          id="nome"
          type="text"
          placeholder="Seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{
            borderColor: errors.nome ? '#f44336' : '#b3e5fc',
            background: errors.nome ? '#ffebee' : 'white'
          }}
        />
        {errors.nome && (
          <span role="alert" style={{
            color: '#f44336',
            fontSize: '0.85rem',
            fontWeight: '500'
          }}>
            ⚠️ {errors.nome}
          </span>
        )}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <label htmlFor="email" style={{
          color: '#003d7a',
          fontWeight: '600',
          fontSize: '0.95rem'
        }}>
          E-mail
        </label>
        <input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            borderColor: errors.email ? '#f44336' : '#b3e5fc',
            background: errors.email ? '#ffebee' : 'white'
          }}
        />
        {errors.email && (
          <span role="alert" style={{
            color: '#f44336',
            fontSize: '0.85rem',
            fontWeight: '500'
          }}>
             {errors.email}
          </span>
        )}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <label htmlFor="cep" style={{
          color: '#003d7a',
          fontWeight: '600',
          fontSize: '0.95rem'
        }}>
          CEP
        </label>
        <input
          id="cep"
          type="text"
          placeholder="00000-000"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          style={{
            borderColor: errors.cep ? '#f44336' : '#b3e5fc',
            background: errors.cep ? '#ffebee' : 'white'
          }}
        />
        {errors.cep && (
          <span role="alert" style={{
            color: '#f44336',
            fontSize: '0.85rem',
            fontWeight: '500'
          }}>
            ⚠️ {errors.cep}
          </span>
        )}
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          gridColumn: '1 / -1',
          padding: '1rem 2rem',
          fontSize: '1.1rem',
          fontWeight: '700'
        }}
      >
        Finalizar Compra
      </button>
    </form>
  )
}
