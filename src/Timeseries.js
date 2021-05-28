import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const Timeseries = ({ chartdata }) => {
	const [database, setDatabase] = useState([]);
	const labels = [];
	const dataPoint1 = [],
	dataPoint2 = [],
	dataPoint3 = [];
	useEffect(() => {
		setDatabase(chartdata);
	}, []);

	function refactorData() {
		for (var i = 0; i < chartdata.length; i++) {
			labels.push(chartdata[i][2]);
			dataPoint1.push(chartdata[i][5]);
			dataPoint2.push(chartdata[i][6]);
			dataPoint3.push(chartdata[i][7]);
		}
	}
	refactorData();

	return (
		<div>
			<Line
				data={{
					labels: labels,
					datasets: [
						{
							label: "PM 1 Particle",
							data: dataPoint1,
							backgroundColor: "#B4161B",
							borderColor: "#E6425E",
							borderWidth: 0.5,
						},
						{
							label: "PM 2.5 Particle",
							data: dataPoint2,
							backgroundColor: "#2827CC",
							borderColor: "#5DA3FA",
							borderWidth: 0.5,
						},
						{
							label: "PM 10 Particle",
							data: dataPoint3,
							backgroundColor: "#3DBE29",
							borderColor: "#50DBB4",
							borderWidth: 0.5,
						},
					],
				}}
				width={600}
				height={500}
				options={{
					maintainAspectRatio: false,
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				}}
			/>
		</div>
	);
};

export default Timeseries;
