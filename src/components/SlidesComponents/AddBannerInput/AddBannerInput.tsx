import { useFormikContext } from "formik"
import { ChangeEvent, FC, ReactNode, useRef, useState } from "react"

import s from "./AddLogoInput.module.scss"
import DeleteIcon from "src/images/svg/DeleteIcon"
import AddImageIcon from "src/images/svg/AddImageIcon"

import { IAddBannerInput } from "src/types/slides"

const AddBannerInput: FC<IAddBannerInput> = ({ fields, slideBanner }) => {
  const { setFieldValue, errors } = useFormikContext<{ [key: string]: File }>()
  const [image, setImage] = useState(slideBanner || "")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files?.length) return

    const file = e.currentTarget.files[0]
    setFieldValue(fields, file)

    const imageUrl = URL.createObjectURL(file)
    setImage(imageUrl)
  }

  const handleCloseIconClick = () => {
    setImage("")
    setFieldValue(fields, null)
  }

  return (
    <>
      {image ? (
        <div className={s.slide_form__image_container}>
          <img className={s.slide_form__image} src={image} alt="banner" />
          <div className={s.slide_form__image_delete_icon} onClick={handleCloseIconClick}>
            <DeleteIcon fill={"#5C5E60"} />
          </div>
        </div>
      ) : (
        <div>
          <div
            className={s.slide_form__download_container}
            onClick={() => inputRef.current?.click()}
          >
            <AddImageIcon fill={"#5C5E60"} />
            <p className={s.slide_form__download_text}>Завантажити банер</p>
          </div>
        </div>
      )}
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className={s.slide_form__image_input}
      />
      {errors[fields] && <p className={s.error}>{errors[fields] as ReactNode}</p>}
    </>
  )
}

export default AddBannerInput
