import { Link } from 'react-router-dom';

export default function ListTile({playlist}) {
    return (
    <Link
    to={`/playlists/${playlist?.id}`} 
    key={playlist?.id} 
    className='list-tile'>
    <h3>{playlist?.name}</h3>
    <h4>Submitted By: {playlist.creator}</h4>
    <img height='300px' src={playlist?.image} />
    </Link>
    )
}