import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Plus,
  Trash2,
  CheckCircle2,
  Sliders,
  Sparkles,
  Save,
  VolumeX,
  Wind,
  Globe,
  X,
} from 'lucide-react';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { useCustomerStore } from '../../store/useCustomerStore';
import { SavedAddress, EmergencyContact } from '../../types';
import { Button } from '../../components/common/Button';

export const CustomerProfilePage: React.FC = () => {
  const {
    profile,
    updateProfile,
    addSavedAddress,
    deleteSavedAddress,
    addEmergencyContact,
    deleteEmergencyContact,
  } = useCustomerStore();

  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [city, setCity] = useState(profile.city);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newTag, setNewTag] = useState<'home' | 'work' | 'airport' | 'other'>('home');
  const [newAddressText, setNewAddressText] = useState('');
  const [newLandmark, setNewLandmark] = useState('');
  const [newPincode, setNewPincode] = useState('600001');

  // New Emergency Contact Modal State
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('Spouse');
  const [newContactPhone, setNewContactPhone] = useState('+91 9');

  // Preferences State
  const [acPref, setAcPref] = useState(profile.preferences.acPreference);
  const [quiet, setQuiet] = useState(profile.preferences.quietRide);
  const [luggageAssist, setLuggageAssist] = useState(profile.preferences.assistLuggage);
  const [langPref, setLangPref] = useState(profile.preferences.preferredLanguage);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      email,
      city,
      preferences: {
        acPreference: acPref,
        quietRide: quiet,
        assistLuggage: luggageAssist,
        preferredLanguage: langPref,
      },
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel || !newAddressText) return;
    addSavedAddress({
      label: newLabel,
      tag: newTag,
      address: newAddressText,
      landmark: newLandmark,
      city,
      pincode: newPincode,
    });
    setIsAddressModalOpen(false);
    setNewLabel('');
    setNewAddressText('');
    setNewLandmark('');
  };

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;
    addEmergencyContact({
      name: newContactName,
      relation: newContactRelation,
      phone: newContactPhone,
      alertOnRideStart: true,
    });
    setIsContactModalOpen(false);
    setNewContactName('');
    setNewContactPhone('+91 9');
  };

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
            Account Profile & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Manage your personal verification details, saved hubs, emergency safety alerts, and ride amenities.
          </p>
        </div>

        {/* Success Alert Banner */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-mint-100 border border-mint-300 text-mint-900 text-xs font-bold flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-mint-700" />
              <span>Profile updates and ride preferences saved successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Personal Details Form */}
        <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-sm space-y-6">
          <div className="flex items-center gap-4 border-b border-ivory-200 pb-5">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-mint-400 shadow-sm"
            />
            <div>
              <h3 className="text-lg font-bold text-navy-900">{profile.name}</h3>
              <p className="text-xs text-charcoal-400">WAYVIA {profile.memberTier} Member</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900 focus:outline-none focus:border-navy-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Indian Mobile (+91)</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900 focus:outline-none focus:border-navy-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900 focus:outline-none focus:border-navy-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Primary Operating City</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900 focus:outline-none focus:border-navy-900"
                />
              </div>
            </div>
          </div>

          {/* Ride Comfort & Amenity Preferences */}
          <div className="pt-4 border-t border-ivory-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-4">
              Chauffeur Ride Preferences
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-navy-900">
                  <Wind className="w-4 h-4 text-mint-600" />
                  <span>Cabin Climate & AC</span>
                </div>
                <div className="flex gap-2">
                  {(['chill', 'moderate', 'off'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setAcPref(mode)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                        acPref === mode
                          ? 'bg-navy-900 text-ivory-100'
                          : 'bg-white border border-ivory-300 text-charcoal-600 hover:bg-ivory-100'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-navy-900">
                  <VolumeX className="w-4 h-4 text-gold-600" />
                  <span>Quiet Ride Preference</span>
                </div>
                <button
                  type="button"
                  onClick={() => setQuiet(!quiet)}
                  className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                    quiet
                      ? 'bg-mint-200 text-navy-900 border border-mint-400'
                      : 'bg-white border border-ivory-300 text-charcoal-600'
                  }`}
                >
                  {quiet ? 'Silent Restful Ride Requested' : 'Chauffeur May Conversate'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" size="md" icon={Save}>
              Save Profile Changes
            </Button>
          </div>
        </form>

        {/* Saved Addresses Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-navy-900">Saved Addresses & Locations</h3>
              <p className="text-xs text-charcoal-500">Quick-tap destinations for instant cab bookings</p>
            </div>
            <button
              onClick={() => setIsAddressModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-ivory-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {profile.savedAddresses.map((addr) => (
              <div
                key={addr.id}
                className="p-4 rounded-2xl bg-ivory-50/70 border border-ivory-200 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-navy-900">{addr.label}</span>
                    <span className="text-[10px] font-bold uppercase text-charcoal-400 bg-ivory-200 px-2 py-0.5 rounded">
                      {addr.tag}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">{addr.address}</p>
                  <p className="text-[11px] text-charcoal-400 mt-0.5">PIN: {addr.pincode}</p>
                </div>
                <button
                  onClick={() => deleteSavedAddress(addr.id)}
                  className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-navy-900">Emergency Safety Contacts</h3>
              <p className="text-xs text-charcoal-500">Auto-notified when SOS is triggered or during late night rides</p>
            </div>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-ivory-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Contact</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {profile.emergencyContacts.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="font-bold text-xs text-navy-900">{c.name}</div>
                  <div className="text-xs font-mono text-charcoal-600 mt-0.5">{c.phone}</div>
                  <div className="text-[10px] text-mint-700 font-bold mt-1">Alert on Ride Start: Active</div>
                </div>
                <button
                  onClick={() => deleteEmergencyContact(c.id)}
                  className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <AnimatePresence>
        {isAddressModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddressModalOpen(false)}
              className="fixed inset-0 bg-navy-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-floating border border-ivory-300 z-10"
            >
              <div className="flex items-center justify-between border-b border-ivory-200 pb-3 mb-4">
                <h3 className="text-lg font-bold text-navy-900">Save New Address</h3>
                <button
                  onClick={() => setIsAddressModalOpen(false)}
                  className="p-1 text-charcoal-400 hover:text-navy-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateAddress} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Label</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. In-Laws House or Gym"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Tag Category</label>
                  <select
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900"
                  >
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="airport">Airport Hub</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Full Street Address</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Building name, street, locality"
                    value={newAddressText}
                    onChange={(e) => setNewAddressText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">Landmark</label>
                    <input
                      type="text"
                      placeholder="e.g. Near Metro"
                      value={newLandmark}
                      onChange={(e) => setNewLandmark(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">PIN Code</label>
                    <input
                      type="text"
                      required
                      value={newPincode}
                      onChange={(e) => setNewPincode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900"
                    />
                  </div>
                </div>

                <Button type="submit" variant="primary" fullWidth size="md" className="mt-2 font-bold">
                  Save Address
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactModalOpen(false)}
              className="fixed inset-0 bg-navy-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-floating border border-ivory-300 z-10"
            >
              <div className="flex items-center justify-between border-b border-ivory-200 pb-3 mb-4">
                <h3 className="text-lg font-bold text-navy-900">Add Emergency Contact</h3>
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="p-1 text-charcoal-400 hover:text-navy-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateContact} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Contact Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Relation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sibling, Parent, Colleague"
                    value={newContactRelation}
                    onChange={(e) => setNewContactRelation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Indian Mobile (+91)</label>
                  <input
                    type="tel"
                    required
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900"
                  />
                </div>

                <Button type="submit" variant="primary" fullWidth size="md" className="mt-2 font-bold">
                  Save Safety Contact
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CustomerLayout>
  );
};

export default CustomerProfilePage;

