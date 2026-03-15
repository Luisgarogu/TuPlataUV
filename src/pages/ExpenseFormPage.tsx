import { FormEvent, useState } from 'react';
import { ArrowLeft, DollarSign, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/feature-pages.css';

type ExpenseCategory =
  | 'Alimentación'
  | 'Transporte'
  | 'Estudio'
  | 'Entretenimiento'
  | 'Salud'
  | 'Otro';

const categories: Array<{ value: ExpenseCategory; icon: string }> = [
  { value: 'Alimentación', icon: '🍔' },
  { value: 'Transporte', icon: '🚌' },
  { value: 'Estudio', icon: '📚' },
  { value: 'Entretenimiento', icon: '🎮' },
  { value: 'Salud', icon: '⚕️' },
  { value: 'Otro', icon: '📝' },
];

export const ExpenseFormPage = () => {
  const navigate = useNavigate();
  const { addMovement } = useApp();

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory | null>(null);
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
        'Debes ingresar el valor del gasto antes de continuar.'
      );
      return;
    }

    if (!cleanAmount || cleanAmount <= 0) {
      openValidationModal(
        'Monto inválido',
        'Ingresa un monto mayor a cero para poder registrar el gasto.'
      );
      return;
    }

    if (!category) {
      openValidationModal(
        'Falta la categoría',
        'Selecciona una categoría para clasificar correctamente este gasto.'
      );
      return;
    }

    addMovement({
      kind: 'expense',
      category,
      amount: cleanAmount,
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
              <strong>Registrar gasto</strong>
              <span>Tu Plata, sin drama</span>
            </div>
          </div>
        </header>

        <section className="feature-content">
          <div className="feature-card">
            <div className="feature-section-title feature-section-title--green">
              <DollarSign size={13} />
              <span>Nuevo gasto</span>
            </div>

            <form className="feature-form" onSubmit={handleSubmit}>
              <label>
                Monto <em>*</em>
              </label>

              <div className="feature-input-prefix">
                <span>$</span>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="15.000"
                />
              </div>

              <label>
                Categoría <em>*</em>
              </label>

              <div className="feature-grid-2">
                {categories.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={`choice-tile ${
                      category === item.value ? 'choice-tile--selected' : ''
                    }`}
                    onClick={() => setCategory(item.value)}
                  >
                    <span className="choice-tile__emoji">{item.icon}</span>
                    <span>{item.value}</span>
                  </button>
                ))}
              </div>

              <label>
                Descripción <small>(opcional)</small>
              </label>

              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Almuerzo con amigos"
              />

              <button type="submit" className="feature-submit">
                Guardar Gasto
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