import React from "react";

function MainSection(props) {
var alltradenotes = []

   function GetAllTradenotes() {
      var requestOptions = {
         method: 'GET',
         redirect: 'follow',
         credentials: 'include'
      };

      fetch(process.env.REACT_APP_DJANGO_API + "get_all_tradenotes", requestOptions)
         .then(response => {
            console.log(response)
            if (response.status === 200) {
               return response.json()
            } else if (response.status === 401) {
               props.spc(false);
               props.path('../');
               props.requireLogin();
               return null
            }
         }

         )
         .then(result => {
            alltradenotes = result.Tradenotes
            console.log(alltradenotes)
         })
         .catch(error => {
            console.log('error', error)
         });
   }

   if (props.performRequest) {
      GetAllTradenotes(); 
   }

   return (
      <div className="p-4 mainSection">

         {alltradenotes.map((tradenote) => {
            console.log(tradenote)
            return (<TradeNote summary={tradenote.summary}/>)
         })}

     
      </div>
   );
}


class TradeNote extends React.Component {
   render() {
      return (
         <button className="w-56 border-2 rounded border-gray-100 hover:shadow-lg duration-[350ms] ease-in text-sm text-gray-500 hover:bg-[#03dccf]/10 hover:border-[#03dccf]"
            style={{
               gridRow: "span " + (this.props.summary && this.props.summary.length > 140 ? 2 : 1) + " / auto"
            }}>
            <div className="flex flex-col justify-between p-4 w-full min-h-[200px] h-full text-left ">
               <div>
                  <div className="title text-lg font-semibold text-black mb-2">{this.props.title ? this.props.title : "Default Title"}</div>
                  <div className="w-full border-t-2 border-inherit hover:border-inherit mb-2" />
                  <div className="summary max-h-60 overflow-hidden">{this.props.summary ? this.props.summary : "Summary"}</div>
               </div>
               <div>
                  <div className="emotions mb-3">{this.props.emotions ? this.props.emotions : ":) :("}</div>
                  <div className="lastUpdated">Last Updated: {this.props.lastUpdatedDate ? this.props.lastUpdatedDate : "3 days ago"}</div>
               </div>
            </div>
         </button>
      );
   }
}

export default MainSection