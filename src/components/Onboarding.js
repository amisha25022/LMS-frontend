import React, { useState } from "react";
import {
	Form,
	Input,
	Button,
	DatePicker,
	Typography,
	Card,
	message,
} from "antd";
import {
	UserOutlined,
	IdcardOutlined,
	BankOutlined,
	SolutionOutlined,
} from "@ant-design/icons";
import {
	validatePAN,
	validateAadhar,
	validateGSTIN,
	validateUdyam,
	validateDOB,
} from "../utils/validation";

const { Title } = Typography;

const Onboarding = ({ nextStep, setFormData, formData }) => {
	const [errors, setErrors] = useState({});

	const handleFinish = (values) => {
		const validationErrors = validateForm(values);
		if (Object.keys(validationErrors).length === 0) {
			setFormData(values);
			message.success("Onboarding completed successfully!");
			nextStep();
		} else {
			setErrors(validationErrors);
			message.error("Please fix the highlighted errors.");
		}
	};

	const validateForm = (values) => {
		const newErrors = {};
		if (!validatePAN(values.pan)) newErrors.pan = "Invalid PAN";
		if (!validateAadhar(values.aadhar)) newErrors.aadhar = "Invalid Aadhar";
		if (!validateGSTIN(values.gstin)) newErrors.gstin = "Invalid GSTIN";
		if (!validateUdyam(values.udyam)) newErrors.udyam = "Invalid UDYAM";
		if (!values.dob) {
			newErrors.dob = "Date of birth is required.";
		} else if (!validateDOB(values.dob)) {
			newErrors.dob = "You must be at least 18 years old.";
		}
		return newErrors;
	};

	return (
		<Card
			className="card"
			style={{ maxWidth: "600px", margin: "60px auto" }}
			bordered
		>
			<Title level={4} style={{ textAlign: "center", color: "#1890ff" }}>
				<SolutionOutlined className="icon-style" /> Loan Application -
				Onboarding
			</Title>
			<Form layout="vertical" onFinish={handleFinish} initialValues={formData}>
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: true, message: "Please input your name!" }]}
				>
					<Input
						prefix={<UserOutlined className="icon-style" />}
						placeholder="Enter your name"
					/>
				</Form.Item>
				<Form.Item
					label="Date of Birth"
					name="dob"
					validateStatus={errors.dob ? "error" : ""}
					help={errors.dob}
					rules={[
						{ required: true, message: "Please select your date of birth!" },
					]}
				>
					<DatePicker
						placeholder="Select your date of birth"
						format="YYYY-MM-DD"
					/>
				</Form.Item>
				<Form.Item
					label="PAN"
					name="pan"
					validateStatus={errors.pan ? "error" : ""}
					help={errors.pan}
					rules={[{ required: true, message: "Please input your PAN!" }]}
				>
					<Input
						prefix={<IdcardOutlined className="icon-style" />}
						placeholder="Enter your PAN"
					/>
				</Form.Item>
				<Form.Item
					label="Aadhar"
					name="aadhar"
					validateStatus={errors.aadhar ? "error" : ""}
					help={errors.aadhar}
					rules={[
						{ required: true, message: "Please input your Aadhar number!" },
					]}
				>
					<Input
						prefix={<IdcardOutlined className="icon-style" />}
						placeholder="Enter your Aadhar number"
					/>
				</Form.Item>
				<Form.Item
					label="GSTIN"
					name="gstin"
					validateStatus={errors.gstin ? "error" : ""}
					help={errors.gstin}
					rules={[{ required: true, message: "Please input your GSTIN!" }]}
				>
					<Input
						prefix={<BankOutlined className="icon-style" />}
						placeholder="Enter your GSTIN"
					/>
				</Form.Item>
				<Form.Item
					label="UDYAM"
					name="udyam"
					validateStatus={errors.udyam ? "error" : ""}
					help={errors.udyam}
					rules={[
						{ required: true, message: "Please input your UDYAM number!" },
					]}
				>
					<Input
						prefix={<BankOutlined className="icon-style" />}
						placeholder="Enter your UDYAM number"
					/>
				</Form.Item>
				<Button type="primary" htmlType="submit" block>
					Next
				</Button>
			</Form>
		</Card>
	);
};

export default Onboarding;
