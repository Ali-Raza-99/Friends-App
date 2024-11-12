// import * as React from 'react';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
// import FilledInput from '@mui/material/FilledInput';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import Signup from './Signup';

// export default function InputField({setEmail,email}) {

//     const [showPassword, setShowPassword] = React.useState(false);
    
//     console.log('setEmail:', setEmail); // Check if setEmail is coming as a prop


//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//     const handleMouseDownPassword = (event) => {
//       event.preventDefault();
//     };

//     const handleMouseUpPassword = (event) => {
//       event.preventDefault();
//     };

//     const handleEmailChange = (event) => {
//       setEmail(event.target.value);  // Update parent's state
//     };
//   return (
//     <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
//       <div>
//         <Box
//           component="form"
//           sx={{ '& > :not(style)': { marginTop: 4, width: '54ch', marginLeft: 0.7 } }}
//           noValidate
//           autoComplete="off"
//         >
//           <TextField id="outlined-basic" value={email} label="Email" onChange={handleEmailChange}  variant="outlined" />
//         </Box>

//         <FormControl sx={{ marginTop: 1, width: '54ch', marginLeft: 0.7 }} variant="outlined">
//           <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//           <OutlinedInput
//             id="outlined-adornment-password"
//             type={showPassword ? 'text' : 'password'}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                   onMouseUp={handleMouseUpPassword}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Password"
//           />
//         </FormControl>

//       </div>
//     </Box>
//   );
// }
