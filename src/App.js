import './App.css';
import HomePage from './components/HomePage';
//This app consist of 5 components 
// HomePge-a container for all other components
//UserPage - Renders User details and FollowerList Component
//FollowerList - renders details of each follower
//Loading - displays the loading animation while the data is being loaded from the api
//NoUserFound - displays no user found only when there were no user with given username

//Used React icons
//Used React hooks


function App() {
  return (
    <div>
      <HomePage/>
    </div>
  );
}

export default App;
