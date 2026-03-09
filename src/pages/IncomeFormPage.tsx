import { FormEvent, useState } from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/feature-pages.css';

type IncomeSource = 'Familia' | 'Beca' | 'Trabajo' | 'Otro';

const sources: Array<{ value: IncomeSource; icon: string }> = [
  { value: 'Familia', icon: '👨‍👩‍👧‍👦' },
  { value: 'Beca', icon: '🎓' },
  { value: 'Trabajo', icon: '💼' },
  { value: 'Otro', icon: '📝' },
];

export const IncomeFormPage = () => {
  const navigate = useNavigate();
  const { addMovement } = useApp();

  const [amount, setAmount] = useState('50000');
  const [source, setSource] = useState<IncomeSource>('Familia');
  const [date, setDate] = useState('02 / 25 / 26');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addMovement({
      kind: 'income',
      category: source,
      amount: Number(amount.replace(/\D/g, '')) || 0,
      description,
      dateISO: new Date().toISOString(),
    });

    navigate('/movements');
  };

  return (
    <main className="feature-screen">
      <div className="feature-shell">
        <header className="feature-topbar">
          <div className="feature-topbar__left">
            <button className="feature-back" onClick={() => navigate(-1)} type="button">
              <ArrowLeft size={14} />
            </button>

            <div className="feature-brand">
              <img src="/logo-tu-plata.png" alt="Tu Plata" />
            </div>

            <div className="feature-titlebox">
              <strong>Registrar ingreso</strong>
              <span>Tu Plata, sin drama</span>
            </div>
          </div>
        </header>

        <section className="feature-content">
          <div className="feature-card">
            <div className="feature-section-title feature-section-title--green">
              <TrendingUp size={13} />
              <span>Nuevo ingreso</span>
            </div>

            <form className="feature-form" onSubmit={handleSubmit}>
              <label>
                Monto recibido <em>*</em>
              </label>

              <div className="feature-input-prefix">
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

              <div className="feature-grid-2">
                {sources.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={`choice-tile ${
                      source === item.value ? 'choice-tile--selected' : ''
                    }`}
                    onClick={() => setSource(item.value)}
                  >
                    <span className="choice-tile__emoji">{item.icon}</span>
                    <span>{item.value}</span>
                  </button>
                ))}
              </div>

              <label>Fecha</label>

              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="02 / 25 / 26"
              />

              <label>
                Descripción <small>(opcional)</small>
              </label>

              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Mesada del mes"
              />

              <button type="submit" className="feature-submit">
                Guardar Ingreso
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};