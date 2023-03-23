import MainButton from '../components/MainButton'
import Searchbox from '../components/Searchbox'
import Modal from '@material-ui/core/Modal'
import { useState } from 'react'
import '../styles/admin.css'
import axios from '../axios-config'


function Admin() {
  const [showForm, setShowForm] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const publishEntry = async () => {
      setDisabled(true)
      const category = document.getElementById('select-category').value
      const title = document.getElementById('title').value
      const thumbnail = document.getElementById('thumbnail').files[0]
      const caption = document.getElementById('caption').value
      const images = document.getElementById('images').files
    
      const formData = new FormData()
      formData.append('category', category)
      formData.append('title', title)
      formData.append('caption', caption)
      formData.append('thumbnail', thumbnail)
    
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
      }
    
      try {
        const response = await axios.post('/api/entries', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(response.data)
        alert("Success!")
        setDisabled(false)
      } catch (error) {
        console.error(error)
        alert("The server encountered a problem. Make sure that you accomplished all fields.")
        setDisabled(false)
      }
    }      

  const handleClick = () => {
      setShowForm(true)
      console.log("Clicked!")
  }

  return (
      <div className='admin form'>
          <MainButton type="special" handleClick={handleClick}>ADD AN ENTRY</MainButton>
          <br /><br /><br />
          <h1>--- or ---</h1>
          <br /><br /><br />
          <div className='admin container'>

              <select name="category" id="category-search">
                  <option value="default">--Choose--</option>
                  <option value="recent-work">Recent Work</option>
                  <option value="organizations">Organizations</option>
                  <option value="competitions">Competitions</option>
                  <option value="initiatives">Initiatives</option>
              </select>


              <Searchbox />

          </div>
          <select name="listbox" size='10'>
              <option value="Merceders"> Merceders </option>  
              <option value="BMW"> BMW </option>  
              <option value="Jaguar"> Jaguar </option>  
              <option value="Lamborghini"> Lamborghini </option>  
              <option value="Ferrari"> Ferrari </option>  
              <option value="Ford"> Ford </option>  
          </select>
          <div className='admin container gap'>
              <MainButton>EDIT</MainButton>
              <MainButton>DELETE</MainButton>
          </div>
          {showForm && <Modal
              onClose={() => setShowForm(false)}
              open={showForm}
              style={{
                  position: 'absolute',
                  backgroundColor: '#dedfe0',
                  boxShadow: '2px solid black',
                  height:'400px',
                  width: '600px',
                  margin: 'auto',
                  borderRadius: '50px'
              }}
          >
              <div className="modal form">
              <label htmlFor="select-category">Category:</label>
                <select name="select-category" id="select-category">
                    <option value="Recent Work">Recent Work</option>
                    <option value="organizations">Organizations</option>
                    <option value="Competitions">Competitions</option>
                    <option value="Initiatives">Initiatives</option>
                </select>
                  <label htmlFor="title">Title:</label>
                  <input type="text" id="title" name="title" placeholder="Title here" />
                  <label htmlFor="thumbnail">Thumbnail:</label>
                  <input type="file" id="thumbnail" name="thumbnail" />
                  <label htmlFor="caption">Caption:</label>
                  <input type="text" id="caption" name="caption" placeholder="Caption here" />
                  <label htmlFor="images">Images:</label>
                  <input type="file" id="images" name="images" multiple />
                  <div className='right'><MainButton type="special" handleClick={publishEntry} disabled={disabled} disabledText={disabled}>PUBLISH</MainButton></div>
                  
              </div>

              </Modal>}

      </div>
        
    )
}

export default Admin