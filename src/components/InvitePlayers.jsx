import {
  Alert,
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  Typography,
  Snackbar,
} from '@mui/material';

import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import LinkIcon from '@mui/icons-material/Link';

import { useGame } from '../context/GameContext';
import { useState } from 'react';

const InvitePlayers = () => {
  const gameContext = useGame();

  const [open, setOpen] = useState(false);

  const copyGameId = () => {
    navigator.clipboard.writeText(gameContext.game.id).then(() => {
      setOpen(true);
    });
  };

  const copyGameLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setOpen(true);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {gameContext.game && (
        <Box
          sx={{
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Invite Players
          </Typography>

          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              value={gameContext.game.id}
              fullWidth
              label="Game Id"
              name="gameId"
              InputProps={{
                readOnly: true,
              }}
            />
            <Button
              fullWidth
              onClick={copyGameId}
              variant="contained"
              sx={{ mt: 3, mb: 2, p: 1 }}
              startIcon={<ContentCopyIcon />}
            >
              Copy Game Id
            </Button>
          </Box>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              value={window.location.href}
              fullWidth
              label="Game Link"
              name="gameLink"
              InputProps={{
                readOnly: true,
              }}
            />
            <Button
              fullWidth
              onClick={copyGameLink}
              variant="contained"
              sx={{ mt: 3, mb: 2, p: 1 }}
              startIcon={<LinkIcon />}
            >
              Copy Game Link
            </Button>
          </Box>
        </Box>
      )}

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default InvitePlayers;
