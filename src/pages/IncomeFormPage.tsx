import { FormEvent, useState } from 'react';
import { ArrowLeft, TrendingUp, XCircle } from 'lucide-react';
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

  const [amount, setAmount] = useState('');
  const [source, setSource] = useState<IncomeSource | null>(null);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationTitle, setValidationTitle] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const openValidationModal = (title: string, message: string) => {
    setValidationTitle(title);
    setValidationMessage(message);
    setShowValidationModal(true);
  };

  const closeValidationModal = () => {
    setShowValidationModal(false);
    setValidationTitle('');
    setValidationMessage('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanAmount = Number(amount.replace(/\D/g, ''));

    if (!amount.trim()) {
      openValidationModal(
        'Falta el monto',
        'Debes ingresar el valor del ingreso antes de continuar.'
      );
      return;
    }

    if (!cleanAmount || cleanAmount <= 0) {
      openValidationModal(
        'Monto inválido',
        'Ingresa un monto mayor a cero para poder registrar el ingreso.'
      );
      return;
    }

    if (!source) {
      openValidationModal(
        'Falta la fuente del ingreso',
        'Selecciona de dónde proviene el ingreso para continuar.'
      );
      return;
    }

    if (!date.trim()) {
      openValidationModal(
        'Falta la fecha',
        'Debes ingresar la fecha del ingreso antes de guardarlo.'
      );
      return;
    }

    addMovement({
      kind: 'income',
      category: source,
      amount: cleanAmount,
      description,
      dateISO: new Date(date).toISOString(),
    });

    navigate('/movements', {
      replace: true,
      state: { fromCreatedMovement: true },
    });
  };

  return (
    <main className="feature-screen">
      <div className="feature-shell">
        <header className="feature-topbar">
          <div className="feature-topbar__left">
            <button
              className="feature-back"
              onClick={() => navigate(-1)}
              type="button"
            >
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
                    className={`choice-tile ${source === item.value ? 'choice-tile--selected' : ''
                      }`}
                    onClick={() => setSource(item.value)}
                  >
                    <span className="choice-tile__emoji">{item.icon}</span>
                    <span>{item.value}</span>
                  </button>
                ))}
              </div>

              <label>
                Fecha <em>*</em>
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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

        {showValidationModal ? (
          <div className="movement-modal-overlay" onClick={closeValidationModal}>
            <div
              className="movement-modal expense-validation-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="movement-modal__close"
                onClick={closeValidationModal}
                aria-label="Cerrar"
              >
                ✕
              </button>

              <div className="expense-validation-modal__icon">
                <XCircle size={22} />
              </div>

              <h3>{validationTitle}</h3>
              <p className="movement-modal__text">{validationMessage}</p>

              <div className="movement-modal__actions">
                <button
                  type="button"
                  className="movement-modal__btn movement-modal__btn--primary"
                  onClick={closeValidationModal}
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
};