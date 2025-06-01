import React from 'react';
import styles from  './StatsSection.module.css'; // Link to custom styles
import { FaRegFileAlt, FaChartLine, FaClock, FaUser } from 'react-icons/fa';

const stats = [
  { icon: <FaRegFileAlt />, number: '1,234', label: 'إجمالي الشكاوى', color: '#3B82F6' }, // blue
  { icon: <FaChartLine />, number: '987', label: 'تم الحل', color: '#10B981' }, // green
  { icon: <FaClock />, number: '187', label: 'قيد المعالجة', color: '#F59E0B' }, // amber
  { icon: <FaUser />, number: '24', label: 'الموظفين', color: '#8B5CF6' }, // violet
];

const StatsSection = () => {
  return (
    <section className={styles.stats_section}>
      <h2 className={styles.section_title}>إحصائيات النظام</h2>
      <div className={styles.stats_grid}>
        {stats.map((item, idx) => (
          <div className={styles.stat_card} key={idx}>
            <div className={styles.icon_wrapper} style={{ color: item.color }}>
              {item.icon}
            </div>
            <h3 className={styles.stat_number}>{item.number}</h3>
            <p className={styles.stat_label}>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
