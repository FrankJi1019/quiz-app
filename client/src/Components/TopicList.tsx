import React, {FC} from 'react'
import {Box} from "@mui/material";
import Topic from "./Topic";

interface TopicListProps {
  topics: Array<string>
  onClick: (topic: string) => void
}

const TopicList: FC<TopicListProps> = ({topics, onClick}) => {
  return (
    <Box>
      {
        topics.map(topic => <Topic text={topic} onClick={() => onClick(topic)} />)
      }
    </Box>
  )
}

export default TopicList
