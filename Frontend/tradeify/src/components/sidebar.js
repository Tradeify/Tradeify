import React from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
class Sidebar extends React.Component {
    render() {
        return (
            <div className='sidebar flex flex-col'>
                <ProfileSection name={'Omotunde Yusuff'} initials={'OY'}></ProfileSection>
            </div>
        )
    }
}

class ProfileSection extends React.Component {
    render() {
        return (
            <div className='flex flex-row topSection'>
                <a href='/'><img src="logo.png"/></a>
                <div className="initialsLogo"><p>{this.props.initials}</p></div>
                <div className='flex flex-row'><p>{this.props.name}</p></div>
                <button><ChevronLeftIcon/></button>
            </div>
        );
    }
}


export default Sidebar;
