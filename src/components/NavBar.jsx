import { React, useState, useEffect } from "react";
import Logo from "../assets/react.svg"


const NavBar = () => {
    const [state,setState] = useState(false) 
    const [color, setColor] = useState("bg-cyan-300"); 

    const HandleClick = ()=>{
        setState(!state)
    }

    const colorChange = ()=>{
        color == "bg-cyan-300"? setColor ("bg-red-500") : setColor("bg-cyan-300");
    }

    useEffect(()=>{
        console.log(color)
    },[color])

  return (
    <>
      <nav>
        <div className="flex justify-between px-10 bg-black py-5 text-white">
          <div>
            <img src={Logo} alt="" />
          </div>
          <div>
            <ul className="flex gap-4">
              <li>Home</li>
              <li>Home</li>
              <li>Home</li>
              <li>Home</li>
            </ul>
          </div>
          <div>
            <button
              className="px-4 py-1.5 bg-blue-400 rounded-full"
              onClick={HandleClick}
            >
              Click here
            </button>
          </div>
        </div>

        {state ? (
          <div className={`h-80 ${color}`}>
            <h1>Hello Mango Students</h1>
            <button className="px-4 py-1.5 bg-blue-400 rounded-full" onClick={colorChange}>
              change
            </button>
          </div>
        ) : null}
      </nav>
    </>
  );
}




export default NavBar