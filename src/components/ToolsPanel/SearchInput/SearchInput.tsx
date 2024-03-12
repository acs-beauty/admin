import React from "react"
import s from "./SearchInput.module.scss"
import SearchIcon from "src/images/svg/SearchIcon"

import { DebounceInput } from "react-debounce-input"

interface IProps {
  onChange: (value: string) => void
  width?: string
}

const SearchInput: React.FC<IProps> = ({ onChange, width }) => {
  return (
    <div className={s.searchInputContainer} style={{ width: `${width}` }}>
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        onChange={e => onChange(e.target.value)}
        className={s.searchInput}
      />

      <SearchIcon className={s.searchIcon} />
    </div>
  )
}

export default SearchInput
