import notFound from "../../assets/images/404-Page.gif";
import s from "./NotFound404.module.css"

export const NotFound404 = () => {
	return (
		<div className={s.wrapper}>
			<img className={s.notFound} src={notFound} alt="not found" />
		</div>
	);
};
