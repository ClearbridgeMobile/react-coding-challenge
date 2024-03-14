import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularColor() {
  return (
    <Stack
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'grey.500'
      }}
      spacing={2}
      direction="row"
    >
      <CircularProgress color="success" />
    </Stack>
  );
}