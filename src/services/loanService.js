import axios from "axios";

export const fetchLedger = async (loanData) => {
	try {
		const response = await axios.post(
			"http://localhost:5000/api/loan",
			loanData
		);
		return response.data.ledger; // Return ledger from backend response
	} catch (error) {
		console.error("Error fetching ledger:", error);
		throw error;
	}
};
