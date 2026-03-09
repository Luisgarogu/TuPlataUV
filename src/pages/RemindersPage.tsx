import { ArrowLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/feature-pages.css';

export const RemindersPage = () => {
  const navigate = useNavigate();

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
            <button type="button" className="feature-header-btn feature-header-btn--orange">
              Nuevo recordatorio
            </button>
          </div>
        </header>

        <section className="feature-content">
          <h2 className="reminders-heading">Próximos pagos</h2>

          <div className="empty-reminder-card">
            <div className="empty-reminder-card__icon">
              <Bell size={22} />
            </div>

            <strong>No tienes recordatorios pendientes</strong>
            <p>
              Crea un recordatorio para no olvidar tus pagos importantes
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};