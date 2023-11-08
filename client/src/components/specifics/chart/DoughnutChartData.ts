import { ChartData } from "chart.js/auto";

export const doughnutChartData: ChartData<"doughnut", {
	key: string,
	value: number
}[], unknown> = {
	type: "doughnut",
	data: {
		labels: ["Clocks", "Working-times"],
		datasets: [
			{
				data: [160, 145],
				borderColor: ["rgba(45,165,120,1)", "rgba(241,172,48,1)"],
				pointBackgroundColor: ["rgba(91, 228, 155, 1)", "rgba(255, 214, 102, 1)"],
				backgroundColor: ["rgba(91, 228, 155, 1)", "rgba(241,172,48,1)"],
				borderWidth: 3,
				pointRadius: 0,
				borderCapStyle: 'round',
			}
		]
	},
	options: {
		responsive: true,
		cutout: '60%',
		plugins: {
			legend: {
				position: 'bottom',
				align: "center",
				labels: {
					boxWidth: 12,
					usePointStyle: true,
					padding: 25,
					color: 'white',
				},
			},
		},
	},
}


export default doughnutChartData;
