import { Link } from 'react-router-dom';

export default function ListTile({playlist}) {
    return (
    <Link
    to={`/playlists/${playlist?.id}`} 
    key={playlist?.id} 
    className='list-tile'>
    <h5>{playlist?.name}</h5>
    <img height='300px' src={playlist?.image} />
    </Link>
    )
}