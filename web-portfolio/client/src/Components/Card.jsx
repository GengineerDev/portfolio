import Modal from '@material-ui/core/Modal'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { useState } from 'react'

import '../styles/card.css'

function Card(props) {
    const [showSlideshow, setShowSlideshow] = useState(false)
    const handleImageClick = () => {
        setShowSlideshow(true)
    }

    const spanStyle = {
        fontFamily: 'Open Sans',
        padding: '20px',
        background: '#efefef',
        color: '#000000',
        marginTop: '220px'
      }
      
      const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '300px',
        
      }
      const slideImages = [
        {
          url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
          caption: 'Slide 1'
        },
        {
          url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
          caption: 'Slide 2'
        },
        {
          url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
          caption: 'Slide 3'
        },
      ]

    return (
        <div className='card'>
            <div className='card-image' onClick={handleImageClick}>
                <img src={props.url} alt={props.alt} />
            </div>
            <div className='card-caption'>
                <h4>{props.header}</h4>
                <small>{props.caption}</small>
            </div>
            {showSlideshow && <Modal
                onClose={() => setShowSlideshow(false)}
                open={showSlideshow}
                style={{
                    position: 'absolute',
                    backgroundColor: '#dedfe0',
                    boxShadow: '2px solid black',
                    height:'300px',
                    width: '300px',
                    margin: 'auto'
                }}
            >
                <div className="slide-container">
                    <Slide>
                    {slideImages.map((slideImage, index)=> (
                        <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                            <span style={spanStyle}>{slideImage.caption}</span>
                        </div>
                        </div>
                    ))} 
                    </Slide>
                </div>
                </Modal>}
        </div>
    )
}

export default Card