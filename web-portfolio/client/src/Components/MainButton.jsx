import '../styles/mainButton.css'
function MainButton(props){
    return (
        <button className='flat-button' onClick={() => window.open(props.link, '_blank')}>
        {props.children}
        </button>
    )
}

export default MainButton