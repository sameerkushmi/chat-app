import { useDispatch, useSelector } from 'react-redux'
import getOtherUsers from '../hooks/getOtherUsers'
import { setSelectorUser } from '../redux/slice/userSlice'

const Otheruser = () => {
    // fetch other user
    getOtherUsers()
    const dispatch = useDispatch()

    const {otherUsers,selectorUser,onlineUsers} = useSelector(store=>store.user)

    const selectorUserHandler = (user) => {
        dispatch(setSelectorUser(user))
    }

    if(!otherUsers) return

    return (
        <>
            {   
                otherUsers.map((item,index)=>(
                    <div onClick={()=>selectorUserHandler(item)} key={index} className={`${selectorUser && selectorUser._id === item._id && 'bg-gray-200'} flex items-center gap-2 hover:bg-gray-100 rounded-lg py-1 px-2 cursor-pointer`}>
                        <div className={`avatar ${onlineUsers?.includes(item._id) && 'online'}`}>
                            <div className="w-12 rounded-full">
                                <img 
                                    src={item.profilePhoto}
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div>
                                <p>{item.fullName}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
    }

export default Otheruser