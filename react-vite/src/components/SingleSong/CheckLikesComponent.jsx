import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AddLikeModal from "../AddLikeModal";
import DeleteLikeModal from "../DeleteLikeModal";

export default function CheckLikes({arr, user}){
    
    const target = arr.filter(ele=>{
        ele?.ownerId ? ele?.ownerId===user.id : ele?.owner_id===user.id})
    if(target.length > 0) return (<button><OpenModalMenuItem
     itemText={<FaStar />}
     modalComponent={<DeleteLikeModal />} 
     /></button>)
    else return (<button>
     <OpenModalMenuItem
     itemText={<FaRegStar />}
     modalComponent={<AddLikeModal />} 
     /></button>)
 }