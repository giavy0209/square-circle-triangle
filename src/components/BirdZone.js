import React , { useEffect, useState , useCallback, useMemo} from 'react';
import listBird from './listBird'
function App() {
  const [ListBirdToLeft, setListBirdToLeft] = useState([])
  const [ListBirdToLeftMove, setListBirdToLeftMove] = useState([])
  const [ListBirdToRight, setListBirdToRight] = useState([])

  useEffect(()=>{
    var randomBird = Math.round(Math.random() * (listBird.length -1))
    setTimeout(() => {
      ListBirdToLeft.push(listBird[randomBird])
      setListBirdToLeft([...ListBirdToLeft])
    }, 2000);
  }, [ListBirdToLeft])

  useEffect(()=>{
    
  },[ListBirdToLeftMove])
  
  return (
    <div className="bird-zone">
      {
        ListBirdToLeft.map((el,idx)=>{
          return (
            <img className="bird" alt="" src={el} key={idx}/>
          )
        })
      }
    </div>
  );
}

export default App;
