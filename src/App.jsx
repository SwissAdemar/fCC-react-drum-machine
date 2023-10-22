import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'


const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
]

const DrumKeys = ({play, sound, removeHover, addHover}) => {

  const handleKeyDown = (event) => {
    if(event.keyCode === sound.keyCode){
      play(sound.keyTrigger, sound.id);
    }
  }

  const addBackground = (event) => {
    if(event.keyCode === sound.keyCode){
      addHover(sound.id);
    }
  }

  const removeBackground = (event) => {
    if(event.keyCode === sound.keyCode){
      removeHover(sound.id);
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keydown', addBackground)
    document.addEventListener('keyup', removeBackground);
  }, [])
  



  return (
          <button className="drum-pad" id={sound.id} onClick={() => play(sound.keyTrigger, sound.id)}>
            <audio className="clip" id={sound.keyTrigger} src={sound.url}></audio>
            {sound.keyTrigger}
          </button>
  )
}

const DrumPads = ( {play, removeHover, addHover} ) => {
  return audioClips.map(sound => <DrumKeys
                                          play={play}
                                          sound={sound}  
                                          addHover={addHover} 
                                          removeHover={removeHover}/>
                       )
}

const DrumsBox = () => {

  const [input, setInput] = React.useState('');

  const playSound = (key, id) => {
    const audio = document.getElementById(key);
    const btn = document.getElementById(id);
    audio.currentTime = 0;
    audio.play();
    setInput(id);
  }

  const addHover = (id) => {
    const btn = document.getElementById(id);
    
    btn.classList.add('active')
  }
  
  const removeHover = (id) => {
    const btn = document.getElementById(id);
    btn.classList.remove('active');
  }

  return (
    <div id="drum-machine">
      <div className="drums-wrapper">
        <DrumPads play={playSound} addHover={addHover} removeHover={removeHover}/>
      </div>
      <div id="display">
        <h2 className="display-title">Sound name:</h2>
        <p className="display-input">{input}</p>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <>
      <DrumsBox />
    </>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));