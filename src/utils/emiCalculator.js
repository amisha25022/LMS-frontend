// Function to calculate EMI using simple interest
export const calculateEMI = (amount, rate, tenure) => {
	const simpleInterest = (amount * rate * tenure) / 100;
	const totalAmount = amount + simpleInterest;
	const totalMonths = tenure * 12;
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
