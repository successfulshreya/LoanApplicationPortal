import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/loans/users');
      setUsers(response.data.data || response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>All Loan Applications & Users Directory</h2>
      <button 
        onClick={fetchUsers} 
        style={{ marginBottom: '15px', padding: '8px 15px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}
      >
        Refresh List
      </button>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#333', color: '#fff' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Salary</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.fullName}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  ₹{user.monthlySalary || user.salary || user.income || 'N/A'}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', color: user.evaluationStatus === 'Eligible' || user.status === 'Active' ? 'green' : 'red' }}>
                  {user.evaluationStatus || user.status || 'Pending'}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                  <button 
                    onClick={() => setSelectedUser(user)}
                    style={{ padding: '5px 10px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#777' }}>
                No applications found. Please submit a loan application first.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedUser && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #007bff', borderRadius: '5px', background: '#f8f9fa' }}>
          <h3>Application Details for {selectedUser.fullName}</h3>
          <p><strong>Phone:</strong> {selectedUser.phone}</p>
          <p><strong>Loan Amount:</strong> ₹{selectedUser.loanAmount}</p>
          <p><strong>Purpose:</strong> {selectedUser.purpose}</p>
          <p><strong>Status:</strong> {selectedUser.evaluationStatus || selectedUser.status}</p>
          {selectedUser.rejectionReasons && selectedUser.rejectionReasons.length > 0 && (
            <p style={{ color: 'red' }}><strong>Rejection Reasons:</strong> {selectedUser.rejectionReasons.join(', ')}</p>
          )}
          <button 
            onClick={() => setSelectedUser(null)}
            style={{ marginTop: '10px', padding: '5px 10px', background: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}