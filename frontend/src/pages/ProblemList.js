/** @format */
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material"; //contain

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData("1....", 159, 6.0, 24, 4.0),
  createData("2....", 237, 9.0, 37, 4.3),
  createData("3....", 262, 16.0, 24, 6.0),
  createData("4....", 305, 3.7, 67, 4.3),
  createData("5....", 356, 16.0, 49, 3.9),
];

function ProblemList() {
  return (
    <>
      <Grid item container spacing={2}>
        <Grid item xs={12} md={12}>
          <Button>문제 생성</Button>
        </Grid>

        <Grid item xs={12} md={12}>
          <TableContainer sx={{ maxWidth: 1200 }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>문제 리스트</TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ minWidth: 1000 }} component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      <Button>삭제</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        
      </Grid>
    </>
  );
}
export default ProblemList;
