import { Bell, Settings, CircleHelp } from 'lucide-react';
import type { ReactNode } from 'react';

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
              <button type="button" className="icon-btn" aria-label="Notificaciones">
                <Bell size={16} />
              </button>
              <button type="button" className="icon-btn" aria-label="Ayuda">
                <CircleHelp size={16} />
              </button>
              <button type="button" className="icon-btn" aria-label="Configuración">
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