import React , { useEffect, useState , useCallback, useMemo} from 'react';
import useInterval from './useInterval'
import listBird from './listBird'
import cloud1 from '../assets/images/cloud.gif'
import cloud2 from '../assets/images/cloud-1.gif'
function App({ScreenWidth}) {
  const [ListBirdToLeft, setListBirdToLeft] = useState([])
  const [RanDomListBirdTime, setRanDomListBirdTime] = useState(0)
  const [PositionListBirdToLeft, setPositionListBirdToLeft] = useState([])
  const [ListBirdToRight, setListBirdToRight] = useState([])
  
  const [RanDomCloud, setRanDomCloud] = useState([{top: 0, left: 0} , {top: 0 , left : 0}])

  useInterval(()=>{
    var arr = []
    for (let index = 0; index < RanDomCloud.length; index++) {
      arr.push({
        left: Math.random() * (ScreenWidth - 100),
        top: Math.random() * 100
      })
    }
    setRanDomCloud([...arr])
  },3000)

  useInterval(()=>{
    setRanDomListBirdTime(Math.random() * 6 + 2)
    if(ScreenWidth){
      if(ListBirdToLeft.length < 5){
        ListBirdToLeft.push({
          top:Math.random() * 100,
          type: listBird[Math.round(Math.random() * (listBird.length - 1))]
        })
        ListBirdToRight.push({
          top:Math.random() * 100,
          type: listBird[Math.round(Math.random() * (listBird.length - 1))]
        })
        PositionListBirdToLeft.push(ScreenWidth)
        setListBirdToLeft([...ListBirdToLeft])
        setListBirdToRight([...ListBirdToRight])
        setPositionListBirdToLeft([...PositionListBirdToLeft])
      }
    }
  },RanDomListBirdTime * 1000)

  useInterval(()=>{
    PositionListBirdToLeft.forEach((el,idx)=>{
      PositionListBirdToLeft[idx] = el - 5
    })
    PositionListBirdToLeft.forEach((el, idx)=>{
      if(el < -200){
        PositionListBirdToLeft.splice(idx , 1)
        ListBirdToLeft.splice( idx , 1)
        ListBirdToRight.splice( idx , 1)
      }
    })

    setListBirdToLeft([...ListBirdToLeft])
    setListBirdToRight([...ListBirdToRight])
    setPositionListBirdToLeft([...PositionListBirdToLeft])
  },50)

  return (
    <div className="bird-zone">
      <div>
        <img className="cloud" style={{left: RanDomCloud[0].left, top: RanDomCloud[0].top}} src={cloud1} alt=""/>
        <img className="cloud" style={{left: RanDomCloud[1].left, top: RanDomCloud[1].top}} src={cloud2} alt=""/>
      </div>
      {
        ListBirdToLeft.map((el,idx)=>{
          return (
            <>
            <img className="bird" alt="" src={el.type} key={idx} style={{transform: 'translate(0,'+el.top+'px)' , left: PositionListBirdToLeft[idx]}}/>
            <img className="bird to-right" alt="" src={ListBirdToRight[idx].type} key={idx + 20} style={{transform: 'translate(0,'+el.top+'px) , rotateY(180deg)' , right: (PositionListBirdToLeft[idx])}}/>
            </>
          )
        })
      }
    </div>
  );
}

export default App;
