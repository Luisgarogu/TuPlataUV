import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

type ActionCardProps = {
  to: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  colorClass: string;
};

export const ActionCard = ({
  to,
  title,
  subtitle,
  icon: Icon,
  colorClass,
}: ActionCardProps) => {
  return (
    <Link to={to} className="dashboard-action-card">
      <div className={`dashboard-action-card__icon ${colorClass}`}>
        <Icon size={17} strokeWidth={2.3} />
      </div>

      <div className="dashboard-action-card__body">
        <div className="dashboard-action-card__title">{title}</div>
        <div className="dashboard-action-card__subtitle">{subtitle}</div>
      </div>
    </Link>
  );
};