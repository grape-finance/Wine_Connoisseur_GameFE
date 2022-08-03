import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";

import _ from "lodash";
import Loading from "components/Loading";
import useFirebase from "hooks/useFirebase";
import { LeaderboardUser } from "contexts/FirebaseProvider";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./style.css";
import React from "react";
import { useWeb3 } from "state/web3";

function Row(props: { row: LeaderboardUser; index: number }) {
  const { row, index } = props;
  const [open, setOpen] = useState(false);
  const { account } = useWeb3();

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography
            component="p"
            style={{ color: account === row.id ? "green" : "black" }}
          >
            {index}
          </Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography
            component="p"
            style={{ color: account === row.id ? "green" : "black" }}
          >
            {row.id.substring(0, 4) +
              "..." +
              row.id.substring(row.id.length - 4, row.id.length)}
          </Typography>
        </TableCell>

        <TableCell align="right">
          <Typography
            component="p"
            style={{ color: account === row.id ? "green" : "black" }}
          >
            {row.level}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography
            component="p"
            style={{ color: account === row.id ? "green" : "black" }}
          >
            {row.currentVpm?.toFixed(2)}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography
            component="p"
            style={{ color: account === row.id ? "green" : "black" }}
          >
            {row.maxVpm?.toFixed(2)}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Staked Vintners
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      <Typography component="p">Master Vintners</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography component="p">
                        {row.stakedVintnersMasters}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      <Typography component="p">Regular Vintners</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography component="p">
                        {row.stakedVintners}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Resting Vintners
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      <Typography component="p">Master Vintners</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography component="p">
                        {row.restingVintnersMasters}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      <Typography component="p">Regular Vintners</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography component="p">
                        {row.restingVintners}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box sx={{ margin: 1, marginTop: 3 }}>
              <Typography variant="h6" gutterBottom component="div">
                Tools
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Typography component="p">Wine Mag 93</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography component="p">
                      {row.tools.get("Wine Mag 93")
                        ? row.tools.get("Wine Mag 93")
                        : 0}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Typography component="p">Pruning Shears</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography component="p">
                      {row.tools.get("Pruning Shears")
                        ? row.tools.get("Pruning Shears")
                        : 0}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Typography component="p">Hydrometer</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography component="p">
                      {row.tools.get("Hydrometer")
                        ? row.tools.get("Hydrometer")
                        : 0}
                    </Typography>
                  </TableCell>
                </TableRow>
              </Table>
            </Box>
            <Box sx={{ margin: 1, marginTop: 3 }}>
              <Typography variant="h6" gutterBottom component="div">
                Skills
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Typography component="p">Quality</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography component="p">
                      {row.skills.get("quality")}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Typography component="p">Fatigue</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography component="p">
                      {row.skills.get("fatigue")}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Typography component="p">Cellar</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography component="p">
                      {row.skills.get("cellar")}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Typography component="p">Mastery</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography component="p">
                      {row.skills.get("mastery")}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Typography component="p">Upgrades</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography component="p">
                      {row.skills.get("upgrades")}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Typography component="p">Vintners</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography component="p">
                      {row.skills.get("vintners")}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Typography component="p">Storage</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography component="p">
                      {row.skills.get("storage")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Leaderboard = () => {
  const [isLoading, setLoading] = useState(true);
  const firebase = useFirebase();
  const [users, setUsers] = useState<LeaderboardUser[]>();
  const [maxCount, setMaxCount] = useState(10);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setMaxCount(newValue as number);
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (firebase) {
        setLoading(true);
        const users = await firebase.getAllUsers(maxCount);
        setUsers(users);
        setLoading(false);
      }
      else {
        setLoading(false);
      }
    };

    fetchAllUsers().catch(console.error);
  }, [firebase, maxCount]);

  return (
    <Container
      style={{ marginTop: "50px" }}
      sx={{ my: 3, p: "0 !important", maxWidth: "unset !important" }}
    >
      <Slider
        aria-label="Top"
        defaultValue={10}
        valueLabelDisplay="on"
        onChange={handleChange}
        step={10}
        marks
        min={10}
        max={50}
      />
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className="table-header-1">
                <Typography variant="h6" component="div">
                  #
                </Typography>
              </TableCell>
              <TableCell className="table-header-1">
                <Typography variant="h6" component="div">
                  Wallet
                </Typography>
              </TableCell>
              <TableCell className="table-header-1" align="right">
                <Typography variant="h6" component="div">
                  Level
                </Typography>
              </TableCell>
              <TableCell className="table-header-1" align="right">
                <Typography variant="h6" component="div">
                  Current VPM
                </Typography>
              </TableCell>
              <TableCell className="table-header-1" align="right">
                <Typography variant="h6" component="div">
                  Max VPM
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user, index) => (
              <Row key={user.id} row={user} index={index + 1} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Loading isLoading={isLoading} />
    </Container>
  );
};

export default Leaderboard;
