import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Bell,
  CircleDollarSign,
  CreditCard,
  List,
  PiggyBank,
  ReceiptText,
  TrendingDown,
  TrendingUp,
  Wallet,
  CalendarDays,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { ActionCard } from '../components/ActionCard';
import { MobileShell } from '../components/MobileShell';
import { useApp } from '../context/AppContext';
import { currency } from '../utils/format';
import '../styles/dashboard.css';

export const DashboardPage = () => {
  const { movements } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');
  const [showMonthlyNotice, setShowMonthlyNotice] = useState(false);

  const incomes = movements.filter((m) => m.kind === 'income');
  const expenses = movements.filter((m) => m.kind === 'expense');

  const totalIncome = incomes.reduce((a, b) => a + b.amount, 0);
  const totalExpense = expenses.reduce((a, b) => a + b.amount, 0);
  const balance = totalIncome - totalExpense;

  const avgDailyExpense = expenses.length > 0 ? Math.round(totalExpense / 7) : 0;

  const savingsRate =
    totalIncome > 0 ? Math.max(0, Math.round((balance / totalIncome) * 100)) : 0;

  const biggestExpense =
    expenses.length > 0
      ? expenses.reduce((max, item) => (item.amount > max.amount ? item : max), expenses[0])
      : null;

  const totalExpenseCount = expenses.length;
  const totalIncomeCount = incomes.length;

  const handleWeekClick = () => {
    setSelectedPeriod('week');
    setShowMonthlyNotice(false);
  };

  const handleMonthClick = () => {
    setSelectedPeriod('month');
    setShowMonthlyNotice(true);
  };

  const closeMonthlyNotice = () => {
    setShowMonthlyNotice(false);
    setSelectedPeriod('week');
  };

  return (
    <MobileShell
      title="Tu Plata, Sin Drama"
      subtitle="¡Bienvenido de vuelta!"
      showDashboardHeader
    >
      <div className="dashboard-tabs">
        <button
          className={`dashboard-tab ${selectedPeriod === 'week' ? 'dashboard-tab--active' : ''}`}
          onClick={handleWeekClick}
          type="button"
        >
          Esta Semana
        </button>

        <button
          className={`dashboard-tab ${selectedPeriod === 'month' ? 'dashboard-tab--active' : ''}`}
          onClick={handleMonthClick}
          type="button"
        >
          Este mes
        </button>
      </div>

      <div className="dashboard-stack">
        <section className="summary-card summary-card--primary">
          <div className="summary-card__label">
            <Wallet size={14} strokeWidth={2.2} />
            <span>Balance disponible</span>
          </div>
          <strong>{currency(balance)}</strong>
        </section>

        <section className="summary-card">
          <div className="summary-card__label summary-card__label--income">
            <TrendingUp size={14} strokeWidth={2.2} />
            <span>Ingresos</span>
          </div>
          <strong>{currency(totalIncome)}</strong>
        </section>

        <section className="summary-card">
          <div className="summary-card__label summary-card__label--expense">
            <TrendingDown size={14} strokeWidth={2.2} />
            <span>Gastos</span>
          </div>
          <strong>{currency(totalExpense)}</strong>
        </section>

        <section className="summary-card">
          <div className="summary-card__label summary-card__label--major">
            <CircleDollarSign size={14} strokeWidth={2.2} />
            <span>Mayor gasto</span>
          </div>
          <strong>{biggestExpense?.category ?? 'Sin datos'}</strong>
          <small>{biggestExpense ? currency(biggestExpense.amount) : '$0'}</small>
        </section>

        <section className="analysis-card">
          <div className="analysis-card__header">
            <BarChart3 size={16} strokeWidth={2.2} />
            <span>Análisis financiero</span>
          </div>

          <div className="analysis-metrics">
            <div className="analysis-item">
              <div className="analysis-item__label">
                <CalendarDays size={14} />
                <span>Gasto promedio diario</span>
              </div>
              <strong>{currency(avgDailyExpense)}</strong>
              <small>Basado en 7 días</small>
            </div>

            <div className="analysis-item">
              <div className="analysis-item__label">
                <PiggyBank size={14} />
                <span>Tasa de ahorro</span>
              </div>
              <strong>{savingsRate}%</strong>
              <small>{savingsRate >= 20 ? '¡Muy bien!' : 'Puede mejorar'}</small>
            </div>

            <div className="analysis-item">
              <div className="analysis-item__label">
                <ArrowDown size={14} />
                <span>Total de gastos</span>
              </div>
              <strong>{totalExpenseCount}</strong>
              <small>Esta semana</small>
            </div>

            <div className="analysis-item">
              <div className="analysis-item__label">
                <ArrowUp size={14} />
                <span>Total de ingresos</span>
              </div>
              <strong>{totalIncomeCount}</strong>
              <small>Esta semana</small>
            </div>
          </div>

          <div className="analysis-highlight">
            <div className="analysis-highlight__icon">
              <TrendingUp size={14} strokeWidth={2.4} />
            </div>
            <div className="analysis-highlight__content">
              <strong>¡Excelente salud financiera!</strong>
              <p>Estás ahorrando más del 20% de tus ingresos. ¡Sigue así!</p>
            </div>
          </div>
        </section>

        <ActionCard
          to="/expense/new"
          title="Registrar Gasto"
          subtitle="Añade un nuevo gasto"
          icon={ReceiptText}
          colorClass="action-card__icon--pink"
        />

        <ActionCard
          to="/income/new"
          title="Registrar Ingreso"
          subtitle="Añade un nuevo ingreso"
          icon={TrendingUp}
          colorClass="action-card__icon--green"
        />

        <ActionCard
          to="/movements"
          title="Ver Movimientos"
          subtitle="Consulta tu historial"
          icon={List}
          colorClass="action-card__icon--blue"
        />

        <ActionCard
          to="/budgets"
          title="Crear Presupuestos"
          subtitle="Configuración inicial"
          icon={CreditCard}
          colorClass="action-card__icon--purple"
        />

        <ActionCard
          to="/reminders"
          title="Recordatorios"
          subtitle="No olvides tus pagos"
          icon={Bell}
          colorClass="action-card__icon--orange"
        />
      </div>

      {showMonthlyNotice ? (
        <div className="dashboard-modal-overlay" onClick={closeMonthlyNotice}>
          <div
            className="dashboard-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="dashboard-modal__close"
              onClick={closeMonthlyNotice}
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>

            <div className="dashboard-modal__icon">
              <CalendarDays size={18} />
            </div>

            <h3>Resumen mensual no disponible</h3>
            <p>
              Aún no existen registros suficientes para generar un análisis mensual
              confiable. Probablemente llevas poco tiempo usando la aplicación.
            </p>

            <button
              type="button"
              className="dashboard-modal__button"
              onClick={closeMonthlyNotice}
            >
              Entendido
            </button>
          </div>
        </div>
      ) : null}
    </MobileShell>
  );
};