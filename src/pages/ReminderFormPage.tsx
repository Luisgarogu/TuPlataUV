import { FormEvent, useState } from 'react';
import { ArrowLeft, Bell } from 'lucide-react';
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addReminder({
      title,
      amount: Number(amount.replace(/\D/g, '')) || 0,
      dueDateISO: date || new Date().toISOString(),
      notifyWhen,
    });

    navigate('/reminders');
  };

  return (
    <main className="feature-screen feature-screen--reminder-form">
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
              onClick={() => navigate('/reminders')}
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
                />
              </div>

              <label>Cuándo notificar</label>
              <div className="reminder-select-wrap">
                <select
                  value={notifyWhen}
                  onChange={(e) => setNotifyWhen(e.target.value as NotifyWhen)}
                  className="reminder-select"
                >
                  <option>El mismo día</option>
                  <option>1 día antes</option>
                  <option>3 días antes</option>
                  <option>1 semana antes</option>
                </select>
              </div>

              <button type="submit" className="feature-submit feature-submit--orange">
                Crear recordatorio
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};