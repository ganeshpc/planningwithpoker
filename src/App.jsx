import { Box, Container } from '@mui/material';
import Header from './components/Header';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import CreateGame from './components/CreateGame';
import Game from './pages/GamePage';
import JoinGame from './components/JoinGame';
import InvitePlayers from './components/InvitePlayers';

const App = () => {
  return (
    <Container>
      <Header></Header>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '6rem',
          flexDirection: 'column',
          boxSizing: 'border-box',
          outlineColor: '#74b3ff',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create-game" element={<CreateGame />}></Route>
          <Route path="/join-game" element={<InvitePlayers />}></Route>
          <Route path="/game/:gameId" element={<Game />}></Route>
        </Routes>
      </Box>
    </Container>
  );
};

export default App;
