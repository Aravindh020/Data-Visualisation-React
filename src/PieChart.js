import {Pie} from "react-chartjs-2";

const PieChart = ({ chartdata }) => {
	const labels = ["PM 1 Particle", "PM 2.5 Particle", "PM 10 Particle"], datapoint1 = [];

	var sumFor1 = 0, sumFor2 = 0, sumFor10 = 0;

	function refactorData() {
		for (var i = 0; i < chartdata.length; i++) {
			sumFor1 = sumFor1 + parseFloat(chartdata[i][5]);
			sumFor2 = sumFor2 + parseFloat(chartdata[i][6]);
			sumFor10 = sumFor10 + parseFloat(chartdata[i][7]);
		}
		datapoint1.push(sumFor1);
		datapoint1.push(sumFor2);
		datapoint1.push(sumFor10);
	}
	refactorData();
	return (
		<div>
			<Pie
				data={{
					labels: labels,
					datasets: [
						{
							label: "P1",
							data: datapoint1,
							backgroundColor: [
								"#B4161B",
								"#2827CC",
								"#3DBE29",
							],
							fill: false,
							hoverOffset: 4,
						},
					],
				}}
				width={600}
				height={600}
				options={{
					maintainAspectRatio: false,
					scales: {
						y: {
							beginAtZero:true,
						},
					},
				}}
			/>
		</div>
	);
};

export default PieChart;
