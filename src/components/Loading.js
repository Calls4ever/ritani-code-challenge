import {VscLoading} from 'react-icons/vsc'
//loading icon imported from react-icon
const Loading =props =>{
    //the icon changes it's color based on the theme user is using
    return(
        <div className = 'loading-div'>
            <div className='loading'>
            <VscLoading
            size ={75}
            color={props.theme?'black':'white'}
            />
            </div>
        </div>
        
    )
}
export default Loading