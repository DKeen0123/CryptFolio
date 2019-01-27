export const calculateProfit = (amountOwned, amountPaidInCents, currentPrice) => {
	const averagePaid = amountPaidInCents / 100 / amountOwned;
	const profitPerUnit = currentPrice.toFixed(2) - averagePaid;
	return (profitPerUnit * amountOwned).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
