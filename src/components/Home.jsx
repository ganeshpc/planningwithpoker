import { Typography, Box, Button, ButtonGroup } from '@mui/material';

import { useUser } from '../context/UserContext';
import CreateUser from './CreateUser';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const userContext = useUser();
  const navigate = useNavigate();

  const goToCreateGame = () => {
    navigate('/create-game');
  };

  const goToJoinGame = () => {
    navigate('/join-game');
  };

  return (
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
      <Typography variant="h4" gutterBottom>
        Welcome to Planning Poker
      </Typography>
      {userContext.user === null ? (
        <CreateUser></CreateUser>
      ) : (
        <ButtonGroup>
          <Button
            sx={{ margin: '1rem' }}
            size="large"
            variant="contained"
            onClick={goToCreateGame}
          >
            Create Game
          </Button>
          <Button
            sx={{ margin: '1rem' }}
            size="large"
            variant="contained"
            onClick={goToJoinGame}
          >
            Join Game
          </Button>
        </ButtonGroup>
      )}
    </Box>
  );
};

export default HomePage;
