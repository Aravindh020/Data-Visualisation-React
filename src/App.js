import { useEffect, useState } from "react";
import DataTable from "./datatable.js";
import moment from "moment";
import PieChart from "./PieChart";
import BarChart from "./windydays"
import Timeseries from "./Timeseries.js";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./theme.js";
import {Route, Link, BrowserRouter as Router} from "react-router-dom";


function App() {
	const [query, setQuery] = useState("");
	const [database, setDatabase] = useState([]);
	const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};`;
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

	useEffect(() => {
		async function getData() {
			const response = await fetch("test_dataset_all.csv");
			const data = await response.text();

			const table = data.split("\n").slice(1);
			const column = [];
			table.forEach((record) => {
				const row = record.split(",");
				var string = row[1] + " " + row[2];
				let m = moment(string, "YY/MM/DD hh:mm:ss");
				var date = m.toString().split(" ");
				var month,ttime, year, time;
				month = date[1];
				ttime = date[2];
				year = date[3];
				time = date[4];
				row[1] = ttime + " " + month + " " + year;
				row[2] = time;
				column.push(row);
			});
			setDatabase(column);
		}
		getData();
	}, []);
	
	function search(records) {
		return records.filter(
			(row) => row[2].toString().toLowerCase().indexOf(query) > - 1
		);
	}

	return (
				<div className="App">
				<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
				<GlobalStyles />
				<StyledApp>
				<h1>Data Visualisation Dashboard <button onClick={() => themeToggler()}>Change Theme</button></h1>
				  <h4 className="heading">Basic data visualisation dashboard for the given data using ReactJS </h4>
				<Router>
  				<div className="header-right">
  				  <Link to='/'> Home</Link>
				  <Link to='/Time-Series'> Time Series</Link>
				  <Link to='/Pie-Chart'>Comparison Pie Chart</Link>
				  <Link to='/Most-Windy-Days'> Most Windy Days</Link>
				  </div><switch> 
				  <Route exact path="/"><div> 	
				  <h3 className="heading">Time Filter:</h3>
				  <div className="query">
				  <input 
				  type="text" 
				  value={query} 
				  maxLength="10"
				  placeholder="hh:mm:ss"
				  onChange={(e) => {
				  setQuery(e.target.value); }}/>
				  </div><br />
				  <DataTable data={search(database)} />
				  <br />
				  <h3 className="heading">Time Series Graph</h3>
				  <Timeseries chartdata={search(database)} />
				  <br />
				  <h3 className="heading">Pie Chart</h3>
				  <PieChart chartdata={search(database)} />
				  <h3 className="heading"> Most Windy Days</h3>	
				  <BarChart />
				  </div></Route>
				  <Route path="/Time-Series"> <Timeseries chartdata={search(database)} /> </Route>
				  <Route path="/Pie-Chart"> <PieChart chartdata={search(database)} /> </Route>
				  <Route path="/Most-Windy-Days"> <BarChart /> </Route>
				  </switch> </Router>
				</StyledApp>
			  </ThemeProvider>
				</div>
	);
}

export default App;
