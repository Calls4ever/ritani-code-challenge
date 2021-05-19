import './App.css';
import {BsMoon} from 'react-icons/bs'
import {BsSun} from 'react-icons/bs'
import {useState} from 'react'

function App() {
  const [lightTheme, setLightTheme]=useState(true)
  
  if(lightTheme){
    document.body.style.backgroundColor="white"
    document.body.style.color='black'
  }else{
    document.body.style.backgroundColor="black"
    document.body.style.color='white'
  }
  console.log(document.body.style)
  return (
    <div>
      <div className='dark-mode-toggle-div'>
      <button 
      className = 'theme-mode-button'
      onClick={()=>setLightTheme(true)}
      
      >
          <BsSun 
          size ={35}
          color = "white"
          />
        </button>
        <button 
        className = "theme-mode-button"
        onClick = {()=>setLightTheme(false)}
        >
          <BsMoon 
          size={35}
          color="black"
          />
        </button>
      </div>
      <div className={lightTheme?'search-input-div':'search-input-div dark'}>
        <form>
          <input 
          className = {lightTheme?'search-input':'search-input dark'}
          placeholder= '@example'
          />
        </form>
        
      </div>
      
    </div>
  );
}

export default App;
