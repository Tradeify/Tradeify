import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SearchIcon from '@mui/icons-material/Search';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (children)}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SidePanelTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', color: 'black' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant='fullWidth'
          TabIndicatorProps={{
            style: {
              background: 'black'
            }
          }}
          textColor="inherit">
          <Tab icon={<div className='flex flex-row items-center capitalize'><InsertDriveFileIcon />Notes</div>} {...a11yProps(0)} />
          <Tab icon={<div className='flex flex-row items-center capitalize'><SearchIcon />Search</div>} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SidePanelItem spitemtitle={'All Tradenotes'} spitemsubtitle={'Add, Edit, Preview'}
          className={'bg-purple-900 text-white'}>
          <InsertDriveFileIcon />
        </SidePanelItem>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
  );
}

class SidePanelItem extends React.Component {
  render() {
    return (
      <div className='flex flex-col'>
        <div className='flex flex-row px-2 py-3 mb-3 mt-5'>
          <div className={"p-2 rounded " + this.props.className}>
            {this.props.children}
          </div>
          <div className='flex flex-col justify-center ml-3'>
            <div className='text-sm text-black font-semibold'>{this.props.spitemtitle}</div>
            <div className='text-sm mt-[2px] text-slate-400 font-semibold'>{this.props.spitemsubtitle}</div>
            <div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}