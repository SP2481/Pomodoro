import { Box, Popover } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dispatch, SetStateAction, useState } from 'react';

export default function TimerPopup({ setTime, isActive }: { setTime: Dispatch<SetStateAction<number>>, isActive:boolean }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <button
        className='w-24 h-10 bg-white rounded transform hover:scale-105 transition-transform duration-200 disabled:bg-gray-600 disabled:hover:scale-100 disabled:active:scale-100 disabled:text-white'
        onClick={handleClick}
        disabled={isActive}
      >
        Set timer
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className='mt-2'
        sx={{
          '& .MuiList-root.MuiMultiSectionDigitalClockSection-root::after': {
            display: 'none',
          },
        }}
      >
        <Box className='h-max w-max' >
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <TimePicker
              ampm={false}
              views={['minutes']}
              format="mm"
              label="Minutes"
              onChange={(value: any) => {
                setTime(value.$m * 60)
              }}
              closeOnSelect={true}
              ampmInClock={false}
            />
          </LocalizationProvider>
        </Box>
      </Popover>
    </div>
  );
}
