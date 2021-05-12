
import React,{useState,Component} from 'react'
interface Props{
  name:string
}

//函数组件
// export default function About2(props:any) {
//   return (
//     <div>
//       <span>this is about2 name:</span>{props.name}
//     </div>
//   )
// }


export default class About2 extends Component<Props> {
  render() {
    return (
      <div>
        <span>this is about2 name:</span>{this.props.name}
      </div>
    )
  }
}

