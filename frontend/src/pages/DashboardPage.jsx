/**
 * Page Tableau de Bord
 * ======================
 * 
 * Page d'accueil avec vue d'ensemble
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuthStore } from '../context/authStore';
import { devisService, factureService, bonCommandeService, bonVersionmentService } from '../services/api';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [totals, setTotals] = useState({ devis: 0, factures: 0, bonsCommande: 0, bonsVersement: 0 });

  useEffect(() => {
    const formatCount = (response) => {
      if (!response) return 0;
      if (typeof response.pagination?.total === 'number') return response.pagination.total;
      if (Array.isArray(response.data)) return response.data.length;
      if (Array.isArray(response)) return response.length;
      return 0;
    };

    const loadTotals = async () => {
      try {
        const [devisResp, facturesResp, bonsResp, versementResp] = await Promise.all([
          devisService.list(1, 1),
          factureService.list(1, 1),
          bonCommandeService.list(1, 1),
          bonVersionmentService.list(1, 1),
        ]);

        setTotals({
          devis: formatCount(devisResp),
          factures: formatCount(facturesResp),
          bonsCommande: formatCount(bonsResp),
          bonsVersement: formatCount(versementResp),
        });
      } catch (error) {
        console.error('Erreur chargement totaux dashboard', error);
      }
    };

    loadTotals();
  }, []);

  const quickActions = [
    { title: 'Devis', description: 'Créer ou consulter vos devis clients', route: '/devis', color: 'from-blue-500 to-blue-700' },
    { title: 'Factures', description: 'Créer ou consulter vos factures', route: '/factures', color: 'from-green-500 to-green-700' },
    { title: 'Bons de commande', description: 'Créer ou consulter vos bons de commande', route: '/bons-commande', color: 'from-amber-500 to-orange-600' },
    { title: 'Bons de versement', description: 'Créer ou consulter vos bons de versement', route: '/bons-versement', color: 'from-purple-500 to-violet-700' },
  ];

  return (
    <Layout>
      <div className="container-base">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Bienvenue, {user?.prenom || 'Utilisateur'} !
        </h1>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Devis" value={totals.devis} color="blue" />
          <StatCard title="Factures" value={totals.factures} color="green" />
          <StatCard title="Bons Commande" value={totals.bonsCommande} color="yellow" />
          <StatCard title="Bons Versement" value={totals.bonsVersement} color="purple" />
        </div>

        {/* Message bienvenue */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action) => (
            <button
              key={action.title}
              type="button"
              onClick={() => navigate(action.route)}
              className={`rounded-xl p-6 text-left text-white shadow-md bg-gradient-to-br ${action.color} hover:opacity-95 transition`}
            >
              <h3 className="text-xl font-semibold">{action.title}</h3>
              <p className="mt-2 text-sm opacity-90">{action.description}</p>
            </button>
          ))}
        </div>

        <div className="card bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Bienvenue dans votre ERP</h2>
          <p className="text-gray-700 mb-4">
            Cette application vous permet de gérer :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Les devis de vos projets d'aménagement</li>
            <li>Les factures de vos clients</li>
            <li>Les bons de commande auprès de vos fournisseurs</li>
            <li>Les bons de versement pour les versements clients</li>
          </ul>
          <p className="text-sm text-gray-600 mt-6">
            📌 Version 1.0.0 - Architecture de base établie
          </p>
        </div>
      </div>
    </Layout>
  );
}

/**
 * Composant Carte Statistique
 */
function StatCard({ title, value, color }) {
  const colors = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    yellow: 'from-yellow-400 to-yellow-600',
    purple: 'from-purple-400 to-purple-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} text-white rounded-lg shadow-md p-6`}>
      <p className="text-sm opacity-90 mb-2">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
