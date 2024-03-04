import React from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import NotificationsTable from "../NotificationsTable/NotificationsTable.tsx"
import { useSelector } from "react-redux"
import { selectNotifications } from "../../../redux/notifications/selectors.tsx"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          <div>{children}</div>
        </div>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const NotificationsTabs = () => {
  const [value, setValue] = React.useState(0)
  const notifications = useSelector(selectNotifications)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const unreadItems = notifications.filter(item => item.status === "unread")

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Всі" {...a11yProps(0)} />
          <Tab label={`Непрочитані(${unreadItems.length})`} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <NotificationsTable rows={notifications} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <NotificationsTable rows={unreadItems} />
      </CustomTabPanel>
    </Box>
  )
}

export default NotificationsTabs
