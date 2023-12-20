import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "./ChatsComponents/ChatBox";
import MyChats from "./ChatsComponents/ChatsConatiner";
// import SideDrawer from "./ChatsComponents/SideDrawer";
import { ChatState } from "../../context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {/* {user && <SideDrawer />} */}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
