export const evaluateEligibility = (userProfile, loanProduct) => {
  const criteria = loanProduct.eligibilityCriteria;
  let reasons = [];

  // 1. Age Check
  if (userProfile.age < criteria.minAge || userProfile.age > criteria.maxAge) {
    reasons.push(`Age must be between ${criteria.minAge} and ${criteria.maxAge} years.`);
  }

  // 2. Credit Score Check
  if (userProfile.creditScore < criteria.minCreditScore) {
    reasons.push(`Credit score must be at least ${criteria.minCreditScore}.`);
  }

  // 3. Employment Type Check
  if (criteria.employmentTypes && criteria.employmentTypes.length > 0) {
    const isEmploymentValid = criteria.employmentTypes.some(
      (type) => type.toLowerCase() === userProfile.employmentType.toLowerCase()
    );
    if (!isEmploymentValid) {
      reasons.push(`Employment type must be one of: ${criteria.employmentTypes.join(', ')}.`);
    }
  }

  // 4. Minimum Salary Check
  if (userProfile.monthlySalary < criteria.minSalary) {
    reasons.push(`Monthly salary must be at least ${criteria.minSalary}.`);
  }

  const status = reasons.length === 0 ? 'Eligible' : 'Rejected';

  return {
    status,
    rejectionReasons: reasons,
  };
};