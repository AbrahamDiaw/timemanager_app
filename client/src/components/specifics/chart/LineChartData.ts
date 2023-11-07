import { ChartData } from "chart.js/auto";
import { MONTH } from "../../../types/Chart";

export const lineChartData: ChartData<"line", { key: string, value: number }[], unknown> = {
	type: "line",
	data: {
		labels: Object.values(MONTH),
		datasets: [
			{
				label: "Hours Worked",
				data: [160, 145, 180, 200, 165, 150, 170, 190, 175, 160, 190, 180],
				borderColor: "rgba(45,165,120,1)",
				pointBackgroundColor: "rgba(91, 228, 155, 1)",
				borderWidth: 3,
				pointRadius: 0,
				borderCapStyle: 'round'
				
			},
			{
				label: "Teams Worked",
				data: [360, 545, 480, 300, 265, 250, 470, 690, 75, 360, 290, 280],
				borderColor: "rgba(241,172,48,1)",
				pointBackgroundColor: "rgba(255, 214, 102, 1)",
				borderWidth: 3,
				pointRadius: 0,
				borderCapStyle: 'round'
			
			}
		]
	},
	options: {
		tension: 0.5,
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
				align: "end",
				labels: {
					boxWidth: 12,
					usePointStyle: true,
					padding: 25,
					color: 'white',
				},
			},
		},
	}
}


export default lineChartData;
