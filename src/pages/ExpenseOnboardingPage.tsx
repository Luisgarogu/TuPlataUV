import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ExpenseCategory } from '../models/types';
import '../styles/auth-flow.css';

const categories: Array<{ value: ExpenseCategory; icon: string }> = [
  { value: 'Alimentación', icon: '🍔' },
  { value: 'Transporte', icon: '🚌' },
  { value: 'Estudio', icon: '📚' },
  { value: 'Entretenimiento', icon: '🎮' },
  { value: 'Salud', icon: '⚕️' },
  { value: 'Otro', icon: '📝' },
];

export const ExpenseOnboardingPage = () => {
  const navigate = useNavigate();
  const { addMovement } = useApp();

  const [amount, setAmount] = useState('15000');
  const [category, setCategory] =
    useState<ExpenseCategory>('Alimentación');
  const [description, setDescription] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    addMovement({
      kind: 'expense',
      category,
      amount: Number(amount.replace(/\D/g, '')) || 0,
      description,
      dateISO: new Date().toISOString(),
    });

    navigate('/dashboard');
  };

  return (
    <main className="onboarding-screen">
      <header className="onboarding-topbar">
        <div className="onboarding-branding">
          <div className="onboarding-branding__logo">
            <img src="/logo-tu-plata.png" alt="Tu Plata, Sin Drama" />
          </div>
          <div>
            <strong>Tu Plata, Sin Drama</strong>
            <small>Configuración inicial</small>
          </div>
        </div>

        <button
          type="button"
          className="skip-btn"
          onClick={() => navigate('/dashboard')}
        >
          Saltar
        </button>
      </header>

      <div className="progress progress--two">
        <span className="progress__step progress__step--active" />
        <span className="progress__step progress__step--active" />
      </div>

      <section className="onboarding-card">
        <div className="money-title">
          <span>$</span>
          <div>
            <h1>Ahora, registra un gasto reciente</h1>
            <p>
              Para ver tu balance real, cuéntanos en qué has gastado esta semana
            </p>
          </div>
        </div>

        <form className="onboarding-form" onSubmit={onSubmit}>
          <label>
            Monto <em>*</em>
          </label>
          <div className="input-prefix">
            <span>$</span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="15.000"
            />
          </div>

          <label>
            Categoria <em>*</em>
          </label>

          <div className="choice-grid choice-grid--two">
            {categories.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`choice-card ${
                  category === item.value ? 'choice-card--selected' : ''
                }`}
                onClick={() => setCategory(item.value)}
              >
                <span>{item.icon}</span>
                <strong>{item.value}</strong>
              </button>
            ))}
          </div>

          <label>Descripcion <small>(opcional)</small></label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej: Almuerzo con amigos"
          />

          <div className="onboarding-actions onboarding-actions--three">
            <button
              type="button"
              className="btn-inline"
              onClick={() => navigate('/onboarding/income')}
            >
              ← Atrás
            </button>

            <button
              type="button"
              className="btn-inline btn-inline--muted"
              onClick={() => navigate('/dashboard')}
            >
              Saltar
            </button>

            <button type="submit" className="btn-primary">
              Finalizar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};