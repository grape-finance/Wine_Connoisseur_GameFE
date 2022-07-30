import { Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import _ from "lodash";
import Loading from "components/Loading";
import useFirebase from "hooks/useFirebase";
import { LeaderboardUser } from "contexts/FirebaseProvider";

const Leaderboard = () => {
  const [isLoading, setLoading] = useState(true);
  const firebase = useFirebase();
  const [users, setUsers] = useState<LeaderboardUser[]>();

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (firebase) {
        const users = await firebase.getAllUsers();
        setUsers(users);
        setLoading(false);
      }
    };

    fetchAllUsers().catch(console.error);
  }, [firebase]);

  return (
    <Container sx={{ my: 3, p: "0 !important" }}>
      <Stack
        flexDirection="column"
        spacing={2}
        sx={{
          width: "100%",
          height: "auto",
          background:
            "linear-gradient(to bottom,rgb(00 00 00/0.7),rgb(00 00 00/0.7),rgb(00 00 00/0.7))",
          p: 3,
          borderRadius: "1px",
          boxShadow: 2,
          textAlign: "center",
          border: "1px solid rgb(0 0 0)",
          WebkitBoxShadow: "5px 5px 5px #000",
        }}
      >
        Hi, fetched {users?.length}
      </Stack>
      <Loading isLoading={isLoading} />
    </Container>
  );
};

export default Leaderboard;
