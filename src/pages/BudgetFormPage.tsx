import { FormEvent, useState } from 'react';
import { ArrowLeft, WalletCards } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/feature-pages.css';

type BudgetCategory =
  | 'Alimentación'
  | 'Transporte'
  | 'Estudio'
  | 'Entretenimiento'
  | 'Salud';

const categories: Array<{ value: BudgetCategory; icon: string }> = [
  { value: 'Alimentación', icon: '🍔' },
  { value: 'Transporte', icon: '🚌' },
  { value: 'Estudio', icon: '📚' },
  { value: 'Entretenimiento', icon: '🎮' },
  { value: 'Salud', icon: '⚕️' },
];

export const BudgetFormPage = () => {
  const navigate = useNavigate();
  const { addBudget } = useApp();

  const [category, setCategory] = useState<BudgetCategory>('Alimentación');
  const [limit, setLimit] = useState('200000');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addBudget({
      category,
      monthlyLimit: Number(limit.replace(/\D/g, '')) || 0,
    });

    navigate('/budgets');
  };

  return (
    <main className="feature-screen">
      <div className="feature-shell">
        <header className="feature-topbar">
          <div className="feature-topbar__left">
            <button className="feature-back" onClick={() => navigate(-1)} type="button">
              <ArrowLeft size={14} />
            </button>

            <div
              className="feature-brand"
              style={{ background: 'linear-gradient(135deg, #a84cff, #7b2cff)' }}
            >
              <img src="/logo-tu-plata.png" alt="Tu Plata" />
            </div>

            <div className="feature-titlebox">
              <strong>Presupuestos</strong>
              <span>Define límites por categoría</span>
            </div>
          </div>
        </header>

        <section className="feature-content">
          <div className="feature-card">
            <div className="feature-section-title">
              <WalletCards size={13} />
              <span>Crear nuevo presupuesto</span>
            </div>

            <form className="feature-form" onSubmit={handleSubmit}>
              <label>Categoría</label>

              <div className="feature-grid-2">
                {categories.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={`choice-tile ${category === item.value ? 'choice-tile--selected' : ''
                      }`}
                    onClick={() => setCategory(item.value)}
                  >
                    <span className="choice-tile__emoji">{item.icon}</span>
                    <span>{item.value}</span>
                  </button>
                ))}
              </div>

              <label>Límite mensual</label>

              <div className="feature-input-prefix">
                <span>$</span>
                <input
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  placeholder="200.000"
                />
              </div>

              <button type="submit" className="feature-submit feature-submit--purple">
                Guardar presupuesto
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};