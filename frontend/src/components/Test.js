// // // import React from 'react'

// // // function Test(props) {
// // // const addProdu=async ()=>{
// // //     props.sendContract.addProducer("sai",123)
// // // }
// // // const createMicroGrid=async  ()=>{
// // //     const data = await props.sendContract.createMicroGrid("first_microgrid")
// // //     console.log(data)
// // // }
// // // const addBattery = ()=>{
// // //     props.sendContract.addBattery(0,100,200,300,10,7)
// // // }
// // // const addLoad = ()=>{
// // //     props.sendContract.addLoad(props.address,0,0)
// // // }
// // // const addGreenEnergy = ()=>{
// // //     props.sendContract.addGreenEnergy(100,0)
// // // }
// // // const addPowerGrid = ()=>{
// // //     props.sendContract.addPowerGrid(100,200,0)
// // // }

// // // const microGrids = async()=>{
// // //     const data =  await props.getContract.showMicroGridId();
// // //     console.log(Number(data))
// // // }
// // // const seeeMicrogrid = async()=>{
// // //     const data =  await props.getContract.microGridId;
// // //     console.log(data)
// // // }
// // //   return (
// // //       <div>
// // //         <button onClick={props.metamask}>Connection ...</button>   
// // //         <button onClick={addProdu}>addProducer</button>
// // //         <button onClick={createMicroGrid}>createMicroGrid</button>
// // //         <button onClick={addBattery}>addBattery</button>
// // //         <button onClick={addLoad}>addLoad</button>
// // //         <button onClick={addGreenEnergy}>addGreenEnergy</button>
// // //         <button onClick={addPowerGrid}>addPowerGrid</button>   
// // //         <button onClick={microGrids}>seeeMicrogrid</button>   
// // //         <p>{props.address}</p>
// // //     </div>
// // //   )
// // // }

// // // export default Test








// // // // // // import React from "react";
// // // // // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // // // // import { faMagnifyingGlass, faCartShopping } from "@fortawesome/free-solid-svg-icons";
// // // // // // import { useState } from "react";
// // // // // // import { Link } from "react-router-dom";
// // // // // // import ConsumerNavbar from "./navbar.js";

// // // // // // export default function ConsumerPlans(props){
// // // // // //     let buyButton = {
// // // // // //         backgroundColor:"#A6A6A6",
// // // // // //         fontSize: "15px",
// // // // // //         height:"6vh",
// // // // // //         width:"20vw",
// // // // // //         bottom: 0,
// // // // // //         padding: "3%",
// // // // // //         borderWidth: 0,
// // // // // //         textAlign: "left"
// // // // // //     }
// // // // // //     let favIcon = {
// // // // // //         color: "#808080",
// // // // // //         marginLeft: "60%"
// // // // // //     }
// // // // // //     const handleOnCart = () =>{
// // // // // //         setColor("#B6D8EB");
// // // // // //     }
// // // // // //     const [color, setColor] = useState("#DDF2FD");
// // // // // //     async function purchaseEnergy(value){
// // // // // //         console.log(props)
// // // // // //         const ans= await props.connect.purchaseEnergy(value);
// // // // // //         const view=await props.connect.address_consumer("0xBcA68f498063f1Ce5A60e6F32897b396D0A7736E")
// // // // // //         console.log(ans)
// // // // // //         console.log(view)
// // // // // //         }
// // // // // //     return(
// // // // // //         <>
// // // // // //         <ConsumerNavbar/>
// // // // // //         <div style={{backgroundColor:"#9BBEC8", height:"100%", padding:"3%", paddingTop:"0.9%"}}>
// // // // // //             <div style={{padding:10}}>
// // // // // //             <form className="d-flex">
// // // // // //                 <input className="form-control me-2" type="search" placeholder="Search for electric plans..." style={{borderRadius:20, backgroundColor:"#DDF2FD"}} aria-label="Search"/>
// // // // // //                 <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#808080",paddingTop:"1%", marginRight:"1%"}} />
// // // // // //                 <div onChange={handleOnCart} style={{backgroundColor:{color},height:"6vh",width:"3%", textAlign:"center", borderRadius:"100%", padding:"6px"}} >
// // // // // //                 <Link to="/carts"><FontAwesomeIcon icon={faCartShopping} style={{color: "#808080",paddingTop:"1%"}} /></Link>
// // // // // //                 </div>
// // // // // //             </form>
// // // // // //             </div>
// // // // // //             <div className="d-flex flex-row">
// // // // // //             <div style={{backgroundColor:"#DDF2FD",height:"20vh", width:"20vw", margin:"3%", marginRight:0}}>
// // // // // //                 <img src="" alt=""/>
// // // // // //                 <h1>103</h1>
// // // // // //                 <button style={buyButton} onclick={purchaseEnergy(103*4)}> Buy Now <FontAwesomeIcon icon={faCartShopping}  style={favIcon} /></button>
// // // // // //             </div>
// // // // // //             <div style={{backgroundColor:"#DDF2FD",height:"20vh", width:"20vw", margin:"3%", marginRight:0}}>
// // // // // //                 <img src="" alt=""/>
// // // // // //                 <h1>270</h1>
// // // // // //                 <button style={buyButton} onclick={purchaseEnergy(103*4)}> Buy Now <FontAwesomeIcon icon={faCartShopping}  style={favIcon} /></button>
// // // // // //             </div>
// // // // // //             <div style={{backgroundColor:"#DDF2FD",height:"20vh", width:"20vw", margin:"3%", marginRight:0}}>
// // // // // //                 <img src="" alt=""/>
// // // // // //                 <h1>401</h1>
// // // // // //                 <button style={buyButton} onclick={purchaseEnergy(103*4)}> Buy Now <FontAwesomeIcon icon={faCartShopping}  style={favIcon} /></button>
// // // // // //             </div>
// // // // // //             <div style={{backgroundColor:"#DDF2FD",height:"20vh", width:"20vw", margin:"3%", marginRight:0}}>
// // // // // //                 <img src="" alt=""/>
// // // // // //                 <h1>777</h1>
// // // // // //                 <button style={buyButton} onclick={purchaseEnergy(103*4)}> Buy Now <FontAwesomeIcon icon={faCartShopping}  style={favIcon} /></button>
// // // // // //             </div>
// // // // // //             </div>
            
// // // // // //         </div>
// // // // // //         </>
// // // // // //     );
// // // // // // }



// // // // import React from 'react';
// // // // import { useGlobalVariable } from '../Context/metaContext';

// // // // const YourComponent = () => {
  
// // // //   const { globalVariable, updateGlobalVariable } = useGlobalVariable();

// // // //   const handleButtonClick = () => {
// // // //     // Update the global variable
// // // //     updateGlobalVariable('New value');
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h1>Global Variable</h1>
// // // //       <p>Variable value: {globalVariable}</p>
// // // //       <button onClick={handleButtonClick}>Update Variable</button>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default YourComponent;


// // import React, { useEffect } from 'react'

// // export default function Test(props) {
// //   useEffect(()=>{
// //     if(props.data){
// //       console.log("props.data")
// //     }else{
// //       console.log("props.data not there")
// //     }
// //   },[])
// //   return (
// //     <div>
      
// //     </div>
// //   )
// // }

// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";

// const FaceComparison = () => {
//   const [aadharNumber, setAadharNumber] = useState("");
//   const [message, setMessage] = useState("");
//   const [matchResult, setMatchResult] = useState(null);
//   const webcamRef = useRef(null);

//   // Capture photo from the webcam
//   const capturePhoto = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     return imageSrc;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setMatchResult(null);

//     try {
//       // Capture image from webcam
//       const capturedImage = capturePhoto();

//       if (!capturedImage) {
//         setMessage("Unable to capture photo. Please try again.");
//         return;
//       }

//       // Send request to backend
//       const response = await axios.post("http://localhost:8000/compare-faces", {
//         aadharnumber: aadharNumber,
//         image: capturedImage,
//       });

//       // Handle response
//       if (response.data.match) {
//         setMatchResult("Faces match!");
//       } else {
//         setMatchResult("Faces do not match.");
//       }
//     } catch (error) {
//       setMessage(
//         error.response?.data?.detail || "An error occurred while processing."
//       );
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h1>Face Comparison</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Aadhar Number:</label>
//           <input
//             type="text"
//             value={aadharNumber}
//             onChange={(e) => setAadharNumber(e.target.value)}
//             placeholder="Enter your Aadhar number"
//             required
//           />
//         </div>
//         <div style={{ marginTop: "20px" }}>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             width={320}
//             height={240}
//           />
//         </div>
//         <button type="submit" style={{ marginTop: "20px" }}>
//           Compare Faces
//         </button>
//       </form>
//       {message && <p style={{ color: "red" }}>{message}</p>}
//       {matchResult && <p style={{ color: "green" }}>{matchResult}</p>}
//     </div>
//   );
// };

// export default FaceComparison;
import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";

function Test() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setIsLoading(true);
    setError(null);
    setOpenSnackbar(false);

    try {
      // Simulate an API request or call to your backend
      const apiResponse = await fetch(process.env.REACT_APP_FastApiUrl+"/llama3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      
      if (apiResponse.ok) {
        const data = await apiResponse.json();
        setResponse(data.response); // Assuming the API returns a 'response' field
        setOpenSnackbar(true);
      } else {
        throw new Error("Failed to fetch response from API.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Query Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Enter Your Query"
              variant="outlined"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Card variant="outlined" style={{ marginTop: "20px" }}>
        <CardContent>
          {response && (
            <Typography variant="body1">
              <strong>Response:</strong> {response}
            </Typography>
          )}
        </CardContent>
      </Card>

      {error && <Alert severity="error">{error}</Alert>}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success">Query submitted successfully!</Alert>
      </Snackbar>
    </Container>
  );
}

export default Test;
