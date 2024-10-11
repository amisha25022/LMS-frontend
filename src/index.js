import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
// src/index.js
// import "antd/dist/antd.css"; // Import Ant Design styles
import "antd/dist/antd"; // Import Ant Design styles

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById("root")
);
