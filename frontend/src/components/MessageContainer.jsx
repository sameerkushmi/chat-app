import { useDispatch, useSelector } from "react-redux";
import SendField from "./SendField";
import Messages from "./Messages";
import { useEffect } from "react";
import { setSelectorUser } from "../redux/slice/userSlice";

const MessageContainer = () => {
    const {selectorUser,authUser} = useSelector(store => store.user)
    const dispatch = useDispatch()

    useEffect(()=>{
        return () => dispatch(setSelectorUser(null))
    },[])

    return (
        <>
            {
                selectorUser ?
                <div className='flex flex-col w-full'>
                    <div className="flex items-center gap-2 py-2 px-4 bg-blue-700 text-white">
                        <div className="avatar online">
                            <div className="w-12 rounded-full">
                                <img 
                                    src={selectorUser?.profilePhoto}
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div>
                                <p>{selectorUser?.fullName}</p>
                            </div>
                        </div>
                    </div>
                    <Messages/>
                    <SendField/>
                </div>
                : 
                <div className="flex flex-col justify-center items-center w-full">
                    <h1 className="font-bold text-lg">Hi,{authUser?.fullName}</h1>
                    <h1 className="text-2xl font-semibold">Lets start conversation</h1>
                </div>
            }
        </>
    )
}

export default MessageContainer