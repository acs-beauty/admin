const CheckedIcon = ({ size }: { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 12}
      height={size || 11}
      viewBox="0 0 12 11"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0609 0.922259C11.518 1.23217 11.6374 1.85399 11.3275 2.31112L6.24291 9.81112C6.07686 10.0561 5.81086 10.2149 5.51647 10.2448C5.22208 10.2748 4.92953 10.1728 4.71753 9.9664L0.802092 6.1535C0.406422 5.76819 0.398022 5.13508 0.783331 4.73941C1.16864 4.34374 1.80175 4.33534 2.19742 4.72065L5.25747 7.70056L9.67204 1.18883C9.98195 0.731697 10.6038 0.612348 11.0609 0.922259Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

export default CheckedIcon
