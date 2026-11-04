import React, { useState } from 'react';
import { createLoanProduct } from '../services/api';

export default function AdminProductForm() {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    interestRate: '',
    maxLoanAmount: '',
    minAge: '',
    maxAge: '',
    minCreditScore: '',
    employmentTypes: 'Salaried, Self-Employed',
    minSalary: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        productName: formData.productName,
        description: formData.description,
        interestRate: Number(formData.interestRate),
        maxLoanAmount: Number(formData.maxLoanAmount),
        eligibilityCriteria: {
          minAge: Number(formData.minAge),
          maxAge: Number(formData.maxAge),
          minCreditScore: Number(formData.minCreditScore),
          employmentTypes: formData.employmentTypes.split(',').map(t => t.trim()),
          minSalary: Number(formData.minSalary)
        }
      };

      await createLoanProduct(payload);
      setMessage('Loan Product created successfully!');
      // Reset form
      setFormData({
        productName: '', description: '', interestRate: '', maxLoanAmount: '',
        minAge: '', maxAge: '', minCreditScore: '', employmentTypes: 'Salaried, Self-Employed', minSalary: ''
      });
    } catch (error) {
      setMessage('Failed to create product. Check console.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Admin Panel: Create Loan Product</h2>
      {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" name="productName" placeholder="Product Name (e.g. Home Loan)" value={formData.productName} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input type="number" name="interestRate" placeholder="Interest Rate (%)" value={formData.interestRate} onChange={handleChange} required />
        <input type="number" name="maxLoanAmount" placeholder="Max Loan Amount" value={formData.maxLoanAmount} onChange={handleChange} required />
        
        <h4>Eligibility Criteria</h4>
        <input type="number" name="minAge" placeholder="Minimum Age" value={formData.minAge} onChange={handleChange} required />
        <input type="number" name="maxAge" placeholder="Maximum Age" value={formData.maxAge} onChange={handleChange} required />
        <input type="number" name="minCreditScore" placeholder="Minimum Credit Score (e.g. 700)" value={formData.minCreditScore} onChange={handleChange} required />
        <input type="text" name="employmentTypes" placeholder="Employment Types (comma separated)" value={formData.employmentTypes} onChange={handleChange} required />
        <input type="number" name="minSalary" placeholder="Minimum Monthly Salary" value={formData.minSalary} onChange={handleChange} required />

        <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', cursor: 'pointer' }}>Create Loan Product</button>
      </form>
    </div>
  );
}