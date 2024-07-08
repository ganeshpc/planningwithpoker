import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ButtonGroup,
  Dialog,
} from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import User from './User';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import { useState } from 'react';
import InvitePlayers from './InvitePlayers';

const Header = () => {
  const userContext = useUser();
  const gameContext = useGame();

  const [showInvitePlayers, setShowInvitePlayers] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true);

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

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Planning With Poker
        </Typography>
        {userContext.user !== null ? (
          <>
            <Dialog open={dialogOpen} onClose={closeDialog}>
              <InvitePlayers></InvitePlayers>
            </Dialog>
            <ButtonGroup variant="text" sx={{ marginX: 2 }}>
              <Button
                color="inherit"
                variant="outlined"
                onClick={createGameClick}
              >
                Create Game
              </Button>
              <Button color="inherit" variant="outlined" onClick={joinGame}>
                Join Game
              </Button>
              {gameContext.game !== null ? (
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={invitePlayers}
                >
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
