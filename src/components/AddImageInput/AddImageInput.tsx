/* eslint-disable react-hooks/exhaustive-deps */
import { useFormikContext } from "formik"
import { ChangeEvent, FC, ReactNode, useEffect, useRef, useState } from "react"
import AddIcon from "src/images/svg/AddIcon_"
import Border from "../Border"
import s from "./AddImageInput.module.scss"
import { IAddImageInput } from "src/types"
import DeleteIcon from "src/images/svg/DeleteIcon"

const AddImageInput: FC<IAddImageInput> = ({ categoryName, logo, inputToggler }) => {
  const { setFieldValue, errors, dirty } = useFormikContext<{ image: File }>()
  const [image, setImage] = useState(logo || "")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    handleCloseIconClick()
  }, [inputToggler])

  useEffect(() => {
    const input = inputRef.current
    const handleCancelImageChange = () => setFieldValue("image", "")
    input?.addEventListener("cancel", handleCancelImageChange)
    return () => input?.removeEventListener("cancel", handleCancelImageChange)
  }, [])

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files?.length) return
    const file = e.currentTarget.files[0]
    setFieldValue("image", file)
    if (file.type.split("/")[0] !== "image") return
    const imageUrl = URL.createObjectURL(file)
    setImage(imageUrl)
  }

  const handleCloseIconClick = () => {
    setImage("")
    setFieldValue("image", "")
    const input = inputRef.current
    if (input) input.value = ""
  }

  const handleAddIconClick = () => inputRef.current?.click()

  return (
    <>
      <Border border="borderDashed" className={s.add_img__border}>
        {image ? (
          <div className={s.add_img__image_container}>
            <img src={image} alt={categoryName} className={s.add_img__image} />
            <DeleteIcon onClick={handleCloseIconClick} className={s.add_img__add_close_icon} />
          </div>
        ) : (
          <div onClick={handleAddIconClick} className={s.add_img__load_container}>
            <AddIcon className={s.add_img__add_icon} />
            <p className={s.add_img__text}>Додати зображення</p>
          </div>
        )}
        <input
          name="image"
          type="file"
          accept="image/*"
          className={s.add_img__input}
          onChange={handleImageChange}
          ref={inputRef}
        />
      </Border>
      {errors.image && dirty && <p className={s.error}>{errors.image as ReactNode}</p>}
    </>
  )
}

export default AddImageInput
