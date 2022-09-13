import React, {FC, useEffect, useState} from "react"
import {Box, Button, TextField} from "@mui/material";

interface SearchBarProps {
  initValue?: string
  onSearch: (data: string) => void
}

const SearchBar: FC<SearchBarProps> = ({initValue = "", onSearch}) => {

  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    setSearchInput(initValue)
  }, [initValue])

  return (
    <Box>
      <form
        style={{ width: "100%", display: "flex" }}
        onSubmit={(e) => {
          e.preventDefault()
          onSearch(searchInput)
        }}
      >
        <TextField
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button type="submit">Research</Button>
      </form>
    </Box>
  )
}

export default SearchBar
