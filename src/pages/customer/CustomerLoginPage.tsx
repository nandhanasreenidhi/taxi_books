import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { Button } from '../../components/common/Button';

export const CustomerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [otp, setOtp] = useState('');
  const [demoOtpHint, setDemoOtpHint] = useState<string | null>(null);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setStep('otp');
      setDemoOtpHint('4821');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept 4821 or any 4-digit OTP for testing demo
    navigate('/customer');
  };

  const handleOneClickDemo = () => {
    navigate('/customer');
  };

  return (
    <div className="min-h-screen bg-ivory-100 flex flex-col justify-between text-charcoal-700">
      {/* Header */}
      <header className="py-5 px-4 sm:px-8 bg-white/70 backdrop-blur-md border-b border-ivory-300">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>WAYVIA Home</span>
          </Link>
          <Logo variant="dark" />
        </div>
      </header>

      {/* Main Form Container */}
      <main className="max-w-md mx-auto w-full px-4 py-12 flex-1 flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-floating">
          <div className="text-center mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-mint-700 bg-mint-100 px-3 py-1 rounded-full">
              Customer Portal Login
            </span>
            <h1 className="text-2xl font-display font-extrabold text-navy-900 mt-2">
              Welcome to WAYVIA
            </h1>
            <p className="text-xs text-charcoal-500 mt-1">
              {step === 'mobile'
                ? 'Enter your Indian mobile number to receive a secure OTP'
                : `Enter the 4-digit verification code sent to +91 ${mobileNumber}`}
            </p>
          </div>

          {step === 'mobile' ? (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Mobile Number
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex items-center gap-1 text-xs font-bold text-navy-900 border-r border-ivory-300 pr-2">
                    <span>🇮🇳 +91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="w-full pl-20 pr-4 py-3 rounded-xl border border-ivory-300 bg-ivory-50/70 text-sm font-bold text-navy-900 tracking-wider focus:outline-none focus:border-navy-900"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" fullWidth size="md" icon={ArrowRight}>
                Get Login OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {demoOtpHint && (
                <div className="p-3 rounded-xl bg-mint-50 border border-mint-200 text-xs text-mint-800 text-center font-bold">
                  Demo SMS OTP: <span className="font-mono text-sm underline">{demoOtpHint}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  4-Digit OTP Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="4 8 2 1"
                  className="w-full text-center py-3 rounded-xl border border-ivory-300 bg-ivory-50 text-xl font-mono font-black text-navy-900 tracking-widest focus:outline-none focus:border-navy-900"
                />
              </div>

              <Button type="submit" variant="mint" fullWidth size="md" className="font-bold text-navy-950">
                Verify & Enter Portal
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('mobile')}
                  className="text-xs font-semibold text-charcoal-500 hover:text-navy-900 hover:underline"
                >
                  Change mobile number
                </button>
              </div>
            </form>
          )}

          {/* One-Click Demo Access Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-ivory-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold text-charcoal-400">
              <span className="bg-white px-2">Instant Demo Testing</span>
            </div>
          </div>

          <button
            onClick={handleOneClickDemo}
            className="w-full py-2.5 px-4 rounded-xl bg-ivory-100 hover:bg-mint-100 hover:text-navy-900 text-navy-900 text-xs font-bold flex items-center justify-center gap-2 border border-ivory-300 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-mint-600" />
            <span>1-Click Demo Login (Priya Sundaram)</span>
          </button>

          <div className="mt-6 pt-4 border-t border-ivory-200 text-center text-xs text-charcoal-500">
            Don't have an account?{' '}
            <Link to="/customer/register" className="font-bold text-navy-900 hover:underline">
              Register here
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-charcoal-400">
        WAYVIA Mobility India • Bank-Grade 256-bit Security
      </footer>
    </div>
  );
};

export default CustomerLoginPage;

