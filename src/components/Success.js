import React from "react";
import { Card, Typography, Button, Table, Row, Col, message } from "antd";
import { saveAs } from "file-saver";

const { Title } = Typography;

const Success = ({ loanData, ledger, goBack }) => {
	const columns = [
		{
			title: "Repayment Date",
			dataIndex: "date",
			key: "date",
		},
		{
			title: "EMI Amount",
			dataIndex: "emi",
			key: "emi",
		},
		{
			title: "Outstanding Balance",
			dataIndex: "outstanding",
			key: "outstanding",
		},
	];

	// Get next EMI date
	const nextEMIDate = ledger.length > 0 ? ledger[0].date : "N/A";

	// Function to download the ledger as CSV
	const downloadCSV = () => {
		let csvContent = "data:text/csv;charset=utf-8,";
		csvContent += "Repayment Date,EMI Amount,Outstanding Balance\n";
		ledger.forEach((row) => {
			csvContent += `${row.date},${row.emi},${row.outstanding}\n`;
		});

		const encodedUri = encodeURI(csvContent);
		saveAs(encodedUri, "loan_ledger.csv");
		message.success("Ledger downloaded successfully!");
	};

	return (
		<Card
			style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}
			bordered
		>
			<Title level={4} style={{ textAlign: "center" }}>
				EMI Generated Successfully!
			</Title>
			<Row>
				<Col span={12}>
					<Title level={5}>Loan Amount:</Title>
					<p>{loanData.amount}</p>
				</Col>
				<Col span={12}>
					<Title level={5}>Interest Rate:</Title>
					<p>{loanData.rate}%</p>
				</Col>
				<Col span={12}>
					<Title level={5}>Tenure:</Title>
					<p>{loanData.tenure} years</p>
				</Col>
				<Col span={12}>
					<Title level={5}>Calculated EMI:</Title>
					<p>{loanData.emi}</p>
				</Col>
				<Col span={24}>
					<Title level={5}>Next EMI Date:</Title>
					<p>{nextEMIDate}</p>
				</Col>
			</Row>

			<Title level={5}>Repayment Schedule:</Title>
			<Table
				dataSource={ledger}
				columns={columns}
				rowKey="date"
				pagination={false}
			/>

			<Row gutter={16} style={{ marginTop: "20px" }}>
				<Col span={12}>
					<Button type="primary" onClick={goBack} block>
						Back to Loan Details
					</Button>
				</Col>
				<Col span={12}>
					<Button type="default" onClick={downloadCSV} block>
						Download Ledger as CSV
					</Button>
				</Col>
			</Row>
		</Card>
	);
};

export default Success;
