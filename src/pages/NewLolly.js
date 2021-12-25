import React, { useRef, useState } from "react";
import Header from "../components/Header";
import Lolly from "../components/Lolly";

import {useQuery,gql, useMutation} from "@apollo/client";


const GetLollyData =gql`
{
    hello
}

`

const lollyMutation = gql`
mutation createLolly($recipientName: String!, $message: String!, $senderName: String!, $flavourTop: String!, $flavourMiddle: String!,$flavourBottom: String!){
    createLolly( recipientName: $recipientName, message: $message, senderName: $senderName, flavourTop: $flavourTop, flavourMiddle: $flavourMiddle, flavourBottom: $flavourBottom){
        message
        pathLolly
        
    }
}

`


export default function NewLolly(){

    const [topColor,setTopColor] = useState('#FF1493');
    const [middleColor,setMiddleColor] = useState("#ffff00");
    const [bottomColor, setBottomColor] = useState("#00ff00")

  const {loading,error,data} =useQuery(GetLollyData )

    const recipientNameRef = useRef();
    const messsageRef = useRef();
    const senderNameRef = useRef();

    const[createLolly] =useMutation(lollyMutation);


    const submitLollyForm =async() =>{

   
   const result = await  createLolly({
            variables:{
                recipientName: recipientNameRef.current.value,
                message:messsageRef.current.value  ,
                senderName:senderNameRef.current.value ,
                flavourTop: topColor,
                flavourMiddle:middleColor ,
                flavourBottom: bottomColor
            }
        })

    }


    return (
        <div className="container">
            
            {data && data.hello && <div>{JSON.stringify(data.hello)}</div>}
            
    <div><Header/>
    
    </div>
    <div className="lollyFormdiv">
        <div> <Lolly fillLollyBottom={bottomColor} fillLollyMiddle={middleColor} fillLollyTop={topColor} />
    </div>
        <div className="lollyflavourDiv">
            <label htmlFor="flavourTop" className="colorPickerLable">
            <input type="color" value={topColor} className="colorPicker"  name="flavourTop" id="flavourTop"
            onChange={
                (e)=> {
                    setTopColor(e.target.value)
                }
            }
            />
            </label>
            <label htmlFor="flavourTop" className="colorPickerLable">
            <input type="color" value={middleColor} className="colorPicker" name="flavourMiddle" id="flavourMidle"
              onChange={
                (e)=> {
                    setMiddleColor(e.target.value)
                }
            }
            />
            </label>
            <label htmlFor="flavourTop" className="colorPickerLable">
            <input type="color" value={bottomColor}className="colorPicker" name="flavourBottom" id="flavourBottom"
            
            onChange={
                (e)=> {
                    setBottomColor(e.target.value)
                }
            }
            />
            </label>
            </div>
        <div className="lollyInputDiv">
            <label htmlFor="recipientName" >To</label>
            <input type="text" name="recipientName" id="recipientName" ref={recipientNameRef}/>
            <label htmlFor="message">Message</label>
           <textarea name="message" id="" cols="30" rows="20" ref={messsageRef}></textarea>
            <label htmlFor="senderName">From</label>
            <input type="text" name="senderName" id="recipientName" ref={senderNameRef}/>
            <br />
            <br />
            <button onClick={submitLollyForm}>Create Lolly</button>
        </div>
    </div>


   
    
  </div>
    )
}