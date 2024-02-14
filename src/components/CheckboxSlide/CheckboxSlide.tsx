import s from "./CheckboxSlide.module.scss"
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store.ts';

const productsStates = [
  {
    "id": 3,
    "title": "Новинка",
  },
  {
    "id": 4,
    "title": "Акція",
  },
  {
    "id": 5,
    "title": "Хіт",
  }
]

const CheckboxSlide = () => {
  const [checkedStates, setCheckedStates] = useState(new Array(productsStates.length).fill(false));

  const hideBorder = useSelector((state: RootState) => state.hideBorder.value);
  const dispatch = useDispatch();

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedStates = checkedStates.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedStates(updatedCheckedStates);
  }

  const sectionStyle = hideBorder ? {
    background: 'none',
    border: 'none',
    boxShadow: 'none'
  } : {};

  return (
    <>
      {productsStates.map((item, index) => (
        <div key={item.id} className={s.slide__block}>
          <div className={s.slide__title}>
            {item.title}
          </div>
          <div className={`${s.slide} ${checkedStates[index] ? s.active : s.inactive}`} >
            <input
              type="checkbox"
              value="None"
              onChange={() => handleCheckboxChange(index)}
              id={`${item.id}`}
              name="check"  />
            <label htmlFor={`${item.id}`} ></label>
          </div>
        </div>
      ))}
    </>
  )
}

export default CheckboxSlide;