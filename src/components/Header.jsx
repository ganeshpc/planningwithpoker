import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ButtonGroup,
} from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import User from './User';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import { useState } from 'react';

const Header = () => {
  const userContext = useUser();
  const gameContext = useGame();

  const [showInvitePlayers, setShowInvitePlayers] = useState(false);

  const navigate = useNavigate();

  const createGameClick = () => {
    navigate('/create-game');
  };

  const joinGame = () => {
    navigate('/join-game');
  };

  const invitePlayers = () => {
    console.log('Invite Players');
  };



  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Planning With Poker
        </Typography>
        {userContext.user !== null ? (
          <>
            <ButtonGroup variant="text" sx={{ marginX: 2 }}>
              <Button color="inherit" variant='outlined' onClick={createGameClick}>
                Create Game
              </Button>
              <Button color="inherit" variant='outlined' onClick={joinGame}>
                Join Game
              </Button>
              {gameContext.game !== null ? (
                <Button color="inherit" variant='outlined' onClick={invitePlayers}>
                  <PersonAddIcon sx={{ marginRight: '1rem' }} /> Invite Players
                </Button>
              ) : null}
            </ButtonGroup>
            <User></User>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
