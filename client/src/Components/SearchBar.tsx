import React, {FC, useEffect, useState} from "react"
import {Box, Button, TextField, useTheme} from "@mui/material";

interface SearchBarProps {
  initValue?: string
  onSearch: (data: string) => void
}

const SearchBar: FC<SearchBarProps> = ({initValue = "", onSearch}) => {

  const [searchInput, setSearchInput] = useState("")
  const theme = useTheme()

  useEffect(() => {
    setSearchInput(initValue)
  }, [initValue])

  return (
    <Box sx={{ width: '100%' }}>
      <form
        style={{ width: "100%", display: "flex"}}
        onSubmit={(e) => {
          e.preventDefault()
          onSearch(searchInput)
        }}
      >
        <TextField
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{
            backgroundColor: 'white',
            borderRadius: '100px 0 0 100px',
            overflow: 'hidden',
            "& .MuiOutlinedInput-notchedOutline": {
              display: 'none'
            },
            border: "3px solid " + theme.palette.primary.main,
            borderRight: "none"
          }}
        />
        <Button
          type="submit"
          sx={{
            borderRadius: '0 100px 100px 0',
            padding: "10px 40px"
          }}
        >
          Research
        </Button>
      </form>
    </Box>
  )
}

export default SearchBar
