import React, {FC, useState} from 'react'
import {Box, IconButton, TextField} from "@mui/material";
import Topic from "./Topic";
import AddIcon from '@mui/icons-material/Add';
import {Autocomplete} from "@mui/lab";

interface TopicListProps {
  topics: Array<string>
  onClick: (topic: string) => void
  onDelete?: undefined | ((topic: string) => void)
  onAdd?: undefined | ((topic: string) => void)
  topicPool?: Array<string>
}

const TopicList: FC<TopicListProps> = ({topics, onClick, onDelete, onAdd, topicPool}) => {

  const [displayElement, setDisplayElement] = useState<"button" | "autocomplete">("button")
  const [newTopic, setNewTopic] = useState("")

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center"
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center"
        }}
      >
        {
          topics.map(topic =>
            <Topic
              text={topic}
              onClick={() => onClick(topic)}
              onDelete={onDelete && (() => onDelete(topic))}
            />
          )
        }
      </Box>
      {
        onAdd && (
          displayElement === "button" ?
          (
            <Box>
              <IconButton onClick={() => setDisplayElement("autocomplete")}>
                <AddIcon />
              </IconButton>
            </Box>
          ) : (
            <Box>
              <Autocomplete
                freeSolo
                blurOnSelect={false}
                options={topicPool || []}
                onInputChange={(event: any, newValue: any | null) => {
                  setNewTopic(newValue)
                }}
                onBlur={() => {
                  onAdd(newTopic)
                  setDisplayElement("button")
                }}
                // onChange={() => {
                //   onAdd(newTopic)
                //   setDisplayElement("button")
                // }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    autoFocus
                    sx={{
                      width: "130px"
                    }}
                  />
                )}
              />
            </Box>
          )
        )
      }
    </Box>
  )
}

export default TopicList
