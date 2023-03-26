import axios from '../axios-config'
import SelectCategory from './SelectCategory'
import MainButton from './MainButton'
import { useState, useEffect, useRef } from 'react'
import '../styles/modalForm.css'

function ModalForm(props) {
    const [disabled, setDisabled] = useState(false)
    const [disabledModalBtns, setDisabledModalBtns] = useState(true)
    const [selectedValue, setSelectedValue] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(-1) 
    const [images, setImages] = useState(props.entry.images)
    
    const handleAddClick = () => {
        const imageUrl = prompt("Enter the URL of the image:");
        if (imageUrl) {
          setImages([...images, imageUrl])
        }
    }

    const handleEditClick = () => {
        const imageUrl = prompt("Enter the new URL of the image:", selectedValue)
        if (imageUrl) {
            const newImages = [...images]
            newImages[selectedIndex] = imageUrl
            setImages(newImages)
            setSelectedValue(imageUrl)
        }
    }

    const handleDeleteClick = () => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            const newImages = [...images]
            newImages.splice(selectedIndex, 1)
            setImages(newImages)
            setSelectedValue('')
            setSelectedIndex(-1)
            // setDisabledModalBtns(true)
        }
        
    }
    
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

    useEffect(() => {
        const linkEl = document.querySelector('#view-selected-img')
        linkEl.href = selectedValue
    }, [selectedValue])
    
    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value)
        setDisabledModalBtns(e.target.value === '')
        setSelectedIndex(e.target.selectedIndex)
    }

    const handleLinkClick = (e) => {
        if (!selectedValue) {
            e.preventDefault()
            alert('Please select an image.')
        }
    }

    return (
        <div className={`modal form ${props.edit ? 'edit' : ''}`}>
            <label htmlFor="select-category">Category:</label>
            <SelectCategory
                name="select-category"
                id="select-category"
                options={props.categories}
                defaultValue={props.edit && props.entry.category}
            />
            <br />
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" defaultValue={props.edit ? props.entry.title : null} placeholder="Title here" />
            <br />
            <label htmlFor="thumbnail">Thumbnail:</label>
            <input type="file" id="thumbnail" name="thumbnail" />
            {props.edit && <p><a href={props.entry.thumbnail} target='_blank' className='right'>View Original Image</a></p>}
            {props.edit && <br />}
            <br />
            <label htmlFor="caption">Caption:</label>
            <input type="text" id="caption" name="caption" placeholder="Caption here" defaultValue={props.edit ? props.entry.caption : null} />
            <br />
            <label htmlFor="images">Images:</label>
            {!props.edit && <input type="file" id="images" name="images" multiple />}
            {props.edit && <center><div className='modal container gap'>
                <div>
                    <select name="listbox" size='3' onChange={handleSelectChange}>
                    {images.map((image, index) => (
                        <option key={index} value={image}>
                            {image}
                        </option>
                    ))}
                    </select>
                    <p><a href={selectedValue} target='_blank' id="view-selected-img" onClick={handleLinkClick}>View Selected Image</a></p>
                </div>
                
                <div className='block-style'>
                    <MainButton type="special" handleClick={handleAddClick}>ADD</MainButton>
                    <MainButton type="special" handleClick={handleEditClick} disabled={disabledModalBtns}>EDIT</MainButton>
                    <MainButton type="special" handleClick={handleDeleteClick} disabled={disabledModalBtns}>DELETE</MainButton>
                </div>
            </div></center>}
            <div id='publish-button'><MainButton type="special" handleClick={publishEntry} disabled={disabled} disabledText={disabled}>PUBLISH</MainButton></div>            
        </div>
    )      
}

export default ModalForm