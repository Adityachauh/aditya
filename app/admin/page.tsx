'use client';

import { useState, useEffect } from 'react';
import { Prize, AdminStats } from '@/types';

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [editingPrize, setEditingPrize] = useState<Prize | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
      setPrizes(data.prizes);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePrize = async (prize: Prize) => {
    try {
      const response = await fetch('/api/prizes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prize),
      });

      if (response.ok) {
        fetchStats();
        setEditingPrize(null);
      }
    } catch (error) {
      console.error('Error updating prize:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage prizes and view statistics
          </p>
          <a
            href="/"
            className="inline-block mt-4 text-purple-600 hover:text-purple-800 font-medium"
          >
            ← Back to Spin to Win
          </a>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-gray-600 text-sm font-medium mb-1">
              Total Spins
            </div>
            <div className="text-4xl font-bold text-purple-600">
              {stats?.totalSpins || 0}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-gray-600 text-sm font-medium mb-1">
              Emails Collected
            </div>
            <div className="text-4xl font-bold text-pink-600">
              {stats?.emailsCollected || 0}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-gray-600 text-sm font-medium mb-1">
              Prizes Distributed
            </div>
            <div className="text-4xl font-bold text-orange-600">
              {stats?.prizesDistributed || 0}
            </div>
          </div>
        </div>

        {/* Prizes Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Prize Management
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                    Prize Name
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                    Probability
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                    Quantity
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                    Remaining
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {prizes.map((prize) => (
                  <tr key={prize.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: prize.color }}
                        ></div>
                        <span className="font-medium text-gray-800">
                          {prize.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                        {prize.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {prize.probability}%
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {prize.quantity}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-semibold ${
                          prize.remaining === 0
                            ? 'text-red-600'
                            : prize.remaining < 10
                            ? 'text-orange-600'
                            : 'text-green-600'
                        }`}
                      >
                        {prize.remaining}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setEditingPrize(prize)}
                        className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editingPrize && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Edit Prize
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prize Name
                  </label>
                  <input
                    type="text"
                    value={editingPrize.name}
                    onChange={(e) =>
                      setEditingPrize({ ...editingPrize, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Probability (%)
                  </label>
                  <input
                    type="number"
                    value={editingPrize.probability}
                    onChange={(e) =>
                      setEditingPrize({
                        ...editingPrize,
                        probability: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Remaining Quantity
                  </label>
                  <input
                    type="number"
                    value={editingPrize.remaining}
                    onChange={(e) =>
                      setEditingPrize({
                        ...editingPrize,
                        remaining: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800"
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleUpdatePrize(editingPrize)}
                    className="flex-1 bg-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingPrize(null)}
                    className="flex-1 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
