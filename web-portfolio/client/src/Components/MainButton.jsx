import '../styles/mainButton.css'

function MainButton(props) {
  return (
    <button className='flat-button' onClick={props.type === "special" ? console.log(props.type) : () => window.open(props.link, '_blank')}>
      {props.children}
    </button>
  )
}

export default MainButton
