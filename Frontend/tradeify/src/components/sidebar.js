import React from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SidePanelTab from './sidepaneltab'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
class Sidebar extends React.Component {
    render() {
        return (
            <div className='sidebar flex flex-col outline-slate-400 border-r-2'>
                <ProfileSection name={'Omotunde Yusuff'} initials={'OY'}></ProfileSection>
                <SidePanelTab></SidePanelTab>
            </div>
        )
    }
}

class ProfileSection extends React.Component {
    render() {
        return (
            <div className='flex flex-col justify-between'>
                <div className='flex flex-row justify-between items-center'>
                    <a href='/'><img src="logo.png" /></a>
                    <div className='flex flex-row'>
                        <div className="initialsLogo text-xs items-center flex flex-row">{this.props.initials}</div>
                        <div className='flex flex-row p-2 text-xs h-fit'>{this.props.name}</div>
                    </div>
                    <button className='p-2 text-slate-500'><ChevronLeftIcon /></button>
                </div>
            </div>
        );
    }
}

export default Sidebar;
