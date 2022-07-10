import { Box } from '@mui/material'
import { Container } from '@mui/system'
import './App.css'
import Header from './components/Header'
import { WordleGame } from './components/WordleGame/WordleGame'

export default function App() {
  return (
    <Container>
      <Box sx={{ p: 1, maxWidth: 350 }}>
        <Header />
        <Box sx={{ p: 1 }}>
          <WordleGame />
        </Box>
      </Box>
    </Container>
  )
}
