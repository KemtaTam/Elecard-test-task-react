//чтобы вырезать из полного названия картинки только нужное
export const getName = (str: string) => {
	let minIndex = 0;
	let maxIndex = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] === "/") minIndex = i + 1;
		if (isNumeric(str[i])) {
			maxIndex = i - 2;
			break;
		}
	}
	return str.slice(minIndex, maxIndex + 1);
};
const isNumeric = (n: any) => !isNaN(n);