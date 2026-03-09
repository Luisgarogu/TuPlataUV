import { Bell, Settings, CircleHelp } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type MobileShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showDashboardHeader?: boolean;
};

export const MobileShell = ({
  title,
  subtitle,
  children,
  showDashboardHeader = false,
}: MobileShellProps) => {
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };

    if (notificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationsOpen]);

  return (
    <main className="mobile-shell">
      <div className="mobile-shell__inner">
        <header className="mobile-header">
          <div className="mobile-header__left">
            <div className="mobile-header__logo">
              <img src="/logo-tu-plata.png" alt="Tu Plata, Sin Drama" />
            </div>

            <div className="mobile-header__text">
              <strong>{title}</strong>
              {subtitle ? <span>{subtitle}</span> : null}
            </div>
          </div>

          {showDashboardHeader ? (
            <div className="mobile-header__actions">
              <div className="notification-wrap" ref={notificationRef}>
                <button
                  type="button"
                  className="icon-btn"
                  aria-label="Notificaciones"
                  onClick={() => setNotificationsOpen((prev) => !prev)}
                >
                  <Bell size={16} />
                </button>

                {notificationsOpen ? (
                  <div className="notification-popover">
                    <div className="notification-popover__title">
                      Notificaciones
                    </div>
                    <div className="notification-popover__body">
                      Sin novedades
                    </div>
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                className="icon-btn"
                aria-label="Ayuda"
                onClick={() => navigate('/help')}
              >
                <CircleHelp size={16} />
              </button>

              <button
                type="button"
                className="icon-btn"
                aria-label="Configuración"
                onClick={() => navigate('/settings')}
              >
                <Settings size={16} />
              </button>
            </div>
          ) : null}
        </header>

        <section className="mobile-content">{children}</section>
      </div>
    </main>
  );
};