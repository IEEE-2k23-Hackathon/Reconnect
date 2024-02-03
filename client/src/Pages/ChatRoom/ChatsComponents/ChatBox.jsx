// import React from "react";
// import Box from "@mui/material/Box";
// import SingleChat from "./SingleChat";
// import Layout from "../../../components/Layout/Layout";
// import { Grid } from "@mui/material";
// import Sidebar from "../../../components/Sidebar";
// const ChatBox = () => {
//   return (
//     <Grid container spacing={1}>
//       {/* Sidebar */}
//       <Grid item xs={12} md={3}>
//         <Sidebar />
//       </Grid>

//       <Grid item xs={12} md={9}>
//         <Grid container spacing={5}>
//           <Box
//             // padding={2}
//             // marginRight={10}
//             // marginTop={2}
//             // marginLeft={5}
//             bgcolor="white"
//             // width={"100vw"}
//             // borderRadius="lg"
//             // border="1px solid purple"
//             height={"100vh"}
//             width={"250%"}
//           >
//             <SingleChat />
//           </Box>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default ChatBox;

import React from "react";
import { Grid } from "@mui/material";
import Sidebar from "../../../components/Sidebar";
import SingleChat from "./SingleChat";

const ChatBox = () => {
  return (
    <Grid container spacing={0}>
      {/* Sidebar */}
      <Grid item xs={12} md={3} style={{ padding: 0 }}>
        <Sidebar />
      </Grid>

      {/* Chat Page */}
      <Grid item xs={12} md={9} style={{ padding: 0 }}>
        <SingleChat />
      </Grid>
    </Grid>
  );
};

export default ChatBox;
