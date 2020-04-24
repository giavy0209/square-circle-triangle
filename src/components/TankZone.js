import React , { useEffect, useState , useCallback,useRef} from 'react';
import Tank from './Tank'
import Bullet from './Bullet'
import useInterval from './useInterval'


function App({hitMonster}) {
    const [TankMove, setTankMove] = useState({position: 0, dirrectLeft: false})
    
    const [ListBullet,setListBullet] = useState([])
    const [ListBulletMove,setListBulletMove] = useState([])
    const [ListBulletPosition,setListBulletPosition] = useState([])

    useInterval(()=>{
        var tankzoneHeight = document.querySelector('.tank-zone').offsetHeight;
        ListBullet.push(false)
        ListBulletMove.push(tankzoneHeight / 2)
        ListBulletPosition.push(TankMove.position)
        setListBulletMove([...ListBulletMove])
        setListBulletPosition([...ListBulletPosition])
        setListBullet([...ListBullet])
    },1000)

    useInterval(()=>{
        ListBulletMove.forEach((el,idx)=>{
            ListBulletMove[idx] = el - 4;
        })
        ListBulletMove.forEach((el,idx)=>{
            if(el < -50){
                ListBulletMove.splice(idx, 1)
                ListBullet.splice(idx,1)
                ListBulletPosition.splice(idx,1)
                hitMonster()
            }
        })
        setListBulletMove([...ListBulletMove])
        setListBulletPosition([...ListBulletPosition])
        setListBullet([...ListBullet])
    },5)
    

  return (
    <div className="tank-zone">
        <Tank
        TankMove={TankMove}
        setTankMove={setTankMove}
        />
        {
            ListBullet.map((el,idx)=>{
                return(
                    <Bullet
                    BulletMove = {ListBulletMove[idx]}
                    BulletPos = {ListBulletPosition[idx]}
                    />
                )
            })
        }
    </div>
  );
}

export default App;
