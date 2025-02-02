import { useEffect, useState } from 'react';
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { FaPlay, FaPause } from "react-icons/fa";
import './AudioPlayer.css';


export default function AudioPlayer({url}) {
    
    
    const { load, play, pause } = useGlobalAudioPlayer();
    const [playing, setPlaying] = useState(false);

    const toggle = () => {
        setPlaying(!playing);
        if (playing === true) return pause();
            else return play();
    }
    
    useEffect(() => {
        load(`${url}`, {
        autoplay: false,
        html5: true,
        format: 'mp3'
      });
        
    }, [load, url])

    return (
        <div>
            <button className='audio-button' onClick={toggle}>{playing ? <span className='play-button'><FaPause />Pause</span> : <span className='play-button'><FaPlay />Play</span>}</button>
            {playing && 
            <div id="container">
                <div id="html-spinner"></div>
            </div>}
        </div>
    )
}