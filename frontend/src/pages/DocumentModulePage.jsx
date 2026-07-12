import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function DocumentModulePage({
  title,
  description,
  icon,
  createRoute,
  listRoute,
  createLabel,
  listLabel,
  accentClass = 'from-blue-500 to-blue-700',
}) {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container-base">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-6 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Retour au tableau de bord
        </button>

        <div className={`rounded-2xl p-8 text-white shadow-lg bg-gradient-to-br ${accentClass}`}>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-3xl">
              {icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="mt-2 max-w-2xl text-sm text-white/90">{description}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <button
            type="button"
            onClick={() => navigate(createRoute)}
            className="rounded-2xl border border-gray-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-2xl">
              ✏️
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{createLabel}</h2>
            <p className="mt-2 text-sm text-gray-600">
              Créez un nouveau document directement à partir de cette section.
            </p>
          </button>

          <button
            type="button"
            onClick={() => navigate(listRoute)}
            className="rounded-2xl border border-gray-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-2xl">
              📋
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{listLabel}</h2>
            <p className="mt-2 text-sm text-gray-600">
              Consultez et gérez tous les documents déjà enregistrés.
            </p>
          </button>
        </div>
      </div>
    </Layout>
  );
}
