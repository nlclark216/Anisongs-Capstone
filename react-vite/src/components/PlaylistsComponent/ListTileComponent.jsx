import { Link } from 'react-router-dom';

export default function ListTile({playlist, user}) {
    const isOwner = user.id === playlist.creator_id
    return (
        <div key={playlist?.id}>
        <Link
        to={`/playlists/${+playlist?.id}`} 
        key={playlist?.id} 
        className='list-tile'>
        <h3>{playlist?.name}</h3></Link>
        <h4>Submitted By: {!isOwner ? playlist?.creator : 'You'}</h4>
        <img height='300px' src={playlist?.image} />
        </div>
    )
}