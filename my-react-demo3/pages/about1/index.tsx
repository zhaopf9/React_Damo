import About2 from '@/components/about2'
import React,{useState,useEffect} from 'react'


export default function About1() {

  const [name, setname] = useState("tony");

  const canSubmit=(event:any)=>{
    setname(event.target.value)
  }

  return (
    <div>
      <h1>this is about1 page</h1>
      <About2 name={name} />
      <input  defaultValue={name} onChange={canSubmit}/>
    </div>
  )
}
