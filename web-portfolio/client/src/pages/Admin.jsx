import MainButton from '../components/MainButton'
import Searchbox from '../components/Searchbox'
import Modal from '@material-ui/core/Modal'
import { useState } from 'react'
import '../styles/admin.css'
import axios from '../axios-config'


function Admin() {
    const [showForm, setShowForm] = useState(false)

    const publishEntry = async () => {
        const title = document.getElementById('title').value
        const thumbnail = document.getElementById('thumbnail').files[0]
        const caption = document.getElementById('caption').value
        const images = document.getElementById('images').files
      
        const formData = new FormData()
        formData.append('title', title)
        formData.append('thumbnail', thumbnail)
        formData.append('caption', caption)
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
        } catch (error) {
          console.error(error)
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
                    height:'350px',
                    width: '500px',
                    margin: 'auto',
                    borderRadius: '50px'
                }}
            >
                <div className="modal form">
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" placeholder="Title here" />
                    <label for="thumbnail">Thumbnail:</label>
                    <input type="file" id="thumbnail" name="thumbnail" />
                    <label for="caption">Caption:</label>
                    <input type="text" id="title" name="title" placeholder="Caption here" />
                    <label for="images">Images:</label>
                    <input type="file" id="images" name="images" multiple />
                    <div className='right'><MainButton>PUBLISH</MainButton></div>
                    
                </div>

                </Modal>}

        </div>
        
    )
}

export default Admin