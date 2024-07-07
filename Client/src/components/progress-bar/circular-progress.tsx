import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex', height:'1rem', width: '1rem', justifyContent:'center', alignItems:'center' }}>
      <CircularProgress sx={{ color: 'black'}}/>
    </Box>
  );
}