import React from "react";
class MainSection extends React.Component {
   constructor(props) {
      super(props);
      this.state = { alltradenotes: [] }
   }

   componentDidMount() {
      this.GetAllTradenotes()
   }

   GetAllTradenotes() {

      var requestOptions = {
         method: 'GET',
         redirect: 'follow',
         credentials: 'include'
      };

      fetch(process.env.REACT_APP_DJANGO_API + "get_all_tradenotes", requestOptions)
         .then(response => {
            console.log(response)
            if (response.status == 200) {
               return response.json()
            } else if (response.status == 401) {
               
            }
         }

         )
         .then(result => {
            console.log(result)
            this.setState({ alltradenotes: result.Tradenotes })
         })
         .catch(error => {
            console.log('error', error)
         });
   }

   render() {
      return (
         <div className="p-4 mainSection">

            {this.state.alltradenotes.map((tradenote) => {
               return (<TradeNote />)
            }

            )}

            <TradeNote />
            <TradeNote summary={`
What is Lorem Ipsum?

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
Why do we use it?

It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

Where does it come from?

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites`} />
            <TradeNote />
            <TradeNote />
            <TradeNote />
            <TradeNote />
            <TradeNote />
            <TradeNote />
            <TradeNote />
            <TradeNote />
            <TradeNote />
            <TradeNote />
         </div>
      );
   }
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