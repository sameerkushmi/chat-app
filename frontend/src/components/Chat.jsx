import MessageContainer from "./MessageContainer"
import Sidebar from "./Sidebar"

const Chat = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-screen flex justify-center items-center">
      <div className="flex rounded-lg overflow-hidden bg-white h-[90vh] w-9/12">
        <Sidebar/>
        <MessageContainer/>
      </div>
    </div>
  )
}

export default Chat