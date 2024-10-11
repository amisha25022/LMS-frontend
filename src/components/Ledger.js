const generateLedger = (amount, emi, repaymentDates) => {
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
