import React , { useEffect, useState , useCallback,useMemo} from 'react';
import useEventListener from './useEventListener'
import Tank from './Tank'
import Bullet from './Bullet'
import useInterval from './useInterval'

function App({hitMonster,StatFireRate,setStatFireRate,IsMonsterDead}) {
    const [TankMove, setTankMove] = useState({position: 0, dirrectLeft: false})
    
    const [ListBullet,setListBullet] = useState([])
    const [IsClickAble,setIsClickAble] = useState(true)
    const [ListBulletMove,setListBulletMove] = useState([])
    const [ListBulletPosition,setListBulletPosition] = useState([])


    useEventListener('click', ()=>{
        var tankzoneHeight = document.querySelector('.tank-zone').offsetHeight;
        if(IsClickAble){
            setIsClickAble(false)
            ListBullet.push(false)
            ListBulletMove.push(tankzoneHeight / 2)
            ListBulletPosition.push(TankMove.position)
            setListBulletMove([...ListBulletMove])
            setListBulletPosition([...ListBulletPosition])
            setListBullet([...ListBullet])
        }

    },document.querySelector('.tank-zone'))
    
    useInterval(()=>{
        console.log(ListBullet.length,ListBulletMove.length,ListBulletPosition.length)
        if(ListBullet.length !== ListBulletMove.length || ListBullet.length !==ListBulletPosition.length || ListBulletMove.length !== ListBulletPosition.length){
            var arr = [];
            setListBullet([...arr])
            setListBulletMove([...arr])
            setListBulletPosition([...arr])
        }
    },1000)

    useEffect(()=> {
        if(!IsClickAble){
            setTimeout(() => {
                setIsClickAble(true)
            }, 33.3333);
        }
    },[IsClickAble])

    useInterval(()=>{
        var tankzoneHeight = document.querySelector('.tank-zone').offsetHeight;
        ListBullet.push(false)
        ListBulletMove.push(tankzoneHeight / 2)
        ListBulletPosition.push(TankMove.position)
        setListBulletMove([...ListBulletMove])
        setListBulletPosition([...ListBulletPosition])
        setListBullet([...ListBullet])
    },StatFireRate.stat)

    useInterval(()=>{
        ListBulletMove.forEach((el,idx)=>{
            ListBulletMove[idx] = el - 8;
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
    },10)


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
