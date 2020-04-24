import React , { useEffect, useState , useCallback,useRef} from 'react';
import Tank from './Tank'
import Bullet from './Bullet'
import useInterval from './useInterval'
var timeOut;

function App({hitMonster,TankState,setTankState,IsMonsterDead}) {
    const [TankMove, setTankMove] = useState({position: 0, dirrectLeft: false})
    
    const [ListBullet,setListBullet] = useState([])
    const [ListBulletMove,setListBulletMove] = useState([])
    const [ListBulletPosition,setListBulletPosition] = useState([])

    useEffect(()=>{
        document.querySelector('.tank-zone').addEventListener('click',()=>{
            clearTimeout(timeOut)
            setTankState({
                ...TankState,
                firerate : TankState.firerate / 10
            })
            timeOut = setTimeout(() => {
                setTankState({
                    ...TankState,
                    firerate : TankState.firerate
                })
            }, 500);
        })
    },[])

    useInterval(()=>{
        var tankzoneHeight = document.querySelector('.tank-zone').offsetHeight;
        ListBullet.push(false)
        ListBulletMove.push(tankzoneHeight / 2)
        ListBulletPosition.push(TankMove.position)
        setListBulletMove([...ListBulletMove])
        setListBulletPosition([...ListBulletPosition])
        setListBullet([...ListBullet])
    },TankState.firerate)

    useInterval(()=>{
        ListBulletMove.forEach((el,idx)=>{
            ListBulletMove[idx] = el - 4;
        })
        ListBulletMove.forEach((el,idx)=>{
            if(el < -50){
                ListBulletMove.splice(idx, 1)
                ListBullet.splice(idx,1)
                ListBulletPosition.splice(idx,1)
                if(!IsMonsterDead) hitMonster()
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
