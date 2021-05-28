import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
	{ id: "device", label: "Device id", minWidth: 25, index: 0 },
	{ id: "date", label: "Date - Day Month Year", minWidth: 25, index: 1 },
	{ id: "time", label: "Timestamp - Hour:Minute:Second", minWidth: 25, index: 2 },
	{ id: "wind speed", label: "Wind Speed (km/h²)", minWidth: 25, align: "center", index: 3},
	{ id: "direction", label: "Direction", minWidth: 25, index: 4 },
	{ id: "p1", label: "P 1.0 Particle", minWidth: 25, index: 5 },
	{ id: "p2.5", label: "P 2.5 Particle", minWidth: 25, index: 6 },
	{ id: "p10", label: "P 10 Particle", minWidth: 25, index: 7 },
];


export default function DataTable({ data }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper className="table">
			<TableContainer className="table" >
				<Table className="ae-zone">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((row) => {
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row[2]}
									>
										{columns.map((column) => {
											const value = row[column.index];
											return (
												<TableCell
													key={column.id}
													align={column.align}
												>
													{value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 50, 100]}
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
