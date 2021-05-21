import {BsMoon} from 'react-icons/bs'
import {BsSun} from 'react-icons/bs'
import {useState, useEffect} from 'react'
import UserPage from './UserPage'
import Loading from './Loading'
import NoUserFound from './NoUserFound'

const HomePage=(props)=> {
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

    

  if(lightTheme){
    document.body.style.backgroundColor="white"
    document.body.style.color='black'
  }else{
    document.body.style.backgroundColor="black"
    document.body.style.color='white'
  }
  const handleChange = e =>{
     setSearchKey(e.target.value)
  }
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
const handleOnFocus=e=>{
    e.target.style='width: 580px;'
}
const handleOnBlur=e=>{
    e.target.style='width: 360px;'
}
const fetchFollower =async (user)=>{
    let data={}
    if(currentUser.user && user.login==currentUser.user.login){
        data=currentUser
        console.log(data)
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