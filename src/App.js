import './App.css';
// import {AiOutlineSearch} from 'react-icons/ai';
// import {BsSearch} from 'react-icons/bs';
import { FaBeer } from 'react-icons/fa';
function App() {
  const searchBar = <FaBeer size ={42}/>
  return (
    <div className="main">
      <div className='dark-mode-toggle-div'>
        
      </div>
      <div className='search-input-div'>
        <form>
          <input 
          className = 'search-input'
          placeholder= '@example'
          />
          <i>
            {searchBar}
          </i>
        </form>
        
      </div>
      
    </div>
  );
}

export default App;
