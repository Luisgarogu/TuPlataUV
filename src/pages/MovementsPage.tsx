import { ArrowLeft, Pencil, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { currency } from '../utils/format';
import '../styles/feature-pages.css';

type FilterType = 'all' | 'expense' | 'income';

type UIMovement = {
  uiId: string;
  kind: 'income' | 'expense';
  category: string;
  amount: number;
  dateISO: string;
  description?: string;
};

export const MovementsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { movements } = useApp();

  const [filter, setFilter] = useState<FilterType>('all');
  const [localMovements, setLocalMovements] = useState<UIMovement[]>([]);
  const [editingMovement, setEditingMovement] = useState<UIMovement | null>(null);
  const [deletingMovement, setDeletingMovement] = useState<UIMovement | null>(null);

  const [editCategory, setEditCategory] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDate, setEditDate] = useState('');

  const handleBack = () => {
    if (location.state?.fromCreatedMovement) {
      navigate('/dashboard');
      return;
    }

    navigate(-1);
  };
  useEffect(() => {
    const mapped: UIMovement[] = movements.map((movement, index) => ({
      uiId: `${movement.dateISO}-${movement.amount}-${movement.category}-${index}`,
      kind: movement.kind,
      category: movement.category,
      amount: movement.amount,
      dateISO: movement.dateISO,
      description: movement.description ?? '',
    }));

    setLocalMovements(mapped);
  }, [movements]);

  const filteredMovements = useMemo(() => {
    if (filter === 'all') return localMovements;
    return localMovements.filter((m) => m.kind === filter);
  }, [filter, localMovements]);

  const getMovementEmoji = (movement: UIMovement) => {
    const category = movement.category.toLowerCase();

    if (movement.kind === 'income') {
      if (category.includes('familia')) return '👨‍👩‍👧‍👦';
      if (category.includes('beca')) return '🎓';
      if (category.includes('trabajo')) return '💼';
      return '💰';
    }

    if (category.includes('aliment')) return '🍔';
    if (category.includes('transporte')) return '🚌';
    if (category.includes('estudio')) return '📚';
    if (category.includes('entretenimiento')) return '🎮';
    if (category.includes('salud')) return '⚕️';
    return '📝';
  };

  const openEditModal = (movement: UIMovement) => {
    setEditingMovement(movement);
    setEditCategory(movement.category);
    setEditAmount(String(movement.amount));
    setEditDescription(movement.description ?? '');
    setEditDate(movement.dateISO.slice(0, 10));
  };

  const closeEditModal = () => {
    setEditingMovement(null);
    setEditCategory('');
    setEditAmount('');
    setEditDescription('');
    setEditDate('');
  };

  const saveEdit = () => {
    if (!editingMovement) return;

    setLocalMovements((prev) =>
      prev.map((item) =>
        item.uiId === editingMovement.uiId
          ? {
            ...item,
            category: editCategory.trim() || item.category,
            amount: Number(editAmount.replace(/\D/g, '')) || item.amount,
            description: editDescription,
            dateISO: editDate
              ? new Date(editDate).toISOString()
              : item.dateISO,
          }
          : item
      )
    );

    closeEditModal();
  };

  const openDeleteModal = (movement: UIMovement) => {
    setDeletingMovement(movement);
  };

  const closeDeleteModal = () => {
    setDeletingMovement(null);
  };

  const confirmDelete = () => {
    if (!deletingMovement) return;

    setLocalMovements((prev) =>
      prev.filter((item) => item.uiId !== deletingMovement.uiId)
    );

    closeDeleteModal();
  };

  return (
    <main className="feature-screen">
      <div className="feature-shell">
        <header className="feature-topbar">
          <div className="feature-topbar__left">
            <button className="feature-back" onClick={handleBack} type="button">
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
              Todos ({localMovements.length})
            </button>

            <button
              className={`movements-tab ${filter === 'expense' ? 'movements-tab--active' : ''}`}
              onClick={() => setFilter('expense')}
              type="button"
            >
              Gastos ({localMovements.filter((m) => m.kind === 'expense').length})
            </button>

            <button
              className={`movements-tab ${filter === 'income' ? 'movements-tab--active' : ''}`}
              onClick={() => setFilter('income')}
              type="button"
            >
              Ingresos ({localMovements.filter((m) => m.kind === 'income').length})
            </button>
          </div>

          <h2 className="movements-section-title">Todos los movimientos</h2>

          <div className="movements-list">
            {filteredMovements.map((movement) => {
              const isIncome = movement.kind === 'income';

              return (
                <div
                  key={movement.uiId}
                  className={`movement-card ${isIncome ? 'movement-card--income' : ''}`}
                >
                  <div className="movement-card__icon">
                    {getMovementEmoji(movement)}
                  </div>

                  <div className="movement-card__content">
                    <strong>{movement.category}</strong>
                    <div className="movement-card__meta">
                      <div>{new Date(movement.dateISO).toLocaleDateString()}</div>
                      <div>{movement.description || 'Sin descripción'}</div>
                    </div>
                  </div>

                  <div className="movement-card__right">
                    <div
                      className={`movement-card__amount ${isIncome
                        ? 'movement-card__amount--income'
                        : 'movement-card__amount--expense'
                        }`}
                    >
                      {isIncome ? '+' : '-'}
                      {currency(movement.amount)}
                    </div>

                    <div className="movement-card__actions">
                      <button
                        type="button"
                        className="movement-card__action"
                        onClick={() => openEditModal(movement)}
                        aria-label="Editar movimiento"
                      >
                        <Pencil size={12} />
                      </button>

                      <button
                        type="button"
                        className="movement-card__action movement-card__action--delete"
                        onClick={() => openDeleteModal(movement)}
                        aria-label="Eliminar movimiento"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {editingMovement ? (
          <div className="movement-modal-overlay" onClick={closeEditModal}>
            <div
              className="movement-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="movement-modal__close"
                onClick={closeEditModal}
              >
                <X size={16} />
              </button>

              <h3>Editar movimiento</h3>

              <div className="movement-modal__form">
                <label>Categoría</label>
                <input
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                />

                <label>Monto</label>
                <input
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                />

                <label>Fecha</label>
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                />

                <label>Descripción</label>
                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Opcional"
                />
              </div>

              <div className="movement-modal__actions">
                <button
                  type="button"
                  className="movement-modal__btn movement-modal__btn--secondary"
                  onClick={closeEditModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="movement-modal__btn movement-modal__btn--primary"
                  onClick={saveEdit}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {deletingMovement ? (
          <div className="movement-modal-overlay" onClick={closeDeleteModal}>
            <div
              className="movement-modal movement-modal--danger"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="movement-modal__close"
                onClick={closeDeleteModal}
              >
                <X size={16} />
              </button>

              <h3>Eliminar movimiento</h3>
              <p className="movement-modal__text">
                ¿Estás seguro que deseas eliminar este movimiento de <strong>{deletingMovement.category}</strong>?
                <br />
                <br />
                Esta accion es irreversible
              </p>

              <div className="movement-modal__actions">
                <button
                  type="button"
                  className="movement-modal__btn movement-modal__btn--secondary"
                  onClick={closeDeleteModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="movement-modal__btn movement-modal__btn--danger"
                  onClick={confirmDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
};