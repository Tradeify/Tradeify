import React from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SidePanelTab from './sidepaneltab'
import SidePanelItem from "./sidepanelitem";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
class Sidebar extends React.Component {
    render() {
        return (
            <div className='sidebar flex flex-col outline-slate-400 border-r-2'>
                <ProfileSection
                    name={(this.props.user) ? this.props.user.firstname + ' ' + this.props.user.lastname : 'Omotunde Yusuff'}
                    initials={(this.props.user) ? this.props.user.firstname[0] + this.props.user.lastname[0] : 'OY'}
                ></ProfileSection>
                <SidePanelTab></SidePanelTab>
                <div className='fixed bottom-5 left-4'>
                    <SidePanelItem spitemtitle={'Help'} spitemsubtitle={'Lessons, Ideas, FAQs'}
                        className={'bg-[#03DCCF] text-white'}>
                        <HelpCenterIcon />
                    </SidePanelItem>
                </div>
            </div>
        )
    }
}

class ProfileSection extends React.Component {
    render() {
        return (
            <div className='flex flex-col justify-between'>
                <div className='flex flex-row justify-between items-center'>
                    <a href='/'><img src="tradeify_icon.svg" alt="logo" /></a>
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
