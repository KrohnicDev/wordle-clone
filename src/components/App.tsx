import { Box } from '@mui/material'
import { Container } from '@mui/system'
import { DataProvider } from '../hooks/useWordData'
import { GameStateProvider } from '../hooks/useWordleGame'
import './App.css'
import Header from './Header'
import Game from './WordleGame'

export default function App() {
  return (
    <Container>
      <Box sx={{ p: 1, maxWidth: 350 }}>
        <Header />
        <Box sx={{ p: 1 }}>
          <Game />
        </Box>
      </Box>
    </Container>
  )
}
