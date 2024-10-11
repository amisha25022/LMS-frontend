export const validatePAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);

export const validateAadhar = (aadhar) => /^\d{12}$/.test(aadhar);

export const validateGSTIN = (gstin) =>
	/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstin);

export const validateUdyam = (udyam) => /^[A-Z]{2}[0-9]{9}$/.test(udyam);

export const validateDOB = (dob) => {
	const today = new Date();
	const birthDate = new Date(dob);
	const age = today.getFullYear() - birthDate.getFullYear();
	const monthDifference = today.getMonth() - birthDate.getMonth();
	if (
		monthDifference < 0 ||
		(monthDifference === 0 && today.getDate() < birthDate.getDate())
	) {
		return age - 1 >= 18;
	}
	return age >= 18;
};
