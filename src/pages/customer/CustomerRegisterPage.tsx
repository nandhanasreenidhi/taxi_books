import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User, Phone, Mail, MapPin, Tag, ShieldCheck } from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { Button } from '../../components/common/Button';
import { useCustomerStore } from '../../store/useCustomerStore';
import { APP_CONFIG } from '../../app/config';

export const CustomerRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateProfile } = useCustomerStore();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(APP_CONFIG.brand.operatingCities[0]);
  const [referral, setReferral] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && mobile) {
      updateProfile({
        name,
        phone: `+91 ${mobile}`,
        email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@wayvia-user.in`,
        city,
      });
      navigate('/customer');
    }
  };

  return (
    <div className="min-h-screen bg-ivory-100 flex flex-col justify-between text-charcoal-700">
      {/* Header */}
      <header className="py-5 px-4 sm:px-8 bg-white/70 backdrop-blur-md border-b border-ivory-300">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to="/customer/login"
            className="flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
          <Logo variant="dark" />
        </div>
      </header>

      {/* Main Register Form */}
      <main className="max-w-md mx-auto w-full px-4 py-12 flex-1 flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-floating">
          <div className="text-center mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-mint-700 bg-mint-100 px-3 py-1 rounded-full">
              New Customer Account
            </span>
            <h1 className="text-2xl font-display font-extrabold text-navy-900 mt-2">
              Join WAYVIA India
            </h1>
            <p className="text-xs text-charcoal-500 mt-1">
              Enjoy executive chauffeur mobility with zero surge surprises.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900 focus:outline-none focus:border-navy-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Indian Mobile Number</label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center gap-1 text-xs font-bold text-navy-900 border-r border-ivory-300 pr-2">
                  <span>🇮🇳 +91</span>
                </div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-20 pr-3 py-2.5 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900 focus:outline-none focus:border-navy-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Email (Optional)</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900 focus:outline-none focus:border-navy-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Primary Operating City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900 focus:outline-none"
              >
                {APP_CONFIG.brand.operatingCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Referral Code (Optional)</label>
              <div className="relative">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="text"
                  placeholder="e.g. WAYVIAFIRST"
                  value={referral}
                  onChange={(e) => setReferral(e.target.value.toUpperCase())}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" fullWidth size="md" icon={ArrowRight}>
                Create Account & Get ₹150 Bonus
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-ivory-200 text-center text-xs text-charcoal-500">
            Already have an account?{' '}
            <Link to="/customer/login" className="font-bold text-navy-900 hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-charcoal-400">
        WAYVIA Mobility India • Your journey. Your choice. Your way.
      </footer>
    </div>
  );
};

export default CustomerRegisterPage;

