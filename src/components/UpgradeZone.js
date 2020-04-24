import React , { useEffect, useState , useCallback} from 'react';
function App({Gold,setGold,TankState,setTankState}) {

  const increaseDmg = useCallback(()=>{
      console.log('click')
    if(Gold >= TankState.dmgPrice){
        var dmgIncrese = Math.ceil(TankState.dmg * TankState.dmgLV / 100);
        var priceIncrease = Math.ceil(TankState.dmgPrice * (TankState.dmgLV - 1) / 100)
        setGold(Gold - TankState.dmgPrice)
        setTankState({
            ...TankState,
            dmg : TankState.dmg + dmgIncrese,
            dmgLV : TankState.dmgLV + 1,
            dmgPrice : TankState.dmgPrice + priceIncrease
        })
    }
  },[TankState,Gold])
  return (
    <div className="upgrade-zone">
        <p> gold =  {Gold} </p>
        <button
        onClick={increaseDmg}
        >
            Tăng damage + {Math.ceil(TankState.dmg * TankState.dmgLV / 100)} - Price : {TankState.dmgPrice} - LV = {TankState.dmgLV}
        </button>
    </div>
  );
}

export default App;
