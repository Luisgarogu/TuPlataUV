import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/auth-flow.css';

const accounts = [
  {
    id: '1',
    name: 'Ana García',
    email: 'anagarcia.random@gmail.com',
    avatar: 'AG',
    tone: 'peach',
  },
  {
    id: '2',
    name: 'MARIO LÓPEZ',
    email: 'mario.l@randommail.co',
    avatar: 'ML',
    tone: 'teal',
  },
  {
    id: '3',
    name: 'Sofía Rodríguez',
    email: 'sofa_pets@random.es',
    avatar: 'SR',
    tone: 'gold',
  },
  {
    id: '4',
    name: 'Carlos Martínez',
    email: 'c.martinez@university.edu.co',
    avatar: 'C',
    tone: 'blue',
  },
  {
    id: '5',
    name: 'Luisa Gómez',
    email: 'luisa_family@random.co',
    avatar: 'LG',
    tone: 'pink',
  },
  {
    id: '6',
    name: 'Pedro Sánchez',
    email: 'pedro_work@random.net',
    avatar: 'PS',
    tone: 'gray',
  },
  {
    id: '7',
    name: 'Isabella Torres',
    email: 'isabella_travels@random.com',
    avatar: 'IT',
    tone: 'orange',
  },
];

export const GoogleAccountPickerPage = () => {
  const navigate = useNavigate();
  const { login } = useApp();

  const handleSelect = () => {
    login('google');
    navigate('/onboarding/income');
  };

  return (
    <main className="auth-screen auth-screen--picker">
      <div className="picker-card">
        <div className="picker-header">
          <div className="picker-brand">
            <img
              src="/logo-tu-plata.png"
              alt="Tu Plata, Sin Drama"
              className="picker-brand__image"
            />
          </div>

          <h1>Elige una cuenta</h1>
          <p>
            para continuar usando &quot;Tu Plata, Sin Drama&quot;
          </p>
        </div>

        <div className="picker-list">
          {accounts.map((account) => (
            <button
              key={account.id}
              type="button"
              className="picker-account"
              onClick={handleSelect}
            >
              <span className={`picker-avatar picker-avatar--${account.tone}`}>
                {account.avatar}
              </span>

              <span className="picker-account__text">
                <strong>{account.name}</strong>
                <small>{account.email}</small>
              </span>
            </button>
          ))}

          <button type="button" className="picker-account picker-account--add">
            <span className="picker-avatar picker-avatar--outline">+</span>
            <span className="picker-account__text">
              <strong>Agregar otra cuenta</strong>
            </span>
          </button>
        </div>

        <div className="picker-footer">
          <p>
            Para continuar, Google compartirá tu nombre, dirección de correo
            electrónico y foto de perfil con Tu Plata, Sin Drama.
          </p>
        </div>
      </div>
    </main>
  );
};