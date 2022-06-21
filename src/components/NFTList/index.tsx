import { CardMedia, ImageList, ImageListItem, Typography } from "@mui/material";
import Loading from "components/Loading";
import { useQuery, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import _ from "lodash";

interface IProps {
  account: string;
}

const FetchImageComponent = (url: any) => {
  const [imageURL, setImage] = useState("");

  fetch(url.url)
    .then((response) => response.json())
    .then((result) => setImage(result.image))
    .catch((error) => console.log("error", error));
  return (
    <ImageListItem>
      <CardMedia
        component="img"
        image={imageURL}
        style={{ width: "50px", height: "50px", display: "inline" }}
      />
    </ImageListItem>
  );
};

const NFTList = (account: IProps) => {
  const userNFTs = gql`
    query {
      # users(where: { id: "${account}" }) {
      users(where: { id: "0x4433dfe8a08cdcbb8110e98793c81c4b81588274" }) {
        vintnerTokens {
          contentURI
        }
        upgradeTokens {
          contentURI
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(userNFTs);

  const [vintnerNFTs, setVintnerNFTs] = useState([]);
  const [upgradeNFTs, setUpgradeNFTs] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(data)) {
      setVintnerNFTs(data.users[0]?.vintnerTokens);
      setUpgradeNFTs(data.users[0]?.upgradeTokens);
    }
  }, [data]);

  return (
    <div>
      <Typography>Vintner</Typography>
      {!_.isEmpty(vintnerNFTs) && (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {vintnerNFTs.map((id: any) => (
            <FetchImageComponent url={id.contentURI} key={id} />
          ))}
        </ImageList>
      )}
      <Typography>Tools</Typography>
      {!_.isEmpty(upgradeNFTs) &&
        upgradeNFTs?.map((id: any) => (
          <FetchImageComponent url={id.contentURI} key={id} />
        ))}

      <Loading isLoading={loading} />
    </div>
  );
};

export default NFTList;
