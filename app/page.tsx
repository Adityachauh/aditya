'use client';

import { useState, useEffect } from 'react';
import PrizeWheel from '@/components/PrizeWheel';
import EmailForm from '@/components/EmailForm';
import PrizeModal from '@/components/PrizeModal';
import { Prize } from '@/types';
import Cookies from 'js-cookie';

export default function Home() {
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [prizeCode, setPrizeCode] = useState<string | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already spun (cookie check)
    const hasSpun = Cookies.get('has_spun');
    if (hasSpun) {
      setError('You have already participated. Only one spin per person is allowed.');
    }

    // Fetch prizes
    fetchPrizes();

    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Spin to Win',
        page_path: '/',
      });
    }
  }, []);

  const fetchPrizes = async () => {
    try {
      const response = await fetch('/api/prizes');
      const data = await response.json();
      setPrizes(data.prizes);
    } catch (error) {
      console.error('Error fetching prizes:', error);
    }
  };

  const handleEmailSubmit = async (email: string, name?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to submit email');
        return;
      }

      setUserEmail(email);
      setHasSubmittedEmail(true);

      // Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'email_submit', {
          event_category: 'engagement',
          event_label: 'Email Submitted',
        });
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error submitting email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setError(null);

    try {
      const response = await fetch('/api/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to spin');
        setIsSpinning(false);
        return;
      }

      setWonPrize(data.prize);
      setPrizeCode(data.code);

      // Set cookie to prevent multiple spins
      Cookies.set('has_spun', 'true', { expires: 365 });

      // Store in localStorage as backup
      localStorage.setItem('has_spun', 'true');
      localStorage.setItem('user_email', userEmail);

      // Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'wheel_spin', {
          event_category: 'engagement',
          event_label: 'Wheel Spun',
        });

        (window as any).gtag('event', 'prize_won', {
          event_category: 'conversion',
          event_label: data.prize.name,
          value: data.prize.id,
        });
      }

      // Show modal after spin animation completes
      setTimeout(() => {
        setShowModal(true);
        setIsSpinning(false);
      }, 4500);
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error spinning:', error);
      setIsSpinning(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎡 Spin to Win! 🎁
          </h1>
          <p className="text-xl text-white drop-shadow-md">
            Try your luck and win amazing prizes!
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col items-center gap-8">
          {!hasSubmittedEmail ? (
            <EmailForm onSubmit={handleEmailSubmit} isLoading={isLoading} />
          ) : (
            <>
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <PrizeWheel
                  prizes={prizes}
                  onSpinComplete={(prize) => {}}
                  isSpinning={isSpinning}
                />
                
                <div className="text-center mt-6">
                  <button
                    onClick={handleSpin}
                    disabled={isSpinning || !!error}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-xl py-4 px-12 rounded-full hover:from-yellow-500 hover:to-orange-600 transform hover:scale-110 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-2xl"
                  >
                    {isSpinning ? '🎡 Spinning...' : '🎯 SPIN NOW!'}
                  </button>
                </div>
              </div>

              <div className="text-white text-center max-w-md">
                <p className="text-sm opacity-90">
                  ✨ One spin per person • Check your email for your prize • Good luck! ✨
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white text-sm opacity-75">
          <p>© 2025 Spin to Win. All rights reserved.</p>
          <p className="mt-2">
            <a href="/admin" className="hover:underline">Admin Dashboard</a>
          </p>
        </div>
      </div>

      {/* Prize Modal */}
      <PrizeModal
        isOpen={showModal}
        prize={wonPrize}
        prizeCode={prizeCode}
        onClose={() => setShowModal(false)}
      />
    </main>
  );
}
