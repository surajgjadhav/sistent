import { Box, Button, ListItemButton, styled } from '@mui/material';
import { CARIBBEAN_GREEN_FILL, KEPPEL_GREEN_FILL } from '../../constants/constants';

export const FiltersCardDiv = styled(Box)(() => ({
  padding: '1rem',
  borderRadius: '1rem',
  backgroundColor: 'white',
  width: '100%',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
  display: 'block',
  height: 'fit-content',
  ['@media (max-width:900px)']: {
    display: 'none'
  }
}));

export const FilterDrawerDiv = styled('div')(() => ({
  display: 'none',
  ['@media (max-width:899px)']: {
    display: 'block'
  }
}));

export const LabelDiv = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'
}));

// export const CloseButton = styled(CloseIcon)(() => ({
//   transform: "rotate(-90deg)",
//   "&:hover": {
//     transform: "rotate(90deg)",
//     transition: "all .3s ease-in",
//     cursor: "pointer"
//   },
//   table: {
//     minWidth: "62.625rem"
//   }
// }));

export const FilterButton = styled(Button)(() => ({
  backgroundColor: KEPPEL_GREEN_FILL,
  '&:hover': {
    backgroundColor: CARIBBEAN_GREEN_FILL
  },
  height: '3.5rem',
  ['@media (max-width:450px)']: {
    minWidth: '0px'
  }
}));

export const FiltersDrawerHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  backgroundColor: '#294957',
  height: '10vh',
  boxShadow: '0px 4px 4px rgba(0, 179, 159, 0.4)',
  marginBottom: '0.625rem'
}));

export const CheckBoxButton = styled(ListItemButton)(() => ({
  padding: '0.25rem 2rem',
  borderBottom: '1px solid',
  borderBottomColor: '#cccccc'
}));

export const FilterTitleButton = styled(ListItemButton)(() => ({
  backgroundColor: '#F6F8F8',
  borderRadius: '0.5rem',
  marginTop: 2,
  display: 'flex',
  justifyContent: 'space-between'
}));
