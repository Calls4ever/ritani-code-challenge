const FollowerList = props =>{

    return(
        //the outer div holds follower details like avatar, name, and username
        //Only interesting thing happening here is that, when user clicks the 
        //follower, it will display follower details by calling fetchUser function
        <div className = "follower-container"
        onClick={()=>props.fetchUser(props.user.login)}
        >
            <img 
            className = 'follower-avatar'
            src={props.user.avatar_url}/>
            <h2>{props.user.name?props.user.name.toUpperCase():props.user.login.toUpperCase()}</h2>
            <h3>@{props.user.login.toLowerCase()}</h3>
        </div>
    )
}
export default FollowerList