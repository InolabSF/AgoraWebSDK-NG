import React, { useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from './hooks/useAgora';
import MediaPlayer from './components/MediaPlayer';
import './Call.css';

// const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
const appId = '34b52557a1d84348ab5aba6fdddb956a';
const defaultChannelId = 'demo-channel';

function Call() {
  const [ token, setToken ] = useState('');
  const [ channel, setChannel ] = useState(defaultChannelId);
  const {
    // localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
    localAudioTrack, leave, join, joinState, remoteUsers
  } = useAgora(client);

  return (
    <div className='call'>
      <form className='call-form'>
        <label>
          Token(Optional):
          <input type='text' name='token' onChange={(event) => { setToken(event.target.value) }} />
        </label>
        <label>
          Channel:
          <input type='text' name='channel' value={defaultChannelId} onChange={(event) => { setChannel(event.target.value) }} />
        </label>
        <div className='button-group'>
          <button id='join' type='button' className='btn btn-primary btn-sm' disabled={joinState} onClick={() => {join(appId, channel, token)}}>Join</button>
          <button id='leave' type='button' className='btn btn-primary btn-sm' disabled={!joinState} onClick={() => {leave()}}>Leave</button>
        </div>
      </form>
      <div className='player-container'>
        <div className='local-player-wrapper'>
          <p className='local-player-text'>{localAudioTrack && `localTrack`}{joinState && localAudioTrack ? `(${client.uid})` : ''}</p>
          {/* <MediaPlayer videoTrack={localVideoTrack} audioTrack={localAudioTrack}></MediaPlayer> */}
          {/* <MediaPlayer audioTrack={localAudioTrack}></MediaPlayer> */}
        </div>
        {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
            <p className='remote-player-text'>{`remoteVideo(${user.uid})`}</p>
            {/* <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer> */}
            <MediaPlayer audioTrack={user.audioTrack}></MediaPlayer>
          </div>))}
      </div>
    </div>
  );
}

export default Call;
