const FollowerList = props =>{

    return(
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