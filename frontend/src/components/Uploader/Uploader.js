import { useState } from 'react'
import './Uploader.css'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'

function Uploader() {

  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No selected file")
  return (
      <div className='uploader'>
        <form className='uploader-form'
      onClick={() => document.querySelector(".input-field").click()}
      >
        <input type="file" accept='image/*' className='input-field' hidden
        onChange={({ target: {files}}) => {
          files[0] && setFileName(files[0].name)
          if(files){
            setImage(URL.createObjectURL(files[0]))
          }
        }}
         />

        {image ?
        <img src={image} alt={fileName} />
        :
        <>
        <MdCloudUpload color='rgb(15, 220, 247)' size={100} />
        <p>Browse Files to upload</p>
        {/* <p>Thả tập tin tại đây</p> */}
        </>
      }

      </form>

      <section className='uploaded-row'>
        <AiFillFileImage color='rgb(15, 220, 247)' size={25}/>
        <span className='upload-content'>
          {fileName} -
          <MdDelete color='rgb(15, 220, 247)' size={25}
          onClick={() => {
            setFileName("No selected File")
            setImage(null)
          }}
           />
        </span>
      </section>
      </div>
  )
}

export default Uploader