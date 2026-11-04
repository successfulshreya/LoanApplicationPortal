import LoanProduct from '../models/LoanProduct.js';
import LoanApplication from '../models/LoanApplication.js';
import { evaluateEligibility } from '../services/eligibilityService.js';

// 1. Create a Loan Product (Admin)
export const createLoanProduct = async (req, res) => {
  try {
    const product = new LoanProduct(req.body);
    const savedProduct = await product.save();
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Get All Active Loan Products
export const getLoanProducts = async (req, res) => {
  try {
    const products = await LoanProduct.find({ isActive: true });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Submit Application & Run Eligibility Engine
export const applyForLoan = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      age,
      creditScore,
      employmentType,
      monthlySalary,
      loanAmount,
      purpose,
      productId,
    } = req.body;

    const loanProduct = await LoanProduct.findById(productId);
    if (!loanProduct) {
      return res.status(404).json({ success: false, message: 'Loan product not found' });
    }

    const evaluation = evaluateEligibility(
      { age, creditScore, employmentType, monthlySalary },
      loanProduct
    );

    const application = new LoanApplication({
      fullName,
      email,
      phone,
      loanAmount,
      purpose,
      appliedLoanProduct: productId,
      evaluationStatus: evaluation.status,
      rejectionReasons: evaluation.rejectionReasons,
    });

    const savedApplication = await application.save();

    res.status(201).json({
      success: true,
      evaluationStatus: evaluation.status,
      rejectionReasons: evaluation.rejectionReasons,
      data: savedApplication,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Get All Users Applications Directory (Fixed 500 Error)
export const getUsers = async (req, res) => {
  try {
    const applications = await LoanApplication.find().populate('appliedLoanProduct');
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};