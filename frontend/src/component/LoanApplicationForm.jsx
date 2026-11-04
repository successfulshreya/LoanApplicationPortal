import React, { useState, useEffect } from 'react';
import { getLoanProducts, applyForLoan } from '../services/api';

export default function LoanApplicationForm() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    creditScore: '',
    employmentType: 'Salaried',
    monthlySalary: '',
    loanAmount: '',
    purpose: ''
  });

  const [result, setResult] = useState(null);

  useEffect(() => {
    // Fetch active products on load
    getLoanProducts().then(data => setProducts(data)).catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        age: Number(formData.age),
        creditScore: Number(formData.creditScore),
        monthlySalary: Number(formData.monthlySalary),
        loanAmount: Number(formData.loanAmount),
        productId: selectedProduct
      };

      const response = await applyForLoan(payload);
      setResult(response);
    } catch (error) {
      alert('Error submitting application');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Apply for a Loan (Eligibility Check)</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <select onChange={(e) => setSelectedProduct(e.target.value)} required style={{ padding: '8px' }}>
          <option value="">-- Select Loan Product --</option>
          {products.map(prod => (
            <option key={prod._id} value={prod._id}>{prod.productName} (Max: {prod.maxLoanAmount})</option>
          ))}
        </select>

        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <input type="number" name="creditScore" placeholder="Credit Score" value={formData.creditScore} onChange={handleChange} required />
        
        <select name="employmentType" value={formData.employmentType} onChange={handleChange} style={{ padding: '8px' }}>
          <option value="Salaried">Salaried</option>
          <option value="Self-Employed">Self-Employed</option>
          <option value="Business Owner">Business Owner</option>
        </select>

        <input type="number" name="monthlySalary" placeholder="Monthly Salary" value={formData.monthlySalary} onChange={handleChange} required />
        <input type="number" name="loanAmount" placeholder="Required Loan Amount" value={formData.loanAmount} onChange={handleChange} required />
        <input type="text" name="purpose" placeholder="Purpose of Loan" value={formData.purpose} onChange={handleChange} required />

        <button type="submit" style={{ padding: '10px', background: 'green', color: 'white', cursor: 'pointer' }}>Check Eligibility & Submit</button>
      </form>

      {/* Result Display Box */}
      {result && (
        <div style={{ marginTop: '20px', padding: '15px', background: result.evaluationStatus === 'Eligible' ? '#d4edda' : '#f8d7da', border: '1px solid #ccc' }}>
          <h3>Application Status: <span style={{ color: result.evaluationStatus === 'Eligible' ? 'green' : 'red' }}>{result.evaluationStatus}</span></h3>
          {result.rejectionReasons && result.rejectionReasons.length > 0 && (
            <div>
              <p><strong>Reasons for Rejection:</strong></p>
              <ul>
                {result.rejectionReasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}