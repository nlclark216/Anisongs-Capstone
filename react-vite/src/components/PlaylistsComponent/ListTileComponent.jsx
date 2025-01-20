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
               <h4 id='title'>{playlist?.name}</h4>
               <p>-</p>
                <p>Submitted By: 
                    <b>{!isOwner ? 
                    playlist?.creator : 'You'}</b>
                </p> 
            </div>
            </Link>
            <img height='300px' src={playlist?.image} />
        </div>
    )
}