import { Link } from 'react-router-dom';

export default function ListTile({playlist, user}) {
    const isOwner = user?.id === playlist?.creator_id
    return (
        <div key={playlist?.id} className='playlist-tile'>
            <Link
            to={`/playlists/${+playlist?.id}`} 
            key={playlist?.id} 
            className='list-tile'
            >
            <div className='titles' id='list-tile'>
               <h3 id='title'>{playlist?.name}</h3>
               <p>-</p>
                <h4>Submitted By: {!isOwner ? playlist?.creator : 'You'}</h4> 
            </div>
            
            </Link>
            <img height='300px' src={playlist?.image} />
        </div>
    )
}