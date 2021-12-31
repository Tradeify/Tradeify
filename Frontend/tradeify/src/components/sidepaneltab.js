import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import SidePanelItem from './sidepanelitem';

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
                    variant='standard'
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
                <SidePanelItem spitemtitle={'Favorites'} spitemsubtitle={'Easy Access'}
                    className={'bg-[#FF9F0E] text-white'}>
                    <StarIcon />
                </SidePanelItem>
                <SidePanelItem spitemtitle={'Trash'} spitemsubtitle={'Recover Files'}
                    className={'bg-[#EB0000] text-white'}>
                    <DeleteIcon />
                </SidePanelItem>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
        </Box>
    );
}

