/**
 * Composant Form Input
 * =====================
 */

import React from 'react';

export default function FormInput({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  ...props
}) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="label-base">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input-base ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
