import { useState } from 'react'
import FollowerList from './FollowerList'
import Loading from './Loading'

const UserPage = (props)=>{
    const handleLoadMoreClick=()=>{
        props.fetchFollower(props.user.user)
    }
    return(
        <div className = 'user-container'>
            <div className ={props.theme?'user-details-div':'user-details-div-dark'}>
               <section className = 'user-details-section'>
                   <img 

                   src = {props.user.user.avatar_url}
                   alt="user's profile"
                   className = 'user-avatar'
                   />
                   <div className='user-name-div'> 
                       <h1>
                           {props.user.user.name
                            ?props.user.user.name.toUpperCase()
                            :props.user.user.login.toUpperCase()}
                       </h1>
                       <h2>
                           <a className ='user-link-github' href={props.user.user.html_url}> @{props.user.user.login.toLowerCase()}</a>
                        </h2>
                        <h3>Lives in: {props.user.user.location} </h3>
                        <h3>Public Repos {props.user.user.public_repos} </h3>
                        <h3>Rendered Followers {props.user.followers.length} </h3>
                        <h3 > Pushing commits since:</h3>
                        <h3>{new Date(props.user.user.created_at).toLocaleDateString()}</h3>
                   </div>
                   
                </section>
                <h1>Bio</h1>
                <p className = 'user-bio'>{props.user.user.bio}</p>
            </div>
            <h3>Followers</h3>
            <ul className ='follower-list'>
                {props.user.followers.map(f=><li><FollowerList key ={f.id} user = {f} fetchUser = {props.fetchUser}/></li>)}
            </ul>
            
            {props.user.moreFollowers && 
                <button
                className = {props.theme?'load-more-button':'load-more-button dark'}
                onClick={handleLoadMoreClick}
                >
                    Load More
                </button>}
            
        </div>
    )
}
export default UserPage