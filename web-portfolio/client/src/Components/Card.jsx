function Card(props) {
    return (
        <div className='card'>
            <div className='card-image'>
                <img src={props.url} alt={props.alt} />
            </div>
            <div className='card-caption'>
                <h4>{props.header}</h4>
                <small>{props.caption}</small>
            </div>
        </div>
    )
}

export default Card