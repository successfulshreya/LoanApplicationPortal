import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/loans';

// 1. Get all active loan products
export const getLoanProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching loan products:', error);
    throw error;
  }
};

// 2. Create a loan product (Admin)
export const createLoanProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, productData);
    return response.data;
  } catch (error) {
    console.error('Error creating loan product:', error);
    throw error;
  }
};

// 3. Apply for loan (Runs Eligibility Engine)
export const applyForLoan = async (applicationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/apply`, applicationData);
    return response.data;
  } catch (error) {
    console.error('Error submitting loan application:', error);
    throw error;
  }
};