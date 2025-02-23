import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AddLikeModal from "../AddLikeModal";
import DeleteLikeModal from "../DeleteLikeModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkAllLikes } from "../../redux/likes";
import { Tooltip } from "react-tooltip";

export default function CheckLikes({ user, songId }){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkAllLikes())
    }, [dispatch])

    const likes = Object.values(useSelector(state=>state.likes.allLikes));

    const style = { color: "yellow" }

    const targetArr = likes?.filter(ele=>ele?.owner_id===user?.id);
    const target = targetArr?.filter(ele=>+ele?.song_id === +songId);

    if(target && target.length > 0) return (
        <div
        data-tooltip-id="tooltip"
        data-tooltip-float={true}
        data-tooltip-place="bottom"
        data-tooltip-content='Remove Favorite'
        >
          <OpenModalMenuItem 
        itemText={<FaStar style={style} id="like-icon" />}
        modalComponent={<DeleteLikeModal songId={songId} likes={likes} user={user} />} 
        />  
        </div>
    
    )
    else return (
        <div
        data-tooltip-id="tooltip"
        data-tooltip-float={true}
        data-tooltip-place="bottom"
        data-tooltip-content='Add Favorite'
        >
        <OpenModalMenuItem
        itemText={<FaRegStar style={style} id="like-icon" />}
        modalComponent={<AddLikeModal user={user} songId={songId} />} 
        />
        </div>
     )
 }