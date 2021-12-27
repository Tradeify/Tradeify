import React from "react";


class SidePanelItem extends React.Component {
    render() {
        return (
            <div className='flex flex-col'>
                <div className='flex flex-row px-2 py-3 mb-px mt-5'>
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

export default SidePanelItem;