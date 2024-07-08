import { useState, useCallback } from 'react';

const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });

  const showSnackbar = useCallback((message) => {
    setSnackbar({
      open: true,
      message,
    });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbar({
      open: false,
      message: '',
    });
  }, []);

  const SnackbarComponent = (
    <Snackbar
      open={snackbar.open}
      message={snackbar.message}
      autoHideDuration={3000}
      onClose={closeSnackbar}
    />
  );

  return { showSnackbar, closeSnackbar, SnackbarComponent };
};

export default useSnackbar;
