import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { currency } from '../utils/format';
import '../styles/feature-pages.css';

type FilterType = 'all' | 'expense' | 'income';

export const MovementsPage = () => {
  const navigate = useNavigate();
  const { movements } = useApp();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredMovements = useMemo(() => {
    if (filter === 'all') return movements;
    return movements.filter((m) => m.kind === filter);
  }, [filter, movements]);

  return (
    <main className="feature-screen">
      <div className="feature-shell">
        <header className="feature-topbar">
          <div className="feature-topbar__left">
            <button className="feature-back" onClick={() => navigate(-1)} type="button">
              <ArrowLeft size={14} />
            </button>

            <div className="feature-brand">
              <img src="/logo-tu-plata.png" alt="Tu Plata" />
            </div>

            <div className="feature-titlebox">
              <strong>Movimientos</strong>
              <span>Tu Plata, sin drama</span>
            </div>
          </div>
        </header>

        <section className="feature-content">
          <div className="movements-tabs">
            <button
              className={`movements-tab ${filter === 'all' ? 'movements-tab--active' : ''}`}
              onClick={() => setFilter('all')}
              type="button"
            >
              Todos ({movements.length})
            </button>
            <button
              className={`movements-tab ${filter === 'expense' ? 'movements-tab--active' : ''}`}
              onClick={() => setFilter('expense')}
              type="button"
            >
              Gastos ({movements.filter((m) => m.kind === 'expense').length})
            </button>
            <button
              className={`movements-tab ${filter === 'income' ? 'movements-tab--active' : ''}`}
              onClick={() => setFilter('income')}
              type="button"
            >
              Ingresos ({movements.filter((m) => m.kind === 'income').length})
            </button>
          </div>

          <h2 className="movements-section-title">Todos los movimientos</h2>

          <div className="movements-list">
            {filteredMovements.map((movement, index) => {
              const isIncome = movement.kind === 'income';

              return (
                <div
                  key={`${movement.dateISO}-${movement.amount}-${index}`}
                  className={`movement-card ${isIncome ? 'movement-card--income' : ''}`}
                >
                  <div className="movement-card__icon">
                    {isIncome ? '💼' : '🍔'}
                  </div>

                  <div className="movement-card__content">
                    <strong>{movement.category}</strong>
                    <div className="movement-card__meta">
                      <div>{new Date(movement.dateISO).toLocaleDateString()}</div>
                      <div>p. m.</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      className={`movement-card__amount ${
                        isIncome
                          ? 'movement-card__amount--income'
                          : 'movement-card__amount--expense'
                      }`}
                    >
                      {isIncome ? '+' : '-'}
                      {currency(movement.amount)}
                    </div>

                    {!isIncome && index === 0 ? (
                      <div className="movement-card__actions">
                        <button type="button" className="movement-card__action">
                          <Pencil size={12} />
                        </button>
                        <button
                          type="button"
                          className="movement-card__action movement-card__action--delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};