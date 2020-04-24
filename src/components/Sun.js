import React , { useEffect, useState , useCallback} from 'react';
import useInterval from './useInterval'
import sun from '../assets/images/sun.gif'
function App({ScreenWidth,IsDay,setIsDay}) {
  const [Position, setPosition] = useState({top:50, right: -100})
  
  useInterval(()=>{
    if(ScreenWidth){
        if(Position.top === 50 && Position.right === -100){
            setIsDay(true)
            setPosition({top: 0, right: (ScreenWidth - 100) / 2})
        }else if(Position.top === 0 && Position.right === (ScreenWidth - 100) / 2){
            setPosition({top: 50, right: ScreenWidth})
        }else if(Position.top === 50, Position.right === ScreenWidth){
            setIsDay(false)
            setPosition({top : 50, right: -100})
        }
    }
  }, 10000)

  return (
    <div className="sun" style={{top: Position.top, right: Position.right , transition: IsDay ? 'all 10s cubic-bezier(0,0,0,0)' : 'none'}}>
        <img alt="" src={sun}  />
    </div>
  );
}

export default App;
