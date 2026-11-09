import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wallet,
  PlusCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Smartphone,
  CreditCard,
  Building,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  X,
  Gift,
  Coins,
} from 'lucide-react';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { useCustomerStore } from '../../store/useCustomerStore';
import { Button } from '../../components/common/Button';
import { fadeInUp } from '../../styles/animations';

export const CustomerWalletPage: React.FC = () => {
  const { profile, walletTransactions, addWalletMoney } = useCustomerStore();

  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [addSuccess, setAddSuccess] = useState(false);

  const handleAddMoneySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customAmount ? parseFloat(customAmount) : topUpAmount;
    if (isNaN(amount) || amount <= 0) return;

    const methodName =
      selectedMethod === 'upi' ? 'UPI (GPay / PhonePe)' : selectedMethod === 'card' ? 'Debit/Credit Card' : 'NetBanking';

    addWalletMoney(amount, methodName);
    setAddSuccess(true);
    setTimeout(() => {
      setAddSuccess(false);
      setIsAddMoneyModalOpen(false);
      setCustomAmount('');
    }, 2000);
  };

  return (
    <CustomerLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
              WAYVIA Wallet & Rewards
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              One-touch digital transit payments with instant refunds on cancellations.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={PlusCircle}
            onClick={() => setIsAddMoneyModalOpen(true)}
            className="font-bold shadow-sm self-start sm:self-auto"
          >
            Add Money to Wallet
          </Button>
        </div>

        {/* 2 Big Balances Grid: Wallet Cash & Coins */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Wallet Balance Card (7 cols) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="md:col-span-7 bg-navy-950 text-ivory-100 rounded-3xl p-6 sm:p-8 border border-navy-800 shadow-floating relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-60 h-60 bg-mint-400/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-mint-300 flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  WAYVIA Digital Balance
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-mint-950 text-mint-300 border border-mint-500/40">
                  Instant 1-Click Pay
                </span>
              </div>

              <div className="text-3xl sm:text-5xl font-black text-ivory-100 tracking-tight">
                ₹{profile.walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-ivory-300/70 mt-2">
                Usable across Instant Cabs, Airport Transfers, Outstation Trips & Rentals.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-navy-800 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-xs text-mint-300 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Zero-Cancellation Fee Protection Active</span>
              </div>

              <button
                onClick={() => setIsAddMoneyModalOpen(true)}
                className="py-2 px-4 rounded-xl bg-mint-300 hover:bg-mint-400 text-navy-950 text-xs font-bold transition-colors"
              >
                Top-Up Now
              </button>
            </div>
          </motion.div>

          {/* Loyalty Coins Card (5 cols) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-700 flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-gold-500" />
                  WAYVIA Coins
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-100 text-gold-800">
                  5 Coins / ₹100 Spent
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-navy-900">
                {profile.coins}{' '}
                <span className="text-xs font-bold text-charcoal-400 font-normal">Coins</span>
              </div>
              <p className="text-xs text-charcoal-500 mt-2 leading-relaxed">
                Redeem coins for flat ride discounts, airport lounge upgrades, and complimentary vehicle tier bumps.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-ivory-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-charcoal-600">
                Worth <strong className="text-navy-900">₹{(profile.coins * 0.5).toFixed(2)}</strong> in ride credits
              </span>
              <button
                onClick={() => alert('Demo Feature: Coins will auto-apply to your next booking discount!')}
                className="text-xs font-bold text-mint-700 hover:underline"
              >
                Redeem Voucher
              </button>
            </div>
          </motion.div>
        </div>

        {/* Transaction History Ledger */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-display font-extrabold text-navy-900">
                Wallet Ledger & Refund History
              </h2>
              <p className="text-xs text-charcoal-500">Itemized statement of top-ups, ride deductions, and refunds</p>
            </div>
            <span className="text-xs font-bold text-charcoal-400 bg-ivory-100 px-3 py-1 rounded-full">
              {walletTransactions.length} Transactions
            </span>
          </div>

          <div className="space-y-3">
            {walletTransactions.map((tx) => {
              const isCredit = tx.type === 'credit';
              return (
                <div
                  key={tx.id}
                  className="p-4 rounded-2xl bg-ivory-50/70 border border-ivory-200 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isCredit
                          ? 'bg-mint-100 text-mint-800 border border-mint-200'
                          : 'bg-charcoal-100 text-charcoal-700 border border-charcoal-200'
                      }`}
                    >
                      {isCredit ? (
                        <ArrowDownLeft className="w-5 h-5 text-mint-700" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-charcoal-700" />
                      )}
                    </div>

                    <div>
                      <div className="font-bold text-xs sm:text-sm text-navy-900">{tx.title}</div>
                      <div className="text-[11px] text-charcoal-500 mt-0.5">{tx.description}</div>
                      <div className="text-[10px] text-charcoal-400 mt-0.5">{tx.date}</div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div
                      className={`font-black text-sm sm:text-base ${
                        isCredit ? 'text-mint-700' : 'text-navy-900'
                      }`}
                    >
                      {isCredit ? '+' : '-'}₹{tx.amount.toFixed(2)}
                    </div>
                    <span className="text-[10px] font-bold text-charcoal-400 uppercase">
                      {tx.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Money Modal */}
      <AnimatePresence>
        {isAddMoneyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddMoneyModalOpen(false)}
              className="fixed inset-0 bg-navy-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-floating border border-ivory-300 z-10"
            >
              <div className="flex items-center justify-between border-b border-ivory-200 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-mint-600" />
                  <h3 className="text-lg font-bold text-navy-900">Add Money to Wallet</h3>
                </div>
                <button
                  onClick={() => setIsAddMoneyModalOpen(false)}
                  className="p-1 rounded-full text-charcoal-400 hover:text-navy-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {addSuccess ? (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-mint-100 text-mint-700 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-bold text-navy-900">Money Added Successfully!</h4>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Your digital wallet has been credited and is ready for 1-click checkout.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddMoneySubmit} className="space-y-4">
                  {/* Preset Amount Pills */}
                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-2">
                      Select Amount (INR)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[500, 1000, 2000, 5000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setTopUpAmount(amt);
                            setCustomAmount('');
                          }}
                          className={`py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                            topUpAmount === amt && !customAmount
                              ? 'bg-navy-900 text-ivory-100 shadow-sm'
                              : 'bg-ivory-100 border border-ivory-300 text-charcoal-700 hover:bg-ivory-200'
                          }`}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">
                      Or Custom Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-navy-900">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="100"
                        max="50000"
                        placeholder="Enter amount (min ₹100)"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-ivory-300 text-xs font-bold text-navy-900 focus:outline-none focus:border-navy-900"
                      />
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-2">
                      Indian Payment Source (Demo)
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: 'upi', label: 'UPI Instant Top-Up', sub: 'Google Pay, PhonePe, Paytm, BHIM', icon: Smartphone },
                        { id: 'card', label: 'Debit or Credit Card', sub: 'RuPay, Visa, Mastercard', icon: CreditCard },
                        { id: 'netbanking', label: 'Net Banking', sub: 'HDFC, ICICI, SBI, Axis, Kotak', icon: Building },
                      ].map((m) => {
                        const Icon = m.icon;
                        const isSelected = selectedMethod === m.id;
                        return (
                          <div
                            key={m.id}
                            onClick={() => setSelectedMethod(m.id as any)}
                            className={`p-3 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                              isSelected
                                ? 'border-navy-900 bg-mint-50/50'
                                : 'border-ivory-300 hover:bg-ivory-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className={`w-4 h-4 ${isSelected ? 'text-mint-700' : 'text-charcoal-400'}`} />
                              <div>
                                <div className="text-xs font-bold text-navy-900">{m.label}</div>
                                <div className="text-[10px] text-charcoal-400">{m.sub}</div>
                              </div>
                            </div>
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                isSelected ? 'border-navy-900 bg-navy-900' : 'border-ivory-400'
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 bg-mint-300 rounded-full" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="mint" fullWidth size="md" className="font-bold text-navy-950">
                      Add ₹{customAmount ? customAmount : topUpAmount} to Wallet
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CustomerLayout>
  );
};

export default CustomerWalletPage;

