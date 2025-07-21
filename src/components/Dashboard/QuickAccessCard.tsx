import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Card } from '../Common/Card';

interface QuickAccessCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  count?: number;
  onClick: () => void;
}

export function QuickAccessCard({
  title,
  subtitle,
  icon: Icon,
  color,
  count,
  onClick
}: QuickAccessCardProps) {
  return (
    <Card onClick={onClick} className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
          {count !== undefined && (
            <div className="mt-3">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {count}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </Card>
  );
}