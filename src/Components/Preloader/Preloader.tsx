import loader from "../../assets/images/preloader.gif"
import s from "./Preloader.module.css";

export const Preloader = () => {
	return ( 
		<div className={s.loader_wrapper}>
			<img className={s.loader} src={loader} alt="preloader" />
		</div>
	 );
}