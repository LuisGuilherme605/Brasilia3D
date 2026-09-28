import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

export default function RevealSection({ children, className, delay = 0, ...props }) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
