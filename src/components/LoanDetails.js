import React, { useState } from "react";
import {
	Form,
	Input,
	Button,
	DatePicker,
	Card,
	Typography,
	Row,
	Col,
	message,
} from "antd";
import { DollarCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import axios from "axios";
import Success from "./Success";

const { Title } = Typography;

const LoanDetails = ({ nextStep, previousStep, setLoanData, loanData }) => {
	const [showSuccess, setShowSuccess] = useState(false);
	const [ledger, setLedger] = useState([]);
	const [repaymentDates, setRepaymentDates] = useState(
		loanData.repaymentDates || []
	);

	// Function to send loan data to the backend and get EMI and ledger
	const calculateLoan = async (values) => {
		try {
			if (repaymentDates.length === 0) {
				message.error("Please select repayment dates.");
				return;
			}

			const response = await axios.post("http://localhost:5000/api/loan", {
				...values,
				repaymentDates,
			});
			const { emi, ledger } = response.data;

			// Update loan data with EMI and ledger
			setLoanData({ ...loanData, ...values, emi });
			setLedger(ledger);
			setShowSuccess(true);
			message.success("Loan details saved successfully!");
		} catch (error) {
			message.error("Error calculating loan. Please try again.");
			console.error("Error calculating loan:", error);
		}
	};

	const handleFinish = (values) => {
		calculateLoan(values);
	};

	const handleFormChange = (changedValues, allValues) => {
		setLoanData({ ...loanData, ...allValues });
	};

	// Disable past dates
	const disablePastDates = (current) =>
		current && current < new Date().setHours(0, 0, 0, 0);

	return (
		<Card
			className="card"
			style={{ maxWidth: "600px", margin: "60px auto" }}
			bordered
		>
			{showSuccess ? (
				<Success
					loanData={loanData}
					ledger={ledger}
					goBack={() => setShowSuccess(false)}
				/>
			) : (
				<>
					<Title level={4} style={{ textAlign: "center", color: "#1890ff" }}>
						<DollarCircleOutlined className="icon-style" /> Loan Details
					</Title>
					<Form
						layout="vertical"
						onFinish={handleFinish}
						initialValues={loanData}
						onValuesChange={handleFormChange}
					>
						<Form.Item
							label="Loan Amount"
							name="amount"
							rules={[{ required: true, message: "Please input loan amount!" }]}
						>
							<Input
								prefix={<DollarCircleOutlined className="icon-style" />}
								type="number"
								placeholder="Enter loan amount"
							/>
						</Form.Item>
						<Form.Item
							label="Interest Rate (%)"
							name="rate"
							rules={[
								{ required: true, message: "Please input interest rate!" },
							]}
						>
							<Input
								prefix={<DollarCircleOutlined className="icon-style" />}
								type="number"
								placeholder="Enter interest rate"
							/>
						</Form.Item>
						<Form.Item
							label="Tenure (Years)"
							name="tenure"
							rules={[{ required: true, message: "Please input tenure!" }]}
						>
							<Input
								prefix={<CalendarOutlined className="icon-style" />}
								type="number"
								placeholder="Enter tenure in years"
							/>
						</Form.Item>
						<Form.Item
							label="Disbursement Date"
							name="disbursementDate"
							rules={[
								{ required: true, message: "Please select disbursement date!" },
							]}
						>
							<DatePicker format="YYYY-MM-DD" disabledDate={disablePastDates} />
						</Form.Item>
						<Form.Item
							label="Repayment Dates"
							name="repaymentDates"
							rules={[
								{ required: true, message: "Please select repayment dates!" },
							]}
						>
							<DatePicker.RangePicker
								format="YYYY-MM-DD"
								disabledDate={disablePastDates}
								onChange={(_, dateStrings) => setRepaymentDates(dateStrings)}
								defaultValue={repaymentDates.map((date) => new Date(date))}
							/>
						</Form.Item>
						<Row gutter={16}>
							<Col span={12}>
								<Button type="default" onClick={previousStep} block>
									Back
								</Button>
							</Col>
							<Col span={12}>
								<Button type="primary" htmlType="submit" block>
									Generate EMI
								</Button>
							</Col>
						</Row>
					</Form>
				</>
			)}
		</Card>
	);
};

export default LoanDetails;
