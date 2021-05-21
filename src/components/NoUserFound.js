const NoUserFound = props=>{
    //just a very plain 404 landing page even if we don't know the reason for failing is actually 404 LOL
    return(
        <div className = 'not-found-div'>
            <h1 className = 'four-o-four'>404</h1>
            <h1 className = 'user-not-found'>The user you are looking for is not found</h1>
            <h1 className = 'search-another'>Try searching something like calls4ever!</h1>
        </div>
    )
}
export default NoUserFound