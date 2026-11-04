import mongoose from 'mongoose';

const loanApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  purpose: { type: String, required: true },
  appliedLoanProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'LoanProduct', required: true },
  evaluationStatus: { type: String, required: true }, // 'Eligible' ya 'Rejected'
  rejectionReasons: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.model('LoanApplication', loanApplicationSchema);