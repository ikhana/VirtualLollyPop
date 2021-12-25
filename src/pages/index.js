import { navigate } from "gatsby"
import React from "react"
import Header from "../components/Header"
import Lolly from "../components/Lolly"



export default function Home() {
  return <div className="container">
    <div><Header/></div>
<div className="lolly-main">
   <div> <Lolly fillLollyBottom='#deaa43' fillLollyMiddle="#e95946" fillLollyTop="#d52358" /></div>
    <div><Lolly fillLollyBottom='pink' fillLollyMiddle="pink" fillLollyTop="yellow" /></div>
    
</div>
<input type="button" value='Create New Lolly'  
onClick={
  ()=>{
    navigate('NewLolly')
  }
  
  }></input>
    
   
    
  </div>
}
