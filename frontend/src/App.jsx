import React, { useState } from 'react';
import AdminProductForm from './component/AdminProductForm';
import LoanApplicationForm from './component/LoanApplicationForm';
import UserList from './component/UserList';

function App() {
  const [activeTab, setActiveTab] = useState('apply');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Loan Application & Eligibility Portal</h1>
      
      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('apply')}
          style={{ padding: '10px 20px', background: activeTab === 'apply' ? '#007bff' : '#ccc', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold' }}
        >
          User Loan Application
        </button>
        <button 
          onClick={() => setActiveTab('admin')}
          style={{ padding: '10px 20px', background: activeTab === 'admin' ? '#007bff' : '#ccc', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold' }}
        >
          Admin Panel (Create Products)
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          style={{ padding: '10px 20px', background: activeTab === 'users' ? '#007bff' : '#ccc', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold' }}
        >
          Users Directory
        </button>
      </div>

      <hr style={{ marginBottom: '20px', border: '0.5px solid #ddd' }} />

      {/* Active Tab View */}
      {activeTab === 'apply' && <LoanApplicationForm />}
      {activeTab === 'admin' && <AdminProductForm />}
      {activeTab === 'users' && <UserList />}
    </div>
  );
}

export default App;