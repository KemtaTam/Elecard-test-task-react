import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import s from "./Header.module.css";

export const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const navigateHandler = (e: RadioChangeEvent) => {
		if (e.target.value === "Cards") {
			navigate("/");
		} else if (e.target.value === "Tree") {
			navigate("/tree");
		}
	};

	return (
		<header className={s.header}>
			<img src={logo} className={s.header_logo} alt="logo" />
			<nav className={s.nav}>
				<ul className={s.ul}>
					<Radio.Group
						onChange={navigateHandler}
						defaultValue={
							location.pathname === "/"
								? "Cards"
								: location.pathname === "/tree"
								? "Tree"
								: null
						}>
						<Radio value="Cards" className={s.radio_el}>
							Cards
						</Radio>
						<Radio value="Tree" className={s.radio_el}>
							Tree
						</Radio>
					</Radio.Group>
				</ul>
			</nav>
		</header>
	);
};
