import { motion } from 'framer-motion';

const dados = [
  { num: '3,1 mi', label: 'habitantes' },
  { num: '1960', label: 'ano de fundação' },
  { num: '1.000', label: 'km² de área' },
  { num: '1.172 m', label: 'de altitude' },
  { num: '30+', label: 'pontos turísticos' },
];

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function Stats() {
  return (
    <section id="stats" aria-label="Brasília em números">
      {dados.map((d, i) => (
        <motion.div
          key={d.label}
          className="stat-item"
          variants={item}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="num">{d.num}</div>
          <p>{d.label}</p>
        </motion.div>
      ))}
    </section>
  );
}
