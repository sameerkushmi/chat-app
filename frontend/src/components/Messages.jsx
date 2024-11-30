import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import getMessages from "../hooks/getMessages"
import useGetRealtimeMessage from "../hooks/realtimeMessage"

const Messages = () => {
    useGetRealtimeMessage()
    getMessages()
    const scroll = useRef()
    const {messages} = useSelector(store => store.message)
    const {authUser} = useSelector(store => store.user)

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior: "smooth"})
    },[messages])

    if(!messages) return <div className="flex-1 overflow-auto p-2"></div>

  return (
    <div className="flex-1 overflow-auto p-2">
        {
            messages.message.map((item,index)=>(
                <div key={index} ref={scroll}>
                    <div className={`chat ${authUser?._id === item.senderId ? 'chat-end' : 'chat-start'}`}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src={item.senderId === authUser?._id ? authUser.profilePhoto : item.profilePhoto} />
                            </div>
                        </div>
                        <div className="chat-header">
                            {/* {authUser?.fullName} */}
                            <time className="text-xs">{item.createdAt}</time>
                        </div>
                        <div className="chat-bubble bg-blue-500 text-white">{item.message}</div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Messages