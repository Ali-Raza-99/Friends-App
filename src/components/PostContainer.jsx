import React, { useState, useEffect } from "react";
import { Grid, Box, Avatar, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useData } from "../context/fetchData";
import CreatePostButton from "./CreatePostButton";
import CircularProgress from '@mui/material/CircularProgress';
import Badge from '@mui/material/Badge';
import Likes from "./Likes";

export default function PostContainer() {
  const { user,posts,customLoading } = useData(); 
  const [postId,setPostId] = useState('')
  const [loading, setLoading] = useState(true);
  // const [likes,setLikes] = useState(0);
  // const [toggleLikes,setToggleLikes] = useState(false)
  // const [likedPostId,setLikedPostId]


const handlePostId = (postId)=>{

      setPostId(postId)

}
  return (
    <>
      <Grid container sx={{ width: "100%", flexDirection: "column", minHeight: "100vh", paddingTop: 10, alignItems: "center", justifyContent: "center" }}>
        {loading ? (
          <Typography><CircularProgress /></Typography>
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
                  <Typography sx={{ padding: 2, fontSize: "14px",fontWeight:"bold" }}>{post.title || "No content available"}</Typography>
                  <Typography sx={{ padding: 2, fontSize: "14px", color: "gray" }}>{post.discription || "No content available"}</Typography>
                </Box>
                <Box  sx={{ display: "flex", justifyContent: "space-around", width: "100%", padding: 2 }}>
                        {/* <NotificationsIcon /> */}
                     <Badge onClick={()=>handlePostId(post.id)} badgeContent={post.likes} color="error">
                  <IconButton size="small">
                    <ThumbUpIcon   sx={{ color: toggleLikes ? "#1976d2" : "grey" }} fontSize="small" />
                  </IconButton>
                      </Badge>
                  <IconButton size="small">
                    <CommentIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
      <Likes postId={postId} />

      <CreatePostButton />
    </>
  );
}
