import FollowerList from './FollowerList'

const UserPage = (props)=>{
    //fetches more followers if exist when clicking on the load more button
    const handleLoadMoreClick=()=>{
        props.fetchFollower(props.user.user)
    }
    //There are few divs, many of them structured in this way for styling purposes
    //The div with class name of 'user-container' holds all the element in this component
    //There are three main parts, the div containing user details, follower list and conditional render of load more button
    //The user details div divided into one <section>, one <h1/> and one <p/>
    //The section in the user detail contains user details like nam, username etc..
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
                        <h3>Public Repos: {props.user.user.public_repos} </h3>
                        <h3>Rendered Followers: {props.user.followers.length} </h3>
                        <h3 > Pushing commits since: 
                        {new Date(props.user.user.created_at).toLocaleDateString()}</h3>
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