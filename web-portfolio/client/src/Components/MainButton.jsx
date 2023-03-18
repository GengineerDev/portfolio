import '../styles/mainButton.css'

function MainButton(props) {
  return (
    <button className='flat-button' onClick={props.type === "special" ? props.handleClick : () => window.open(props.link, '_blank')} disabled={props.disabled}>
      {props.children}
    </button>
  )
}

export default MainButton
