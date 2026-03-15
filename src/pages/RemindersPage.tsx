import { ArrowLeft, Bell, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/feature-pages.css';

export const RemindersPage = () => {
  const navigate = useNavigate();
  const { reminders } = useApp();

  return (
    <main className="feature-screen">
      <div className="feature-shell">
        <header className="feature-topbar">
          <div className="feature-topbar__left">
            <button
              className="feature-back"
              onClick={() => navigate('/dashboard')}
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
              onClick={() => navigate('/reminders/new')}
            >
              Nuevo recordatorio
            </button>
          </div>
        </header>

        <section className="feature-content">
          <h2 className="reminders-heading">Próximos pagos</h2>

          {reminders.length === 0 ? (
            <div className="empty-reminder-card">
              <div className="empty-reminder-card__icon">
                <Bell size={22} />
              </div>

              <strong>No tienes recordatorios pendientes</strong>
              <p>
                Crea un recordatorio para no olvidar tus pagos importantes
              </p>
            </div>
          ) : (
            <div className="reminders-list">
              {reminders.map((reminder, index) => (
                <article
                  key={`${reminder.title}-${reminder.dueDateISO}-${index}`}
                  className="reminder-list-card"
                >
                  <div className="reminder-list-card__icon">
                    <Bell size={16} />
                  </div>

                  <div className="reminder-list-card__content">
                    <strong>{reminder.title}</strong>
                    <span>
                      {reminder.amount
                        ? `$ ${reminder.amount.toLocaleString('es-CO')}`
                        : 'Sin monto definido'}
                    </span>
                    <small>
                      <CalendarDays size={12} />
                      {new Date(reminder.dueDateISO).toLocaleDateString('es-CO')}
                    </small>
                  </div>

                  <div className="reminder-list-card__tag">
                    {reminder.notifyWhen}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};