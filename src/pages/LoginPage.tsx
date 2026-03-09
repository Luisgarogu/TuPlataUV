import { useNavigate } from 'react-router-dom';
import '../styles/auth-flow.css';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <main className="auth-screen auth-screen--login">
      <div className="status-bar-space" />

      <section className="login-hero">
        <div className="brand-mark">
          <img
            src="/logo-tu-plata.png"
            alt="Tu Plata, Sin Drama"
            className="brand-mark__image"
          />
        </div>

        <h1 className="login-title">Tu Plata, Sin Drama</h1>
        <p className="login-subtitle">Tu dinero al día, tu vida Tranquila</p>
      </section>

      <section className="login-panel">
        <h2 className="login-panel__title">Comenzar</h2>
        <p className="login-panel__subtitle">
          Elige cómo quieres acceder a la app
        </p>

        <div className="login-actions">
          <button
            type="button"
            className="social-btn"
            onClick={() => navigate('/login/google')}
          >
            <span className="social-btn__icon social-btn__icon--google">G</span>
            <span>Continuar con Google</span>
          </button>

          <button
            type="button"
            className="social-btn"
            onClick={() => navigate('/login/google')}
          >
            <span className="social-btn__icon social-btn__icon--apple"></span>
            <span>Continuar con Apple</span>
          </button>

          <div className="login-separator">o</div>

          <button
            type="button"
            className="social-btn social-btn--guest"
            onClick={() => navigate('/login/google')}
          >
            Probar sin Registrarse
          </button>
        </div>
      </section>

      <footer className="login-legal">
        <p>
          Al hacer clic en continuar, aceptas nuestros{' '}
          <strong>Términos de servicio</strong> y{' '}
          <strong>Política de privacidad</strong>
        </p>
      </footer>
    </main>
  );
};