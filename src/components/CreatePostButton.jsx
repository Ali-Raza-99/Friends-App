import React, { useState, useEffect } from 'react';
import { Button, Box, Modal, Typography, TextField, Paper, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from '@mui/lab/LoadingButton';
import { collection, addDoc,serverTimestamp } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useData } from '../context/fetchData';
import { db, storage } from '../firebase/firebase';
import { Padding } from '@mui/icons-material';
import { auth } from '../firebase/firebase';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 410,
  bgcolor: 'background.paper',
  border: '1px solid grey',
  boxShadow: 24,
  p: 2,
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
  
});

function CreatePostButton() {
  const { user,customLoading} = useData();
  const [loading, setLoading] = React.useState(false);
  

  const [postData, setPostData] = useState({ title: '', discription: '', userUid: '',userName :'',userProfile:'' });
  const [imgUrl, setImgUrl] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const [buttonColor, setButtonColor] = useState('#78909c');
  const [open, setOpen] = useState(false);

  
  useEffect(() => {
    if (user?.uid) {
      setPostData((prevState) => ({
        ...prevState,
        userUid: user.uid,
        userName: user.displayName,
        userProfile: user.photoURL,
      
      }));
      
    }
  }, [user]);

  useEffect(() => {
  }, [postData])
  
  
  const handleUploadPost = async () => {
    if (!postData.title || !postData.discription || !imgUrl) {
      setError('Please ensure all input fields are completed before proceeding.');
      setSuccess(null);
      return; 
    }
    try {
      setLoading(true)
      const fileRef = ref(storage, `${user.uid}/posts/${imgUrl.name}`);
      await uploadBytes(fileRef, imgUrl);
      const downloadURL = await getDownloadURL(fileRef);

      const docRef = await addDoc(collection(db, "posts"), {
        title: postData.title,
        discription: postData.discription,
        postUrl: downloadURL,
        userUid: postData.userUid,
        userProfile: postData.userProfile,
        userName : postData.userName,
        timestamp : serverTimestamp()
      });
      
      // createdAt: new Date().toISOString()
      // console.log("Document written with ID: ", docRef.id);
      // setSuccess('Post uploaded successfully!');
      setError('');
      setLoading(false)
      
      setImgUrl(null);
      setButtonColor('#78909c');
      setOpen(false); 
    } catch (error) {
      setError('Error adding document. Please try again later.');
      console.log("Error adding document: ", error);
    }
  };

  const handleSelectPost = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImgUrl(file);   
        setButtonColor('#4caf50'); 
        event.target.value = "";
        setError(''); 
      } else {
        setError('Please select an image. Other file types are not allowed.');
        setButtonColor('#78909c'); 
      }
    }
  };


  useEffect(() => {
    if (imgUrl) {
      setButtonColor('#4caf50'); 
    }
  }, [imgUrl]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Create your Post
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '14px' }}>Post Title</Typography>
              <TextField
                id="post-title"
                aria-label="Post Title"
                value={postData.title}
                onChange={(event) => setPostData((prev) => ({ ...prev, title: event.target.value }))}
                helperText="required"
                variant="standard"
              />
            </Box>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '14px' }}>Description</Typography>
              <TextField
                id="post-description"
                aria-label="Post Description"
                value={postData.discription}
                onChange={(event) => setPostData((prev) => ({ ...prev, discription: event.target.value }))}
                helperText="required"
                variant="standard"
              />
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <Typography marginLeft={1} sx={{ fontSize: '14px' }}>Upload</Typography>
              <Button
                style={{ backgroundColor: buttonColor }}
                component="label"
                sx={{ height: '40px', width: '49%', fontSize: '10px', marginLeft: 2 }}
                fullWidth
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Click to Upload
                <VisuallyHiddenInput type="file" accept="image/*" onChange={handleSelectPost} />
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography sx={{ textAlign: "center" }} mt={3} px={7} color="error" variant='caption'>{error}</Typography>
              <Typography sx={{ textAlign: "center" }} mt={3} px={7} color="success" variant='caption'>{success}</Typography>
             
                      <LoadingButton
                      sx={{padding:'8px 120px',mt:2}}
          onClick={handleUploadPost}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Submit
        </LoadingButton>

            </Box>
          </Box>
        </Box>
      </Modal>

      <Paper sx={{ position: 'fixed', bottom: 10, left: "90%", right: 6 }} elevation={0}>
        <Button onClick={handleOpen} variant="contained">Create Post</Button>
      </Paper>
    </>
  );
}

export default CreatePostButton;
