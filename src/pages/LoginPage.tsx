import { useNavigate } from 'react-router-dom';
import '../styles/auth-flow.css';

const AppleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="social-btn__svg"
  >
    <path
      fill="currentColor"
      d="M16.37 12.32c.02 2.24 1.97 2.99 1.99 3-.02.05-.31 1.06-1.02 2.1-.61.89-1.25 1.78-2.25 1.8-.98.02-1.3-.58-2.43-.58-1.14 0-1.49.56-2.41.6-.96.04-1.69-.96-2.31-1.84-1.27-1.84-2.24-5.18-.94-7.44.65-1.12 1.82-1.83 3.09-1.85.96-.02 1.86.64 2.43.64.57 0 1.65-.79 2.78-.67.47.02 1.8.19 2.66 1.45-.07.04-1.59.93-1.57 2.79ZM14.38 6.79c.51-.62.85-1.48.76-2.34-.73.03-1.61.49-2.13 1.1-.47.55-.89 1.42-.78 2.25.81.06 1.64-.41 2.15-1.01Z"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="social-btn__svg social-btn__svg--google"
  >
    <path
      fill="#EA4335"
      d="M12 10.2v3.9h5.4c-.24 1.26-.96 2.32-2.04 3.03l3.3 2.56c1.92-1.77 3.03-4.38 3.03-7.49 0-.72-.06-1.41-.19-2.07H12z"
    />
    <path
      fill="#34A853"
      d="M12 22c2.7 0 4.96-.9 6.61-2.44l-3.3-2.56c-.92.62-2.09.99-3.31.99-2.55 0-4.72-1.72-5.5-4.03H3.09v2.63A9.99 9.99 0 0 0 12 22z"
    />
    <path
      fill="#FBBC05"
      d="M6.5 13.96A5.99 5.99 0 0 1 6.19 12c0-.68.12-1.33.31-1.96V7.41H3.09A9.99 9.99 0 0 0 2 12c0 1.61.38 3.14 1.09 4.59l3.41-2.63z"
    />
    <path
      fill="#4285F4"
      d="M12 6.01c1.47 0 2.79.51 3.83 1.5l2.87-2.87C16.95 3.01 14.7 2 12 2A9.99 9.99 0 0 0 3.09 7.41l3.41 2.63C7.28 7.73 9.45 6.01 12 6.01z"
    />
  </svg>
);


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
            <span className="social-btn__icon social-btn__icon--google">
              <GoogleIcon />
            </span>
            <span>Continuar con Google</span>
          </button>


          <button
            type="button"
            className="social-btn"
            onClick={() => navigate('/login/google')}
          >
            <span className="social-btn__icon social-btn__icon--apple">
              <AppleIcon />
            </span>
            <span>Continuar con Apple</span>
          </button>

          <div className="login-separator">o</div>

          <button
            type="button"
            className="social-btn social-btn--guest"
            onClick={() => navigate('/onboarding/income')}
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