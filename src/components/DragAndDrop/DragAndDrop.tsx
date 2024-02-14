import s from "./DragAndDrop.module.scss"
import PlusIcon from "../../images/svg/PlusIcon.tsx"
import React, { useState } from "react"

interface IDragAndDrop {
  onFileChange: (fileList: File[]) => void
}

const DragAndDrop: React.FC<IDragAndDrop> = ({ onFileChange }) => {
  const [drag, setDrag] = useState(false)
  const [fileList, setFileList] = useState<File[]>([])
  console.log(fileList)

  const dragStartHandler = (e: any) => {
    e.preventDefault()
    setDrag(true)
  }

  const dragLeaveHandler = (e: any) => {
    // e.preventDefault()
    setDrag(false)
  }

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    let files = Array.from(e.dataTransfer.files);
    setFileList(files);
    setDrag(false)
    onFileChange(files);
  }

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let files = Array.from(e.target.files);
      setFileList(files);
      onFileChange(files); // Trigger the callback with the new files
    }
  };

  return (
    <>
      <div className={s.drop__section}>
        <div
          className={drag ? s.drop_area : ''}
          onDragStart={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragStartHandler}
          onDrop={onDropHandler}
        >
          {!drag ? (
            <div className={s.drop__main_img}>
              {fileList[0] ? (
                <img src={URL.createObjectURL(fileList[0])} alt="" className={s.drop_img} />
              ) : <PlusIcon />}
              <div>
                <input type="file" onChange={onFileInputChange} multiple />
              </div>

            </div>
          ) : null}
        </div>



        <div >
          <div className={s.drop__list_img}>
            {Array.from({ length: 9 }).map((_, index) => {
              const elem = fileList[index];

              return (
                <div
                  className={s.drop__list_icon}
                  draggable={true}
                >
                  <div key={index} className={s.drop__list_block}> 
                    {elem ? (
                      <img className="s.drop__small_img" src={URL.createObjectURL(elem)} alt={`file-${index}`} />
                    ) : (
                      <PlusIcon />
                    )}
                    <input type="file" onChange={onFileInputChange} multiple />
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  )
}

export default DragAndDrop
