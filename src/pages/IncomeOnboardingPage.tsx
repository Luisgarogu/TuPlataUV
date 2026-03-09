import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { IncomeSource } from '../models/types';
import '../styles/auth-flow.css';

const sources: Array<{ value: IncomeSource; icon: string }> = [
  { value: 'Familia', icon: '👨‍👩‍👧‍👦' },
  { value: 'Beca', icon: '🎓' },
  { value: 'Trabajo', icon: '💼' },
  { value: 'Otro', icon: '📝' },
];

export const IncomeOnboardingPage = () => {
  const navigate = useNavigate();
  const { addMovement } = useApp();

  const [amount, setAmount] = useState('50000');
  const [source, setSource] = useState<IncomeSource>('Familia');
  const [date, setDate] = useState('02 / 25 / 26');
  const [description, setDescription] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    addMovement({
      kind: 'income',
      category: source,
      amount: Number(amount.replace(/\D/g, '')) || 0,
      description,
      dateISO: new Date().toISOString(),
    });

    navigate('/onboarding/expense');
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

      <div className="progress progress--one">
        <span className="progress__step progress__step--active" />
        <span className="progress__step" />
      </div>

      <section className="onboarding-card">
        <div className="money-title">
          <span>$</span>
          <div>
            <h1>¡Bienvenido! Registra tu primer ingreso</h1>
            <p>
              Cuéntanos de dónde viene tu dinero para empezar a ver tu realidad
              financiera
            </p>
          </div>
        </div>

        <form className="onboarding-form" onSubmit={onSubmit}>
          <label>
            Monto recibido <em>*</em>
          </label>
          <div className="input-prefix">
            <span>$</span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="50.000"
            />
          </div>

          <label>
            Fuente del ingreso <em>*</em>
          </label>

          <div className="choice-grid choice-grid--two">
            {sources.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`choice-card ${
                  source === item.value ? 'choice-card--selected' : ''
                }`}
                onClick={() => setSource(item.value)}
              >
                <span>{item.icon}</span>
                <strong>{item.value}</strong>
              </button>
            ))}
          </div>

          <label>Fecha</label>
          <input value={date} onChange={(e) => setDate(e.target.value)} />

          <label>Descripcion <small>(opcional)</small></label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej: Mesada del mes"
          />

          <div className="onboarding-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              Saltar este Paso
            </button>

            <button type="submit" className="btn-primary">
              Continuar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};