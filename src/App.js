import React, { useState } from "react";
import Onboarding from "./components/Onboarding";
import LoanDetails from "./components/LoanDetails";
import Success from "./components/Success";

const App = () => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({});
	const [loanData, setLoanData] = useState({});

	const nextStep = () => setStep(step + 1);
	const previousStep = () => setStep(step - 1);

	switch (step) {
		case 1:
			return (
				<Onboarding
					nextStep={nextStep}
					setFormData={setFormData}
					formData={formData}
				/>
			);
		case 2:
			return (
				<LoanDetails
					nextStep={nextStep}
					previousStep={previousStep}
					setLoanData={setLoanData}
					loanData={loanData}
					formData={formData}
				/>
			);
		case 3:
			return (
				<Success
					loanData={loanData}
					formData={formData}
					goBack={previousStep}
				/>
			);
		default:
			return (
				<Onboarding
					nextStep={nextStep}
					setFormData={setFormData}
					formData={formData}
				/>
			);
	}
};

export default App;
