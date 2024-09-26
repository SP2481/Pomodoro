import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import * as React from 'react';




const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Box sx={{ display: 'flex' }}>
          <IconButton
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
            className='text-yellow-300 text-xl font-medium'
          >
           Tasks
          </IconButton>
    </Box>
    
    { open && (
      <Drawer
        sx={{
          width: 440,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 440,
            backgroundColor: 'black',
            boxShadow:'rgba(150, 150, 193, 0.25) 0px 50px 100px -20px,rgba(100, 100, 100, 0.3) 0px 30px 60px -30px, rgba(135, 162, 189, 0.35) 0px -2px 6px 0px inset'
          },
           
        }}
        variant="persistent"
        anchor="right"
        open={open}
        className='bg-black'
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} className='flex gap-5 hover:bg-transparent text-yellow-300'>
             <ChevronLeftIcon /> Daily task
          </IconButton>
        </DrawerHeader>
        <Divider />

      </Drawer>
    )
        
    }
    </>
  )}