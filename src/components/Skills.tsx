import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  { name: 'HTML & CSS', level: 95, color: '#e34f26', category: 'Frontend' },
  { name: 'JavaScript', level: 90, color: '#f7df1e', category: 'Frontend' },
  { name: 'React', level: 92, color: '#61dafb', category: 'Frontend' },
  { name: 'Ruby', level: 90, color: '#cc342d', category: 'Backend' },
  { name: 'Python', level: 82, color: '#3572A5', category: 'Backend' },
  { name: 'SQLite3', level: 85, color: '#003B57', category: 'Database' },
  { name: 'PostgreSQL', level: 88, color: '#336791', category: 'Database' },
  { name: 'Linux', level: 87, color: '#fcc624', category: 'DevOps' },
  { name: 'Nginx', level: 80, color: '#009639', category: 'DevOps' },
  { name: 'Bootstrap', level: 88, color: '#7952b3', category: 'Frontend' },
  { name: 'WordPress', level: 82, color: '#21759b', category: 'Frontend' },
  { name: 'AWS (Cloud Practitioner)', level: 80, color: '#ff9900', category: 'DevOps' },
  { name: 'Git', level: 90, color: '#f05032', category: 'DevOps' },
  { name: 'GitHub', level: 90, color: '#6e7681', category: 'DevOps' },
  { name: 'Azure DevOps', level: 78, color: '#0078d4', category: 'DevOps' },
];

const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps'];

const useCountUp = (target: number, inView: boolean, delay: number) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const duration = 1200;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) { setCount(target); clearInterval(interval); }
        else setCount(Math.floor(current));
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, target, delay]);
  return count;
};

const SkillBar: React.FC<{ skill: typeof skills[0]; delay: number }> = ({ skill, delay }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const count = useCountUp(skill.level, inView, delay);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '20px 24px',
        transition: 'border-color 0.2s, background 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' }}>{skill.name}</span>
          <span style={{
            marginLeft: 8, fontSize: 11, fontWeight: 600, padding: '2px 8px',
            borderRadius: 10, background: `${skill.color}18`, color: skill.color,
          }}>{skill.category}</span>
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>{count}%</span>
      </div>
      <div style={{ height: 4, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeOut' }}
          style={{ height: '100%', background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`, borderRadius: 4 }}
        />
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" style={{ padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 24px)', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <p style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Expertise</p>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: -2, marginBottom: 16 }}>
            Skills & Technologies
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>
            5 years of building real products from scratch — alone.
          </p>
        </motion.div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px', borderRadius: 30, border: '1px solid',
                borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border)',
                background: activeCategory === cat ? 'var(--accent)' : 'transparent',
                color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.2s',
              }}
            >{cat}</motion.button>
          ))}
        </div>

        <motion.div
          layout
          className="skills-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))', gap: 12 }}
        >
          {filtered.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} delay={i * 0.07} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
