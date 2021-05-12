import { NavLink } from 'react-router-dom';
import './index.less'
import { Redirect, Route, Switch } from 'react-router'
import Test_1 from './Test_1'
import Test_2 from './Test_2'

export default function Practice(props:any) {
    return (
        <div className="about">
            <NavLink to="/practice/test_1">Test_1</NavLink>
            <NavLink to="/practice/test_2">Test_2</NavLink>
            <div>
            <Switch>
                <Route path="/practice/test_1" component={Test_1}></Route>
                <Route path="/practice/test_2" component={Test_2}></Route>
                {/* 当路由未匹配到时Redirect返回特定页面 */}
                <Redirect to="/practice/test_1" ></Redirect>
            </Switch>
            </div>
            
        </div>
    )
}
