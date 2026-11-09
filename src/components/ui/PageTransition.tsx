import React from 'react';
import { motion } from 'motion/react';
import { pageTransition } from '../../styles/animations';

/** Wrap a routed page. Keyed by the router so each navigation fades and settles in. */
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
    {children}
  </motion.div>
);

export default PageTransition;
