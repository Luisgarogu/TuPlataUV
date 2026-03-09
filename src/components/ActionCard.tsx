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
    <Link to={to} className="action-card">
      <div className={`action-card__icon ${colorClass}`}>
        <Icon size={17} strokeWidth={2.3} />
      </div>

      <div className="action-card__content">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
    </Link>
  );
};