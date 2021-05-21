//importing icons for dark and light mode
import {BsMoon} from 'react-icons/bs'
import {BsSun} from 'react-icons/bs'
//Components being imported
import UserPage from './UserPage'
import Loading from './Loading'
import NoUserFound from './NoUserFound'
import {useState} from 'react'

const HomePage=(props)=> {
  //States
  //there are 5 states in this components
  //lightThem - Tracks what theme (light & dark) user is on
  //searchKey - Tracks user's input
  //notFound -  Decides when to render NoUserFound component
  //loading - Decides when to rending Loading Component
  //currentUser - Stores current user's info
  const [lightTheme, setLightTheme]=useState(true)
  const [searchKey, setSearchKey]=useState('')
  const [notFound, setNotFound] =useState(false)
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    user: null,
    followers: [],
    followersPage: 1,
    moreFollowers: true
})

    
//Rendering theme
  if(lightTheme){
    document.body.style.backgroundColor="white"
    document.body.style.color='black'
  }else{
    document.body.style.backgroundColor="black"
    document.body.style.color='white'
  }

  //Handle change function to track what is being type in the search box
  const handleChange = e =>{
     setSearchKey(e.target.value.trim())
  }
  //on submitting the search query, couple key things expected to happen
  // 1. Sets current user if any to null 
  // 2. Starts loading
  // 3. Fetches user from API
  // 4. Empties the search box

  const handleSubmit = e =>{
      e.preventDefault()
      setCurrentUser({
        user: null,
        followers: [],
        followersPage: 1,
        moreFollowers: true
    })
      setLoading(true)
      fetchUser(searchKey)
      setSearchKey("")
  }

  //FetchUser
  //it is an sync function that fetches user from the API
  //it should do following key things
  //1. fetches user with given username
  //2. if there is user, then start fetching user's followers
  //3. if not, the resets NotFound to true
  const  fetchUser = async (keyword) =>{
    
    let user = await fetch(`https://api.github.com/users/${keyword}`)
                    .then(res=>res.json())
                    .catch(error => console.log(error))
    if(user.message){
        setNotFound(true)
        setLoading(false)
        setCurrentUser({
            user: null,
            followers: [],
            followersPage: 1,
            moreFollowers: true
        })
    }else{
        fetchFollower(user)
    }
    
  }

//adjusting the length (width) of the search input when it is on focus or out of focus
const handleOnFocus=e=>{
    e.target.style='width: 580px;'
}
const handleOnBlur=e=>{
    e.target.style='width: 360px;'
}

//fetchFollowers
//it is an async function that fetches followers of given user from API
//Following key things expected to do
//1. Check if the user it is given matches user in the currentUser
//2. if yes, copies all the info from currentUser to a variable (data)
//3. if not, sets the value of data to initial (default) current user's values
//4. gets followers from the api using correct page number stored in data
//5. Check if there is more followers left to get
//6. if yes, increment the page number for future uses
//7. if not, set morePage property to false
//8. at the end, it updates loading, currentUser, and notFound
const fetchFollower =async (user)=>{
    let data={}
    if(currentUser.user && user.login==currentUser.user.login){
        data=currentUser
    }else{
       data = {
            user,
            followers: [],
            followersPage: 1,
            moreFollowers: true
        }
    }
    let followers = await fetch(`https://api.github.com/users/${user.login}/followers?page=${data.followersPage}`)
                        .then(res=>res.json())
                        .catch(error=>window.alert(error))
        if(followers.length<30){
            data={
                ...data, 
                moreFollowers: false,
                followers: [...data.followers, ...followers]
            }
        }else{
            data={
                ...data,
                followers: [...data.followers, ...followers],
                followersPage: data.followersPage+1
            }
        }
        setLoading(false)
        setCurrentUser(data)
        setNotFound(false)
}
//Here renders the components we wanted to see
//first div is wrapper div of all other JSX
//div with class 'dark-mode-toggle-div' holds both of the icons for dark and light mode
//then comes form with search input box
//then conditionally renders NoUserFound, Loading and UserPage components
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
        <form 
        onSubmit={handleSubmit}
        >
          <input 
          className = {lightTheme?'search-input':'search-input dark'}
          placeholder= 'search GitHub users'
          onChange={handleChange}
          value={searchKey}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          />
        </form>
        {notFound && <NoUserFound/>}
        {loading && <Loading
        theme={lightTheme}
        />}
        {currentUser.user && <UserPage 
        fetchUser = {fetchUser}
        user = {currentUser}
        theme ={lightTheme}
        loading={loading}
        fetchFollower ={fetchFollower}
        />}
      </div>
    </div>
  );
}
export default HomePage