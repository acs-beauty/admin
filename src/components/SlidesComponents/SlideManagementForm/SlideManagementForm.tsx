import { useState } from "react"
import { FormikHelpers } from "formik"

import { useAppDispatch } from "src/redux/hooks"
import { ISlide, ISlidesInitialValues } from "src/types/slides"
import { slidesSchema } from "src/libs/yup/slidesSchema"
import { createNewSlide, patchSlide } from "src/redux/slides/operations"

import AddBannerInput from "../AddBannerInput/AddBannerInput"
import FormGenerator from "src/components/FormGenerator"

interface IProps {
  slide?: ISlide
  onClose: () => void
}

const SlideManagementForm: React.FC<IProps> = ({ slide, onClose }) => {
  const dispatch = useAppDispatch()
  const [desktopBanner, setDesktopBanner] = useState(slide?.desktopBanner || null)
  const [mobileBanner, setMobileBanner] = useState(slide?.mobileBanner || null)

  const addSlidesForm = {
    initialValues: {
      desktopBanner: desktopBanner,
      mobileBanner: mobileBanner,
      priority: slide?.priority || "",
    },
    validationSchema: slidesSchema,
    groups: [
      {
        fields: [
          {
            component: <AddBannerInput fields="desktopBanner" slideBanner={desktopBanner} />,
          },
          {
            component: <AddBannerInput fields="mobileBanner" slideBanner={mobileBanner} />,
          },
        ],
      },
      {
        fields: [{ name: "priority", label: "priority" }],
      },
    ],
    onSubmit: async (
      value: ISlidesInitialValues,
      { resetForm }: FormikHelpers<ISlidesInitialValues>
    ) => {
      const formData = new FormData()
      const { desktopBanner, mobileBanner, priority } = value

      if (desktopBanner && mobileBanner && priority) {
        formData.append("desktopBanner", desktopBanner)
        formData.append("mobileBanner", mobileBanner)
        formData.append("priority", priority)
      }

      try {
        if (slide) {
          const { id } = slide
          dispatch(patchSlide({ id, formData }))
        } else {
          dispatch(createNewSlide(formData))
        }

        setDesktopBanner(null)
        setMobileBanner(null)
        resetForm()
        onClose()
      } catch (error) {
        alert(error)
      }
    },
    isToggler: false,
    btnName: slide ? "РЕДАГУВАТИ" : "ДОДАТИ",
  }

  return <FormGenerator<ISlidesInitialValues> {...addSlidesForm} />
}

export default SlideManagementForm
