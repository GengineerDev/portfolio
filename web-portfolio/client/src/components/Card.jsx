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
    
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '600px',
    
  }
  const slideImages = props.images.map(url => ({ url }))

  return (
      <div className='card'>
          <div className='card-image' onClick={handleImageClick}>
              <img src={props.thumbnail} alt={props.alt} />
          </div>
          <div className='card-caption'>
              <h4>{props.title}</h4>
              <small>{props.caption}</small>
          </div>
          {showSlideshow && <Modal
              onClose={() => setShowSlideshow(false)}
              open={showSlideshow}
              style={{
                  position: 'absolute',
                  backgroundColor: '#dedfe0',
                  boxShadow: '2px solid black',
                  height:'600px',
                  width: '600px',
                  margin: 'auto'
              }}
          >
              <div className="slide-container">
                  <Slide>
                  {slideImages.map((slideImage, index)=> (
                      <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
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