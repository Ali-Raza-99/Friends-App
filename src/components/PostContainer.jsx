import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/joy/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ArImg from "./Ar.jpg";
import { useData } from "../context/fetchData";
import CreatePostButton from "./CreatePostButton";
export default function PostContainer() {


  const {user,data,customLoading} = useData()
  const mycard = ['raza',9  ]
  //   const userId = user.uid;
//   console.log(user)
//   for (const [key, value] of Object.entries(user)) {
//     if (key === "uid") {
//         console.log(value); // Output: 'YjK5McqHp6gq5cHhPuLTuk2qVWy2'
//     }
// }

  // console.log(userId)

  // console.log(data.map((element,key)=>({key,element})))
  return (
    <>
  <Grid
  container
  sx={{
    width: "100%",
    flexDirection: "column", // Stack items verticall
    minHeight: '100vh',
    height: "auto", // Full viewport height
    margin: "auto",
    paddingTop : 10,
    alignItems: "center", // Centers items horizontally
    justifyContent: "center", // Centers items vertically
  }}
>
  {mycard.map((item, index) => (
    <Grid
      item
      key={index}
      sx={{
        marginBottom: 2, // Add spacing between cards
      }}
    >
      <Box
        sx={{
          border: "1px solid grey",
          borderRadius: "8px",
          minHeight: "auto",
          width : "100%",
          marginTop: 4
        }}
      >
        <Box
          component="img"
          src={ArImg}
          alt="Card image"
          sx={{
            width: "100%",
            objectFit: "cover",
            height: "300px",
            display: "block",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="https://lh3.googleusercontent.com/-EQ9nhaan0gM/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfknEK4UYyhzdYsHWBnE7B4Mjd7PKeQ/photo.jpg?sz=46"
            alt="Profile Icon"
            sx={{
              width: 50,
              objectFit: "cover",
              height: 50,
              marginLeft: "14px",
              marginTop: "20px",
              border: "2px solid #ddd",
              borderRadius: "50%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Box marginTop={2} marginLeft={1}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
             {item}
            </Typography>
            <Typography
              sx={{
                marginTop: 1,
                fontSize: "11px",
                color: "gray",
              }}
            >
              2 months ago
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              marginTop: 2,
              paddingX: 3,
              fontSize: "13px",
              color: "gray",
            }}
          >
            Ar is Developing the great UI of friends app
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            marginTop: 2,
          }}
        >
          <IconButton size="small">
            <ThumbUpIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <CommentIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Grid>
  ))}
</Grid>

    <CreatePostButton/>
    </>

  );
}
