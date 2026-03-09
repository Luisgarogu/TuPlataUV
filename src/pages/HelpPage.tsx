import { useState } from 'react';
import { ArrowLeft, ChevronDown, CircleHelp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../styles/feature-pages.css';

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: '¿Cómo registro un gasto?',
    answer:
      'Ve a “Registrar Gasto”, completa el monto, selecciona la categoría y agrega una descripción si lo necesitas. Luego pulsa “Guardar Gasto”.',
  },
  {
    question: '¿Cómo creo un presupuesto?',
    answer:
      'Ingresa a “Presupuestos”, pulsa “Nuevo presupuesto”, elige la categoría, define el límite mensual y guarda los cambios.',
  },
  {
    question: '¿Qué son los recordatorios y cómo los uso?',
    answer:
      'Los recordatorios te ayudan a no olvidar pagos importantes. Puedes crear uno indicando nombre del pago, fecha límite y cuándo deseas recibir el aviso.',
  },
  {
    question: '¿Cómo registro un ingreso?',
    answer:
      'Entra en “Registrar Ingreso”, escribe el monto recibido, elige la fuente del ingreso, agrega fecha y descripción, y guarda.',
  },
  {
    question: '¿Cómo veo mi balance y resumen financiero?',
    answer:
      'Desde el dashboard puedes revisar tu balance disponible, ingresos, gastos, mayor gasto y el análisis financiero resumido.',
  },
  {
    question: '¿Qué hago si hay un error al guardar?',
    answer:
      'Verifica que los campos obligatorios estén completos. Si el problema continúa, regresa a la pantalla anterior e intenta nuevamente.',
  },
];

export const HelpPage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
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
              aria-label="Volver"
            >
              <ArrowLeft size={14} />
            </button>

            <div
              className="feature-brand"
              style={{ background: 'linear-gradient(135deg, #5d72ff, #4156ff)' }}
            >
              <CircleHelp size={12} color="#fff" />
            </div>

            <div className="feature-titlebox">
              <strong>Ayuda</strong>
              <span>Aprende a usar la app</span>
            </div>
          </div>
        </header>

        <section className="feature-content help-content">
          <section className="help-hero-card">
            <h1>¡Bienvenido a tu Plata, sin drama!</h1>
            <p>
              Esta guía te ayudará a aprovechar al máximo la aplicación para
              gestionar tu dinero de forma simple y efectiva.
            </p>
          </section>

          <section className="help-faq-section">
            <h2 className="help-faq-title">Preguntas frecuentes</h2>

            <div className="help-faq-list">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div className="help-faq-item" key={item.question}>
                    <button
                      type="button"
                      className="help-faq-trigger"
                      onClick={() => toggleItem(index)}
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        size={15}
                        className={`help-faq-icon ${isOpen ? 'help-faq-icon--open' : ''
                          }`}
                      />
                    </button>

                    {isOpen ? (
                      <div className="help-faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>

          <button type="button" className="help-link-more">
            <Link
              to="https://api.whatsapp.com/send?phone=573117495150&text=Hola%2C%20soy%20usuario%20de%20TuPlata%20y%20requiero%20apoyo%20especializado">
              ¿Necesitas más ayuda?
            </Link>
          </button>
        </section>
      </div>
    </main>
  );
};