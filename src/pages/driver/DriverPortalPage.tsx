import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Bell, CheckCircle2, Clock3, IndianRupee, MapPin, Navigation,
  Power, Route, ShieldCheck, Star, TrendingUp, UserRound, Wallet, XCircle,
  CarFront, Phone, ChevronRight, Gauge, CalendarDays
} from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { useCustomerStore } from '../../store/useCustomerStore';
import type { CustomerBooking } from '../../types';

const money = (value: number) => `₹${Math.round(value).toLocaleString('en-IN')}`;
const timeLabel = (value: string) => {
  if (!value) return 'Today';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};
const short = (value: string) => value.split(',')[0];

export const DriverPortalPage: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [tab, setTab] = useState<'requests' | 'trips' | 'earnings'>('requests');
  const [notice, setNotice] = useState('');
  const [rejected, setRejected] = useState<string[]>([]);
  const bookings = useCustomerStore((state) => state.bookings);
  const profile = useCustomerStore((state) => state.profile);
  const acceptBooking = useCustomerStore((state) => state.acceptBooking);
  const updateSharedBooking = useCustomerStore((state) => state.updateBooking);

  const available = useMemo(() => bookings.filter((b) => b.status === 'upcoming' && b.serviceType !== 'self-drive' && !rejected.includes(b.id)), [bookings, rejected]);
  const active = useMemo(() => bookings.filter((b) => b.status === 'active'), [bookings]);
  const completed = useMemo(() => bookings.filter((b) => b.status === 'completed'), [bookings]);
  const earnings = completed.reduce((sum, b) => sum + b.fareBreakdown.totalFare * 0.8, 0);
  const todayCount = completed.filter((b) => new Date(b.date).toDateString() === new Date().toDateString()).length;

  const accept = (booking: CustomerBooking) => {
    const result = acceptBooking(booking.id);
    setNotice(result.message);
    if (result.success) setTab('trips');
  };
  const advance = (booking: CustomerBooking) => {
    const progress = booking.trackingProgress;
    if (progress < 40) updateSharedBooking(booking.id, { trackingProgress: 55, trackingStatusText: 'Driver has arrived at pickup. Waiting for passenger.' });
    else if (progress < 70) updateSharedBooking(booking.id, { trackingProgress: 75, trackingStatusText: 'Trip started. Enjoy your ride!' });
    else updateSharedBooking(booking.id, { status: 'completed', trackingProgress: 100, trackingStatusText: 'Trip completed. Thank you for riding with WAYVIA!' });
  };

  const RequestCard = ({ booking }: { booking: CustomerBooking }) => (
    <article className="rounded-2xl border border-[#e8e5dc] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2"><span className="rounded-full bg-[#e8f5ef] px-3 py-1 text-xs font-bold text-[#26745d]">{booking.serviceType.replace('-', ' ').toUpperCase()}</span><span className="text-xs text-slate-400">{booking.id}</span></div>
        <span className="text-xs font-semibold text-slate-500"><CalendarDays className="mr-1 inline h-3.5 w-3.5" />{timeLabel(booking.date)} · {booking.time}</span>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto]">
        <div className="space-y-3">
          <div className="flex gap-3"><span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#65b99d]" /><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Pickup</p><p className="font-semibold text-[#172b43]">{booking.pickupLocation}</p></div></div>
          <div className="ml-1.5 h-5 border-l border-dashed border-slate-300" />
          <div className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-[#d39a48]" /><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Drop-off</p><p className="font-semibold text-[#172b43]">{booking.destination}</p></div></div>
        </div>
        <div className="rounded-xl bg-[#f7f5ef] p-4 sm:min-w-32"><p className="text-xs text-slate-500">Estimated fare</p><p className="mt-1 text-2xl font-extrabold text-[#172b43]">{money(booking.fareBreakdown.totalFare)}</p><p className="mt-1 text-xs text-slate-500">{booking.vehicleName || booking.vehicleTier}</p></div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-sm text-slate-500"><UserRound className="h-4 w-4" />{booking.customer.name} <span className="text-slate-300">•</span>{booking.passengers} passengers</div>
        <div className="flex w-full gap-2 sm:w-auto"><button onClick={() => { setRejected((old) => [...old, booking.id]); setNotice(`Request ${booking.id} dismissed.`); }} className="min-h-11 flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 sm:min-h-0 sm:flex-none">Decline</button><button disabled={!isOnline} onClick={() => accept(booking)} className="min-h-11 flex-1 rounded-xl bg-[#172b43] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#274565] disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-0 sm:flex-none">Accept trip</button></div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#202833]">
      <header className="sticky top-0 z-30 border-b border-[#e8e5dc] bg-white/90 px-4 py-3 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex items-center gap-4"><Link to="/" className="flex items-center gap-1 rounded-lg bg-[#f7f5ef] px-3 py-2 text-xs font-bold text-[#172b43] hover:bg-[#eeece4]"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Home</span></Link><Logo variant="dark" /><span className="hidden border-l border-slate-200 pl-4 text-xs font-semibold text-slate-500 md:inline">DRIVER PARTNER</span></div>
          <div className="flex items-center gap-3"><div className={`hidden items-center gap-2 rounded-full px-3 py-2 text-xs font-bold sm:flex ${isOnline ? 'bg-[#e8f5ef] text-[#26745d]' : 'bg-slate-100 text-slate-500'}`}><span className={`h-2 w-2 rounded-full ${isOnline ? 'animate-pulse bg-[#48a985]' : 'bg-slate-400'}`} />{isOnline ? 'You are online' : 'You are offline'}</div><button onClick={() => setIsOnline(!isOnline)} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${isOnline ? 'bg-[#172b43] text-white' : 'bg-[#91d9c5] text-[#14243b]'}`}><Power className="h-4 w-4" />{isOnline ? 'Go offline' : 'Go online'}</button></div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 pb-10 sm:px-8 sm:py-10">
        <section className="relative overflow-hidden rounded-[28px] bg-[#14243b] p-6 text-white shadow-xl sm:p-9">
          <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full border-[40px] border-white/5" /><div className="pointer-events-none absolute -bottom-32 right-40 h-64 w-64 rounded-full bg-[#91d9c5]/10 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
            <div><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#91d9c5]/30 bg-[#91d9c5]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-[#a9ead8]"><ShieldCheck className="h-3.5 w-3.5" /> Partner dashboard</div><h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Good day, {profile.name.split(' ')[0]}<span className="text-[#91d9c5]">.</span></h1><p className="mt-2 max-w-xl text-sm leading-6 text-white/65">Your next great trip starts here. Stay available, drive safe, and make every journey count.</p><div className="mt-5 flex flex-wrap gap-4 text-xs text-white/70"><span className="flex items-center gap-2"><CarFront className="h-4 w-4 text-[#91d9c5]" /> Maruti Suzuki Dzire · TN 09 AB 2468</span><span className="flex items-center gap-2"><Star className="h-4 w-4 fill-[#e9b96d] text-[#e9b96d]" /> 4.9 partner rating</span></div></div>
            <div className="relative flex min-w-0 items-center gap-4 sm:min-w-52 rounded-2xl border border-white/10 bg-white/[.07] p-5 backdrop-blur"><div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isOnline ? 'bg-[#91d9c5] text-[#14243b]' : 'bg-white/10 text-white'}`}><Gauge className="h-6 w-6" /></div><div><p className="text-xs text-white/55">Dispatch status</p><p className="mt-1 text-lg font-bold">{isOnline ? 'Ready for trips' : 'Taking a break'}</p><p className="mt-1 text-[11px] text-white/50">{isOnline ? 'New requests can reach you' : 'Requests are paused'}</p></div></div>
          </div>
        </section>

        {notice && <div className="mt-5 flex items-center justify-between rounded-xl border border-[#b8dfd1] bg-[#eaf6f0] px-4 py-3 text-sm font-medium text-[#246b54]"><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />{notice}</span><button onClick={() => setNotice('')} aria-label="Dismiss"><XCircle className="h-4 w-4" /></button></div>}

        <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: 'Trip earnings', value: money(earnings), note: '80% demo driver share', icon: IndianRupee, tint: 'text-[#26745d]', bg: 'bg-[#e8f5ef]' },
            { label: 'Completed trips', value: String(completed.length), note: `${todayCount} completed today`, icon: CheckCircle2, tint: 'text-[#b17a2f]', bg: 'bg-[#fbf1df]' },
            { label: 'Active trips', value: String(active.length), note: 'Currently on your route', icon: Navigation, tint: 'text-[#5477a1]', bg: 'bg-[#edf2f8]' },
            { label: 'Trip requests', value: String(available.length), note: 'Waiting for your response', icon: Bell, tint: 'text-[#8b6b9d]', bg: 'bg-[#f3edf6]' },
          ].map((stat) => <div key={stat.label} className="rounded-2xl border border-[#e8e5dc] bg-white p-4 shadow-sm sm:p-5"><div className="flex items-center justify-between"><p className="text-xs font-semibold text-slate-500">{stat.label}</p><span className={`rounded-xl p-2 ${stat.bg} ${stat.tint}`}><stat.icon className="h-4 w-4" /></span></div><p className="mt-3 break-words text-2xl font-extrabold tracking-tight text-[#172b43] sm:text-3xl">{stat.value}</p><p className="mt-1 text-[11px] text-slate-400">{stat.note}</p></div>)}
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#b17a2f]">Your work, your pace</p><h2 className="mt-1 text-2xl font-extrabold text-[#172b43]">Driver workspace</h2></div><div className="flex max-w-full overflow-x-auto rounded-xl bg-[#ebe9e1] p-1">{(['requests', 'trips', 'earnings'] as const).map((item) => <button key={item} onClick={() => setTab(item)} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold capitalize transition sm:px-4 ${tab === item ? 'bg-white text-[#172b43] shadow-sm' : 'text-slate-500 hover:text-[#172b43]'}`}>{item}</button>)}</div></div>

          {tab === 'requests' && <div className="mt-5 space-y-4">{!isOnline && <div className="rounded-2xl border border-[#ead8b6] bg-[#fbf4e8] p-4 text-sm text-[#8b642b]">You are offline. Go online to accept incoming trip requests.</div>}{available.length ? available.map((booking) => <RequestCard key={booking.id} booking={booking} />) : <div className="rounded-2xl border border-dashed border-[#d9d5ca] bg-white px-5 py-12 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7f5ef] text-[#8293a5]"><Bell className="h-6 w-6" /></div><h3 className="mt-4 font-bold text-[#172b43]">No new requests right now</h3><p className="mt-1 text-sm text-slate-500">New customer bookings will appear here in this demo.</p></div>}</div>}

          {tab === 'trips' && <div className="mt-5 space-y-4">{active.length ? active.map((booking) => <article key={booking.id} className="rounded-2xl border border-[#dce8e2] bg-white p-5 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-2"><span className="rounded-full bg-[#e8f5ef] px-3 py-1 text-xs font-bold text-[#26745d]">IN PROGRESS · {booking.id}</span><span className="text-sm font-bold text-[#172b43]">{money(booking.fareBreakdown.totalFare)}</span></div><div className="mt-4 grid gap-3 sm:grid-cols-2"><p className="text-sm"><span className="block text-xs text-slate-400">Pickup</span><b>{booking.pickupLocation}</b></p><p className="text-sm"><span className="block text-xs text-slate-400">Destination</span><b>{booking.destination}</b></p></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#68b99c] transition-all" style={{ width: `${booking.trackingProgress}%` }} /></div><p className="mt-2 text-xs text-slate-500">{booking.trackingStatusText}</p><button onClick={() => advance(booking)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#172b43] px-4 py-3 text-sm font-bold text-white hover:bg-[#274565]">{booking.trackingProgress < 40 ? 'Mark arrived at pickup' : booking.trackingProgress < 70 ? 'Start trip' : 'Complete trip'}<ChevronRight className="h-4 w-4" /></button></article>) : <div className="rounded-2xl border border-dashed border-[#d9d5ca] bg-white px-5 py-12 text-center"><Route className="mx-auto h-8 w-8 text-slate-300" /><h3 className="mt-3 font-bold text-[#172b43]">No active trips</h3><p className="mt-1 text-sm text-slate-500">Accept a request to see your trip workflow here.</p></div>}</div>}

          {tab === 'earnings' && <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.4fr]"><div className="rounded-2xl bg-[#14243b] p-6 text-white"><Wallet className="h-6 w-6 text-[#91d9c5]" /><p className="mt-5 text-sm text-white/60">Estimated driver earnings</p><p className="mt-1 text-4xl font-extrabold">{money(earnings)}</p><p className="mt-3 text-xs text-white/50">Demo calculation: 80% of completed trip fares.</p><div className="mt-6 flex items-center gap-2 text-xs text-[#91d9c5]"><TrendingUp className="h-4 w-4" /> Keep completing trips to grow your earnings</div></div><div className="rounded-2xl border border-[#e8e5dc] bg-white p-5"><h3 className="font-bold text-[#172b43]">Completed trip ledger</h3>{completed.length ? <div className="mt-3 divide-y divide-slate-100">{completed.map((b) => <div key={b.id} className="flex items-center justify-between gap-3 py-3"><div className="min-w-0"><p className="text-sm font-semibold text-[#172b43]">{short(b.pickupLocation)} → {short(b.destination)}</p><p className="mt-1 text-xs text-slate-400">{b.id} · {timeLabel(b.date)}</p></div><b className="shrink-0 text-sm text-[#26745d]">{money(b.fareBreakdown.totalFare * .8)}</b></div>)}</div> : <p className="py-10 text-center text-sm text-slate-400">Your completed trips will appear here.</p>}</div></div>}
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2"><div className="flex items-center gap-4 rounded-2xl border border-[#e8e5dc] bg-white p-5"><span className="rounded-xl bg-[#edf2f8] p-3 text-[#5477a1]"><Phone className="h-5 w-5" /></span><div><h3 className="text-sm font-bold text-[#172b43]">Need assistance?</h3><p className="mt-1 text-xs text-slate-500">Driver support is available for trip issues.</p></div><ChevronRight className="ml-auto h-4 w-4 text-slate-400" /></div><div className="flex items-center gap-4 rounded-2xl border border-[#e8e5dc] bg-white p-5"><span className="rounded-xl bg-[#fbf1df] p-3 text-[#b17a2f]"><ShieldCheck className="h-5 w-5" /></span><div><h3 className="text-sm font-bold text-[#172b43]">Safety comes first</h3><p className="mt-1 text-xs text-slate-500">Verify passenger and trip details before starting.</p></div><Clock3 className="ml-auto h-4 w-4 text-slate-400" /></div></section>
        <p className="mt-8 text-center text-[11px] text-slate-400">WAYVIA Driver Partner · Demo portal · Move beyond ordinary.</p>
      </main>
    </div>
  );
};
