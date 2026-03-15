import { ArrowLeft, PiggyBank } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { currency } from '../utils/format';
import '../styles/feature-pages.css';

export const BudgetsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { budgets } = useApp();

  const handleBack = () => {
  if (location.state?.fromCreatedBudget) {
    navigate('/dashboard');
    return;
  }

  navigate(-1);
};
  return (
    <main className="feature-screen">
      <div className="feature-shell">
        <header className="feature-topbar">
          <div className="feature-topbar__left">
            <button
              className="feature-back"
              onClick={handleBack}
              type="button"
            >
              <ArrowLeft size={14} />
            </button>

            <div
              className="feature-brand"
              style={{ background: 'linear-gradient(135deg, #a84cff, #7b2cff)' }}
            >
              <img src="/logo-tu-plata.png" alt="Tu Plata" />
            </div>

            <div className="feature-titlebox">
              <strong>Presupuestos</strong>
              <span>Define límites por categoría</span>
            </div>
          </div>

          <div className="feature-topbar__right">
            <button
              type="button"
              className="feature-header-btn feature-header-btn--purple"
              onClick={() => navigate('/budgets/new')}
            >
              Nuevo presupuesto
            </button>
          </div>
        </header>

        <section className="feature-content">
          <h2 className="reminders-heading budgets-heading">Mis presupuestos</h2>

          {budgets.length === 0 ? (
            <div className="empty-budget-state">
              <div className="empty-budget-state__icon">
                <PiggyBank size={26} strokeWidth={2.1} />
              </div>

              <strong>No tienes presupuestos</strong>
              <p>
                Crea tu primer presupuesto para controlar tus gastos
              </p>
            </div>
          ) : (
            <div className="budget-list">
              {budgets.map((budget) => (
                <article className="budget-card" key={budget.id}>
                  <div className="budget-card__top">
                    <div className="budget-card__category">
                      <div className="budget-card__icon">
                        <PiggyBank size={14} strokeWidth={2.2} />
                      </div>
                      <strong>{budget.category}</strong>
                    </div>

                    <span className="budget-card__amount">
                      {currency(budget.monthlyLimit)}
                    </span>
                  </div>

                  <div className="budget-card__meta">
                    Límite mensual configurado
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