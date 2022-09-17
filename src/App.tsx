import React from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import { Cards } from "./Pages/Cards/Cards";
import { TreeList } from "./Pages/TreeList/TreeList";
import { NotFound404 } from "./Pages/NotFound404/NotFound404";

import "./App.css";

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Cards />} />
				<Route path="/tree" element={<TreeList />} />
				<Route path="*" element={<NotFound404 />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
