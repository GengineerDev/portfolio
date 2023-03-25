import axios from '../axios-config'
import SelectCategory from './SelectCategory'
import MainButton from './MainButton'
import { useState } from 'react'

function ModalForm(props) {
    const [disabled, setDisabled] = useState(false)
    const publishEntry = async () => {
        setDisabled(true)
        const category = document.getElementById('select-category').value
        const title = document.getElementById('title').value
        const thumbnail = document.getElementById('thumbnail').files[0]
        const caption = document.getElementById('caption').value
        const images = document.getElementById('images').files
  
        if (images.length === 10) {
          alert("You can only upload up to 10 images only.")
          setDisabled(true)
          return null
        }
      
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

            // Reset form fields after successful submission
            document.getElementById('select-category').value = 'Recent Work'
            document.getElementById('title').value = ''
            document.getElementById('thumbnail').value = ''
            document.getElementById('caption').value = ''
            document.getElementById('images').value = null

        } catch (error) {
          console.error(error)
          alert("The server encountered a problem. Make sure that you accomplished all fields or you uploaded until 10 images only.")
          setDisabled(false)
        }
    }
    return (
        <div className="modal form">
            <label htmlFor="select-category">Category:</label>
            <SelectCategory
                name="select-category"
                id="select-category"
                options={props.categories}
            />
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" placeholder="Title here" />
            <label htmlFor="thumbnail">Thumbnail:</label>
            <input type="file" id="thumbnail" name="thumbnail" />
            <a href='#' target='_blank' className='right'>View Image</a>
            <label htmlFor="caption">Caption:</label>
            <input type="text" id="caption" name="caption" placeholder="Caption here" />
            <label htmlFor="images">Images:</label>
            <input type="file" id="images" name="images" multiple />
            <div className='admin container gap'>
                <select></select>
                <a href='#' target='_blank' className='right'>View Image</a>
            </div>
            <div className='right'><MainButton type="special" handleClick={publishEntry} disabled={disabled} disabledText={disabled}>PUBLISH</MainButton></div>            
        </div>
    )      
}

export default ModalForm