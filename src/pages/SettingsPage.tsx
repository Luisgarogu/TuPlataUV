import { ArrowLeft, LogOut, Trash2, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../styles/feature-pages.css';

export const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <main className="feature-screen">
      <div className="feature-shell">
        <header className="feature-topbar">
          <div className="feature-topbar__left">
            <button
              className="feature-back"
              onClick={() => navigate(-1)}
              type="button"
              aria-label="Volver"
            >
              <ArrowLeft size={14} />
            </button>

            <div
              className="feature-brand"
              style={{ background: '#5a6472' }}
            >
              <Settings size={12} color="#fff" />
            </div>

            <div className="feature-titlebox">
              <strong>Configuración</strong>
              <span>Gestiona tu cuenta</span>
            </div>
          </div>
        </header>

        <section className="feature-content settings-content">
          <section className="settings-section">
            <h2 className="settings-section__title">Acerca de</h2>

            <div className="settings-about-card">
              <strong>tu Plata, sin drama</strong>
              <small>Versión 1.0.0</small>
              <p>
                Una aplicación diseñada para estudiantes que quieren gestionar
                su dinero de forma simple y efectiva, sin complicaciones
                financieras.
              </p>
            </div>
          </section>

          <section className="settings-section settings-section--danger">
            <h2 className="settings-section__title settings-section__title--danger">
              Eliminar todos los datos
            </h2>

            <p className="settings-danger-text">
              Esta acción eliminará permanentemente todos tus gastos, ingresos,
              presupuestos y recordatorios
            </p>

            <button type="button" className="settings-danger-btn">
              <Trash2 size={13} />
              <span>Eliminar todos los datos</span>
            </button>
          </section>

          <section className="settings-legal-card">
            <h2 className="settings-section__title">Legal</h2>

            <div className="settings-legal-item">
              <strong>Términos de Servicio</strong>
              <span>Lee nuestros términos y condiciones</span>
            </div>

            <div className="settings-legal-item">
              <strong>Política de Privacidad</strong>
              <span>Cómo protegemos tus datos</span>
            </div>
          </section>

          <section className="settings-logout-card">
            <button type="button" className="settings-logout-btn">
              <LogOut size={13} />
              <Link to="/login">Cerrar sesión</Link>
            </button>
          </section>
        </section>
      </div>
    </main>
  );
};