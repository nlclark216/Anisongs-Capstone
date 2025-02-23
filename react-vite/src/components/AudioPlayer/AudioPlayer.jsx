
import ReactAudioPlayer from 'react-audio-player';
import './AudioPlayer.css';


export default function AudioPlayer({url}) {

    return (
        <div className='music-player-container'>
            <ReactAudioPlayer
            src={url}
            controls
            className='music-player'
            style={{color: '#d07dfb'}}
            />
        </div>
    )
}