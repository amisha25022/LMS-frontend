// Function to calculate EMI using simple interest
export const calculateEMI = (amount, rate, tenure) => {
	const simpleInterest = (amount * rate * tenure) / 100;

	// Total amount to be repaid
	const totalAmount = amount + simpleInterest;

	// Total number of months for repayment
	const totalMonths = tenure * 12;

	// EMI = Total amount / Total number of months
	const emi = totalAmount / totalMonths;
	return emi.toFixed(2);
};

// Function to generate the ledger based on EMI and repayment dates
export const generateLedger = (amount, emi, repaymentDates) => {
	let outstanding = amount;
	return repaymentDates.map((date) => {
		outstanding -= emi;
		return {
			date,
			emi,
			outstanding: outstanding < 0 ? 0 : outstanding.toFixed(2),
		};
	});
};
