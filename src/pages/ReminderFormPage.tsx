import { FormEvent, useRef, useState } from 'react';
import { ArrowLeft, AlertTriangle, LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/feature-pages.css';

type NotifyWhen =
  | 'El mismo día'
  | '1 día antes'
  | '3 días antes'
  | '1 semana antes';

export const ReminderFormPage = () => {
  const navigate = useNavigate();
  const { addReminder } = useApp();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('150000');
  const [date, setDate] = useState('');
  const [notifyWhen, setNotifyWhen] = useState<NotifyWhen>('El mismo día');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const failedOnceRef = useRef(false);

  const closeFailureModal = () => {
    setShowFailureModal(false);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Primer intento: falla simulada
    if (!failedOnceRef.current) {
      failedOnceRef.current = true;
      setIsSubmitting(false);
      setShowFailureModal(true);
      return;
    }

    // Segundo intento: guarda
    addReminder({
      title,
      amount: Number(amount.replace(/\D/g, '')) || 0,
      dueDateISO: date || new Date().toISOString(),
      notifyWhen,
    });

    setIsSubmitting(false);
    navigate('/reminders');
  };

  return (
    <main className="feature-screen feature-screen--reminder-form">
      <div className="feature-shell">
        <header className="feature-topbar">
          <div className="feature-topbar__left">
            <button
              className="feature-back"
              onClick={() => navigate('/dashboard')}
              type="button"
              disabled={isSubmitting}
            >
              <ArrowLeft size={14} />
            </button>

            <div
              className="feature-brand"
              style={{ background: 'linear-gradient(135deg, #ff9300, #ff7000)' }}
            >
              <img src="/logo-tu-plata.png" alt="Tu Plata" />
            </div>

            <div className="feature-titlebox">
              <strong>Recordatorios</strong>
              <span>No olvides tus pagos</span>
            </div>
          </div>

          <div className="feature-topbar__right">
            <button
              type="button"
              className="feature-header-btn feature-header-btn--orange"
              onClick={() => navigate('/dashboard')}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </div>
        </header>

        <section className="feature-content feature-content--reminder-form">
          <div className="feature-card reminder-form-card">
            <h2 className="reminder-form-title">Crear recordatorio de pago</h2>

            <form className="feature-form" onSubmit={onSubmit}>
              <label>
                Nombre del pago <em>*</em>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Arriendo, Netflix, etc."
                required
                disabled={isSubmitting}
              />

              <label>
                Monto <small>(opcional)</small>
              </label>
              <div className="feature-input-prefix">
                <span>$</span>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="150.000"
                  disabled={isSubmitting}
                />
              </div>

              <label>
                Fecha límite <em>*</em>
              </label>
              <div className="reminder-date-wrap">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="reminder-date-input"
                  disabled={isSubmitting}
                />
              </div>

              <label>Cuándo notificar</label>
              <div className="reminder-select-wrap">
                <select
                  value={notifyWhen}
                  onChange={(e) => setNotifyWhen(e.target.value as NotifyWhen)}
                  className="reminder-select"
                  disabled={isSubmitting}
                >
                  <option>El mismo día</option>
                  <option>1 día antes</option>
                  <option>3 días antes</option>
                  <option>1 semana antes</option>
                </select>
              </div>

              <button
                type="submit"
                className="feature-submit feature-submit--orange reminder-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="reminder-submit-btn__loading">
                    <LoaderCircle size={16} className="spinner" />
                    Guardando...
                  </span>
                ) : (
                  'Crear recordatorio'
                )}
              </button>
            </form>
          </div>
        </section>

        {showFailureModal ? (
          <div className="movement-modal-overlay" onClick={closeFailureModal}>
            <div
              className="movement-modal reminder-error-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="reminder-error-modal__icon">
                <AlertTriangle size={22} />
              </div>

              <h3>Error de conexión</h3>
              <p className="movement-modal__text">
                No fue posible guardar el recordatorio por un problema temporal
                de conexión con la base de datos. Inténtalo nuevamente.
              </p>

              <div className="movement-modal__actions">
                <button
                  type="button"
                  className="movement-modal__btn movement-modal__btn--primary"
                  onClick={closeFailureModal}
                >
                  Intentar de nuevo
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
};