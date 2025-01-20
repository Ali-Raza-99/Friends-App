import React from 'react'
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Height } from '@mui/icons-material';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { collection, addDoc } from "firebase/firestore"; 
import { useResolvedPath } from 'react-router-dom';
import { useData } from '../context/fetchData';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  border: '1px solid grey',
  boxShadow: 24,
  p: 2,
};

// export default function KeepMountedModal() {

// }



function CreatePostButton() {

  //  const [loading, setLoading] = useState(false);
      const {user,data,loading} = useData()
      const [postData,setPostData]=  useState({title:'',discription:''})
      const [imgUrl,setImgUrl]=  useState(null)
      const [error,setError] = useState('')
    
    const [buttonColor,setButtonColor] = useState('#78909c')

    // console.log(user.uid)

    const handleUploadPost = async()=>{

      const docRef = await addDoc(collection(db,"users"), {
        name: "Tokyo",
        country: "Japan"
      });
      console.log("Document written with ID: ", docRef.id);
      
    }

    const handleSelectPost =(event)=>{
  
      const file = event.target.files[0];
      if (file) {
        if (file.type.startsWith('image/')) {
          setImgUrl(file);   
          setButtonColor('#4caf50'); 
          event.target.value = "";
          setError(false); 
        } else {
          setError('Please select an image other files are not allowed');
          setButtonColor('#78909c'); 
        }
      }
    }
    useEffect(() => {

      if (imgUrl) {
        setButtonColor('#4caf50'); 
      }
    }, [imgUrl]);
    
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
  

useEffect(() => {
    console.log(postData.title)
    console.log(postData.discription)

}, [postData])


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        {/* <Button>Open modal</Button> */}
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
              <Box sx={{display:'flex',justifyContent:'space-evenly',alignItems:'center', }}>
                <Typography  sx={{fontSize:'14px'}}>Post Title</Typography>
                <TextField
                  
                  id="standard-error-helper-text"
                  onChange={(event)=> setPostData((prev)=>({...prev,title:event.target.value}))} 
                  defaultValue=""
                  helperText="required"
                  variant="standard"
                />
              </Box>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Box sx={{display:'flex',justifyContent:'space-evenly',alignItems:'center', }}>
                <Typography sx={{fontSize:'14px'}}>Discription</Typography>
                <TextField
                  
                  id="standard-error-helper-text"
                  onChange={(event)=> setPostData((prev)=>({...prev,discription:event.target.value}))} 
                  defaultValue=""
                  helperText="required"
                  variant="standard"
                />
              </Box>
              
            </Box>
            <Box sx={{ mt: 3 }}>
              <Box sx={{display:'flex',justifyContent:'space-evenly',alignItems:'center', }}>
                <Typography marginLeft={1} sx={{fontSize:'14px'}}> Upload</Typography>
                <Button onClick={handleUploadPost} style={{backgroundColor:buttonColor}} component="label" sx={{height:'40px',width:'49%',fontSize:'10px',marginLeft:2}} fullWidth role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}> Click to Upload <VisuallyHiddenInput type="file" accept="image/*"  onChange={(event)=>handleSelectPost(event)} multiple /></Button>

              </Box>
              <Box sx={{display:'flex', justifyContent:'center',alignItems:'center'}}>
              <Button sx={{marginTop:10}} variant="contained">Submit</Button>
              </Box>

            </Box>
          </Box>
        </Modal>
      </div>

      <Paper sx={{ position: 'fixed', bottom: 10, left: "90%", right: 6 }} elevation={0}>
        <BottomNavigation>
          <Button onClick={handleOpen} variant="contained" sx={{ postion: 'fixed' }} > Create Post </Button>
        </BottomNavigation>
      </Paper>
    </>
  )
}

export default CreatePostButton
