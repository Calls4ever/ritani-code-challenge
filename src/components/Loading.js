import {VscLoading} from 'react-icons/vsc'

const Loading =props =>{
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