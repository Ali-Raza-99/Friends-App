import React, { useState, useEffect } from "react";
import { Grid, Box, Avatar, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
import { db } from "../firebase/firebase";
import { useData } from "../context/fetchData";
import CreatePostButton from "./CreatePostButton";
import { auth } from "../firebase/firebase"; 


export default function PostContainer() {
  const { user,posts,customLoading } = useData(); // Get logged-in user
  // const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (posts.length > 0 || posts !== undefined) {
      setLoading(false); // Stop loading once posts are fetched
    }
  }, [posts]);

  

  return (
    <>
      <Grid container sx={{ width: "100%", flexDirection: "column", minHeight: "100vh", paddingTop: 10, alignItems: "center", justifyContent: "center" }}>
        {loading ? (
          <Typography>Loading posts...</Typography>
        ) : posts.length === 0 ? (
          <Typography>No posts found</Typography>
        ) : (
          posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4} sx={{ marginBottom: 2 }}>
              <Box sx={{ border: "1px solid grey", borderRadius: "8px", minHeight: "auto", width: "100%", marginTop: 4 }}>
                <Box
                  component="img"
                  src={post.postUrl || "https://via.placeholder.com/300"}
                  alt="Post image"
                  sx={{ width: "100%",  height: "300px", display: "block", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
                />
                <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                  <Avatar src={post.userProfile || "https://via.placeholder.com/50"} alt="Profile Icon" sx={{ width: 50, height: 50, borderRadius: "50%" }} />
                  <Box marginLeft={2}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>{post.userName || "Anonymous"}</Typography>
                    <Typography sx={{ fontSize: "12px", color: "gray" }}>
                      {post.createdAt ? `${post.timestamp}`: "Unknown date"}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography sx={{ padding: 2, fontSize: "14px", color: "gray" }}>{post.discription || "No content available"}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%", padding: 2 }}>
                  <IconButton size="small">
                    <ThumbUpIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <CommentIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
      <CreatePostButton />
    </>
  );
}
