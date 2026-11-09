import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useBookingStore } from '../../store/useBookingStore';
import { ServiceType } from '../../types';
import { SERVICES_DATA } from '../../data/mockData';
import { SERVICE_IMAGES } from '../../data/imagery';
import { SERVICE_COPY } from '../../data/landingContent';
import { luxuryEase } from '../../styles/animations';
import { SafeImage } from '../ui/SafeImage';
import { LineReveal } from './ui/LineReveal';
import { WvButton } from './ui/WvButton';
import { SectionTag } from './ui/SectionTag';

export const ServicesSection: React.FC = () => {
  const { serviceType, setServiceType } = useBookingStore();
  const [active, setActive] = useState(0);

  const handleSelectService = (id: ServiceType) => {
    setServiceType(id);
    const widget = document.getElementById('booking-widget');
    if (widget) {
      widget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="services" className="relative overflow-hidden bg-coal px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-32 lg:px-12">
      {/* Oversized ghost numeral */}
      <span
        aria-hidden="true"
        className="wv-display wv-outline pointer-events-none absolute -right-6 top-6 select-none text-[34vw] leading-none opacity-[0.06] [--wv-stroke:#E9E5DC] lg:text-[26rem]"
      >
        05
      </span>

      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionTag>Services</SectionTag>
            <h2 className="wv-title mt-5 text-[clamp(3.25rem,9vw,8rem)] text-bone">
              <LineReveal lines={['Five ways', 'to move.']} />
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: luxuryEase }}
            className="max-w-sm text-base leading-relaxed text-bone/65 lg:col-span-4 lg:pb-3"
          >
            From a quick city hop to a week away. Pick one and the booking console updates to match.
          </motion.p>
        </div>

        <div
          role="group"
          aria-label="WAYVIA services"
          className="mt-14 flex flex-col gap-2 lg:mt-20 lg:h-[660px] lg:flex-row"
        >
          {SERVICES_DATA.map((service, index) => {
            const copy = SERVICE_COPY[service.id];
            const isActive = active === index;
            const isChosen = serviceType === service.id;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: index * 0.09, ease: luxuryEase }}
                tabIndex={0}
                aria-label={copy.name}
                aria-expanded={isActive}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`group relative cursor-pointer overflow-hidden outline-none transition-[height,flex-grow] duration-[800ms] ease-luxury focus-visible:ring-2 focus-visible:ring-crimson-300 ${
                  isActive ? 'h-[28rem] lg:h-auto lg:flex-[5]' : 'h-[5.5rem] lg:h-auto lg:flex-[1]'
                }`}
              >
                <SafeImage
                  asset={SERVICE_IMAGES[service.id]}
                  className="absolute inset-0 h-full w-full"
                  imgClassName={`wv-grade transition-transform duration-[1400ms] ease-luxury ${isActive ? 'scale-100' : 'scale-125'}`}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <div aria-hidden="true" className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'bg-gradient-to-t from-coal via-coal/35 to-coal/10' : 'bg-coal/60 group-hover:bg-coal/45'}`} />
                <div aria-hidden="true" className="absolute inset-0 bg-forest/30 mix-blend-multiply" />
                {isActive && (
                  <motion.span
                    aria-hidden="true"
                    layoutId="wv-service-cut"
                    className="absolute left-0 top-0 h-full w-[3px] bg-crimson"
                  />
                )}

                {/* Collapsed label */}
                <div
                  className={`absolute inset-0 flex items-center justify-between px-5 transition-opacity duration-500 lg:flex-col lg:justify-between lg:px-0 lg:py-7 ${
                    isActive ? 'pointer-events-none opacity-0' : 'opacity-100'
                  }`}
                >
                  <span className="wv-num text-sm font-bold text-crimson-300">0{index + 1}</span>
                  <span className="wv-title text-2xl text-bone lg:[writing-mode:vertical-rl] lg:rotate-180 lg:text-3xl">{copy.name}</span>
                  <span aria-hidden="true" className="block h-3 w-3 border-r-2 border-t-2 border-bone/50 lg:hidden" />
                </div>

                {/* Expanded content */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-6 transition-[opacity,transform] duration-700 ease-luxury sm:p-9 ${
                    isActive ? 'translate-y-0 opacity-100 delay-200' : 'pointer-events-none translate-y-6 opacity-0'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="wv-num text-sm font-bold text-crimson-300">0{index + 1}</span>
                    {isChosen && <span className="wv-label bg-crimson px-2 py-1 text-[9px] text-bone">Selected in booking</span>}
                  </div>
                  <h3 className="wv-title mt-2 text-5xl text-bone sm:text-7xl">{copy.name}</h3>
                  <p className="wv-display-wide mt-3 text-sm text-bone/85 sm:text-base">{copy.line}</p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-bone/70 sm:text-base">{copy.detail}</p>
                  <div className="mt-6">
                    <WvButton
                      variant="crimson"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectService(service.id);
                      }}
                    >
                      {isChosen ? 'Go to booking' : 'Choose this service'}
                    </WvButton>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
