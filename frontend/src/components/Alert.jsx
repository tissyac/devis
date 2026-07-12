/**
 * Composant Alert
 * ================
 */

import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function Alert({ type = 'info', message, onClose }) {
  const types = {
    success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: CheckCircle },
    error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: XCircle },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: AlertCircle },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: AlertCircle },
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bg} border ${config.border} rounded-lg p-4 flex items-start gap-3 mb-4`}>
      <Icon className={`${config.text} flex-shrink-0 mt-0.5`} size={20} />
      <div className="flex-1">
        <p className={`${config.text} text-sm`}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
}
