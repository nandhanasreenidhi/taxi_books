import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  PhoneCall,
  Mail,
  MessageSquare,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  Send,
  FileQuestion,
  Sparkles,
} from 'lucide-react';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { useCustomerStore } from '../../store/useCustomerStore';
import { APP_CONFIG } from '../../app/config';
import { Button } from '../../components/common/Button';

export const CustomerSupportPage: React.FC = () => {
  const { profile, bookings } = useCustomerStore();

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedIssueCategory, setSelectedIssueCategory] = useState('Lost Item in Cab');
  const [selectedBookingRef, setSelectedBookingRef] = useState(bookings[0]?.id || 'General Query');
  const [issueDescription, setIssueDescription] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // Live Concierge Demo Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([
    'WAYVIA Indian Concierge: Namaste Priya! How may we assist your journey today?',
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setIssueDescription('');
    }, 3000);
  };

  const handleSendLiveChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, `You: ${chatInput}`]);
    const reply = "WAYVIA Support Officer (Anand): We are looking into this immediately for your trip. Your reference ticket #TK-8819 is active.";
    setTimeout(() => {
      setChatMessages((prev) => [...prev, reply]);
    }, 1200);
    setChatInput('');
  };

  const faqs = [
    {
      q: 'How does airport flight delay tracking work?',
      a: 'When booking an Airport Transfer, enter your flight number (e.g. 6E-452 or AI-880). Our dispatch engine automatically monitors DGCA and radar flight feeds. If your flight arrives early or is delayed, your chauffeur pickup time shifts automatically with up to 45 minutes of complimentary terminal wait time.',
    },
    {
      q: 'Are tolls and state highway taxes included in outstation fares?',
      a: 'Yes, WAYVIA outstation fares compute indicative electronic Fastag tolls, driver day/night allowances, and inter-state permits upfront so you never face sudden toll halts or unexpected driver demands.',
    },
    {
      q: 'What is the WAYVIA Zero Cancellation Fee policy?',
      a: 'If you cancel your scheduled cab up to 10 minutes prior to pickup, 100% of your prepaid fare is credited back to your WAYVIA Wallet instantly. No penalties or surprise retention charges.',
    },
    {
      q: 'How do I identify and verify my assigned chauffeur?',
      a: 'Once your chauffeur is assigned, you will see their photo, verified license plate number (e.g. TN 09 BK 4521), vehicle model, and real-time live approach. Always verify the vehicle plate and share your 4-digit Ride OTP only after entering the car.',
    },
    {
      q: 'Can I pay the chauffeur with cash or UPI QR?',
      a: 'Yes. At the time of booking, choose "Cash to Driver" or "UPI / QR". When your journey concludes, the driver will present an automated UPI QR code or accept physical cash without any surcharge.',
    },
  ];

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
            24/7 Customer Care & Support
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Indian multi-lingual assistance available in English, Tamil, Hindi, and Kannada.
          </p>
        </div>

        {/* 3 Support Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href={`tel:${APP_CONFIG.brand.phoneSupport}`}
            className="p-5 rounded-3xl bg-white border border-ivory-300 shadow-sm hover:border-mint-400 transition-all flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-2xl bg-mint-100 text-mint-700 flex items-center justify-center mb-3">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-900">Direct Helpline</div>
              <div className="text-sm font-extrabold text-navy-900 mt-0.5">{APP_CONFIG.brand.phoneSupport}</div>
              <div className="text-[11px] text-charcoal-400 mt-1">Under 15s human connection</div>
            </div>
          </a>

          <div
            onClick={() => setChatOpen(true)}
            className="p-5 rounded-3xl bg-white border border-ivory-300 shadow-sm hover:border-mint-400 transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gold-100 text-gold-700 flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-900">Live Concierge Chat</div>
              <div className="text-sm font-extrabold text-navy-900 mt-0.5">Start Instant Chat</div>
              <div className="text-[11px] text-charcoal-400 mt-1">Available 24/7 in-app</div>
            </div>
          </div>

          <a
            href={`mailto:${APP_CONFIG.brand.supportEmail}`}
            className="p-5 rounded-3xl bg-white border border-ivory-300 shadow-sm hover:border-mint-400 transition-all flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-2xl bg-navy-100 text-navy-800 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-900">Official Email</div>
              <div className="text-sm font-extrabold text-navy-900 mt-0.5">{APP_CONFIG.brand.supportEmail}</div>
              <div className="text-[11px] text-charcoal-400 mt-1">GST & corporate billing team</div>
            </div>
          </a>
        </div>

        {/* Report an Issue with a Ride */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-sm">
          <div className="border-b border-ivory-200 pb-4 mb-6">
            <h3 className="text-lg font-bold text-navy-900">Report a Trip Issue / File a Ticket</h3>
            <p className="text-xs text-charcoal-500">
              Need help regarding a past or ongoing booking? Submit details for instant resolution.
            </p>
          </div>

          {ticketSubmitted ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-mint-100 text-mint-700 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-navy-900">Support Ticket Logged!</h4>
              <p className="text-xs text-charcoal-600 mt-1 max-w-sm mx-auto">
                Ticket #TK-{Math.floor(1000 + Math.random() * 9000)} has been created. A support officer will call your registered number (+91 98765 43210) within 15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Select Related Booking
                  </label>
                  <select
                    value={selectedBookingRef}
                    onChange={(e) => setSelectedBookingRef(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900 focus:outline-none"
                  >
                    {bookings.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.id} — {b.pickupLocation.split(',')[0]} ({b.date})
                      </option>
                    ))}
                    <option value="General Query">General Non-Ride Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Issue Category
                  </label>
                  <select
                    value={selectedIssueCategory}
                    onChange={(e) => setSelectedIssueCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900 focus:outline-none"
                  >
                    <option value="Lost Item in Cab">Lost Item / Left Belongings in Vehicle</option>
                    <option value="Fare Discrepancy">Fare or Fastag Toll Discrepancy</option>
                    <option value="Driver Behavior">Chauffeur Conduct / Route Feedback</option>
                    <option value="Invoice Request">GST Tax Invoice or Receipt Issue</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Describe what happened
                </label>
                <textarea
                  required
                  rows={3}
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="Provide details (e.g., left a brown laptop bag on the rear seat)..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900 focus:outline-none focus:border-navy-900"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" variant="primary" size="md">
                  Submit Support Ticket
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Indian Mobility FAQs Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-sm">
          <div className="border-b border-ivory-200 pb-4 mb-6">
            <h3 className="text-lg font-bold text-navy-900">Frequently Asked Questions</h3>
            <p className="text-xs text-charcoal-500">Everything you need to know about riding with WAYVIA</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-ivory-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-navy-900 flex items-center justify-between gap-3 hover:bg-ivory-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-mint-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-charcoal-400 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 text-xs text-charcoal-600 leading-relaxed border-t border-ivory-200 pt-3 bg-ivory-50/50"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Concierge Chat Floating Modal */}
      <AnimatePresence>
        {chatOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setChatOpen(false)}
              className="fixed inset-0 bg-navy-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-floating border border-ivory-300 z-10 flex flex-col h-[500px]"
            >
              <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-mint-100 text-mint-700 flex items-center justify-center font-bold">
                    WV
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-900">WAYVIA Indian Concierge</h4>
                    <span className="text-[10px] text-mint-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-mint-500 animate-pulse" />
                      Live Human Officer Online
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="p-1 rounded-full text-charcoal-400 hover:text-navy-900"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {chatMessages.map((msg, idx) => {
                  const isUser = msg.startsWith('You:');
                  return (
                    <div
                      key={idx}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                          isUser
                            ? 'bg-navy-900 text-ivory-100 rounded-br-none'
                            : 'bg-ivory-100 text-navy-900 rounded-bl-none border border-ivory-200'
                        }`}
                      >
                        {msg.replace('You: ', '').replace('WAYVIA Indian Concierge: ', '').replace('WAYVIA Support Officer (Anand): ', '')}
                      </div>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSendLiveChat} className="flex gap-2 pt-2 border-t border-ivory-200">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-ivory-300 text-xs text-navy-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-navy-900 text-ivory-100 hover:bg-navy-800"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CustomerLayout>
  );
};

export default CustomerSupportPage;

