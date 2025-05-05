import React from 'react';
import Metrics from './Metrics';

const AdminDashboard = () => {
  const metrics = [
    { main: 0, label: 'Ordenes Pendientes' },
    { main: 0, label: 'Ordenes En Progreso' },
    { main: 0, label: 'Ordenes Completados' },
    { main: 0, label: 'Ordenes Cancelados' },
  ];

  return (
    <main>
      <div className='navbar'></div>
      <Metrics metrics={metrics} />
    </main>
  );
};

export default AdminDashboard;
