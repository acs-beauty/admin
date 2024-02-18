const TrashIcon = ({ size }: { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M19.001 4H15.501L14.501 3H9.50098L8.50098 4H5.00098V6H19.001M6.00098 19C6.00098 19.5304 6.21169 20.0391 6.58676 20.4142C6.96184 20.7893 7.47054 21 8.00098 21H16.001C16.5314 21 17.0401 20.7893 17.4152 20.4142C17.7903 20.0391 18.001 19.5304 18.001 19V7H6.00098V19Z"
        fill="#5C5E60"
      />
    </svg>
  )
}

export default TrashIcon
