'use client';

import { useState } from 'react';
import { Prize } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface PrizeModalProps {
  isOpen: boolean;
  prize: Prize | null;
  prizeCode?: string;
  onClose: () => void;
}

export default function PrizeModal({ isOpen, prize, prizeCode, onClose }: PrizeModalProps) {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit address to API
      const response = await fetch('/api/send-prize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prizeId: prize?.id,
          address,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting address:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!prize) return null;

  const isTryAgain = prize.name === 'Try Again';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>

            <div className="text-center">
              {isTryAgain ? (
                <>
                  <div className="text-6xl mb-4">😔</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Better Luck Next Time!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Don't worry! Check your email for exclusive offers.
                  </p>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Congratulations!
                  </h2>
                  <p className="text-gray-600 mb-4">You won:</p>
                  <div
                    className="text-2xl font-bold mb-4 py-3 px-6 rounded-lg"
                    style={{ backgroundColor: prize.color + '20', color: prize.color }}
                  >
                    {prize.name}
                  </div>

                  {prize.type === 'digital' && prizeCode && (
                    <div className="bg-gray-100 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600 mb-2">Your Prize Code:</p>
                      <div className="text-2xl font-mono font-bold text-purple-600 tracking-wider">
                        {prizeCode}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        This code has been sent to your email
                      </p>
                    </div>
                  )}

                  {prize.type === 'physical' && !showAddressForm && !submitted && (
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
                    >
                      Enter Shipping Address
                    </button>
                  )}

                  {prize.type === 'physical' && showAddressForm && !submitted && (
                    <form onSubmit={handleAddressSubmit} className="mt-4 space-y-3 text-left">
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800"
                        required
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="City"
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800"
                          required
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={address.state}
                          onChange={(e) => setAddress({ ...address, state: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="ZIP Code"
                          value={address.zip}
                          onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Country"
                          value={address.country}
                          onChange={(e) => setAddress({ ...address, country: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Address'}
                      </button>
                    </form>
                  )}

                  {submitted && (
                    <div className="bg-green-100 text-green-800 rounded-lg p-4 mt-4">
                      <p className="font-semibold">Address Submitted!</p>
                      <p className="text-sm">We'll ship your prize soon.</p>
                    </div>
                  )}
                </>
              )}

              <button
                onClick={onClose}
                className="mt-6 text-gray-600 hover:text-gray-800 font-medium"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
