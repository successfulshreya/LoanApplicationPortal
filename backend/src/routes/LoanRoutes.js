import express from 'express';
import {
  createLoanProduct,
  getLoanProducts,
  applyForLoan,
  getUsers, // Yeh import hona zaroori hai
} from '../controllers/LoanController.js';

const router = express.Router();

router.post('/products', createLoanProduct);
router.get('/products', getLoanProducts);
router.post('/apply', applyForLoan);
router.get('/users', getUsers); // Yeh route hona chahiye

export default router;