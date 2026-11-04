import mongoose from 'mongoose';

const loanProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    maxLoanAmount: {
      type: Number,
      required: true,
    },
    eligibilityCriteria: {
      minAge: { type: Number, required: true },
      maxAge: { type: Number, required: true },
      minCreditScore: { type: Number, required: true },
      employmentTypes: [{ type: String }], // e.g., ['Salaried', 'Self-Employed']
      minSalary: { type: Number, required: true },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const LoanProduct = mongoose.model('LoanProduct', loanProductSchema);

export default LoanProduct;