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
                <SidePanelItem spitemtitle={'All Tradenotes'} spitemsubtitle={'Add, Edit, Preview'}
                className={'bg-purple-900 text-white'}
                ><InsertDriveFileIcon/></SidePanelItem>
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



export default Sidebar;
