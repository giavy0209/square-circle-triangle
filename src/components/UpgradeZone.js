import React , { useEffect, useState , useCallback} from 'react';
var basePrice = 10;

function App({
  Gold,
  setGold,
  StatDmg,
  setStatDmg,
  StatFireRate,
  setStatFireRate,
  StatCrit,
  setStatCrit,
  StatCritDmg,
  setStatCritDmg,
  StatGold,
  setStatGold
}) {

  const upgrade = useCallback(({target})=>{
    var price = Number(target.getAttribute('price'))
    if(Gold >= price){
      setGold(Gold - price)
      var type = target.getAttribute('upgrade')
      if(type === 'dmg'){
        setStatDmg({
          stat:StatDmg.lv + 1,
          lv: StatDmg.lv + 1,
        })
      }
  
      if(type === 'fire'){
        setStatFireRate({
          stat:StatFireRate - StatFireRate.lv,
          lv: StatFireRate.lv + 1
        })
      }
      
      if(type === 'crit'){
        setStatCrit({
          stat:StatCrit.lv * 0.1,
          lv: StatCrit.lv + 1,
        })
      }
  
      if(type === 'critdmg'){
        setStatCritDmg({
          stat: StatCritDmg.lv,
          lv: StatCritDmg.lv + 1,
        })
      }
  
      if(type === 'gold'){
        setStatGold({
          stat: StatGold.lv,
          lv: StatGold.lv + 1,
        })
      }
    }
  },[Gold,
    setGold,
    StatDmg,
    setStatDmg,
    StatFireRate,
    setStatFireRate,
    StatCrit,
    setStatCrit,
    StatCritDmg,
    setStatCritDmg,
    StatGold,
    setStatGold])

  return (
    <div className="upgrade-zone">
      <p>gold = {Gold} </p>
      <button price={basePrice * StatDmg.lv} upgrade="dmg" onClick={ upgrade }>Upgrade dmg, level = {StatDmg.lv} , dmg = {StatDmg.stat} , price = {basePrice * StatDmg.lv} </button>
      <button price={basePrice * StatFireRate.lv} upgrade="fire" onClick={ upgrade }>Upgrade fire, level = {StatFireRate.lv} , fire = {1000 / StatFireRate.stat}/s , price = {basePrice * StatFireRate.lv} </button>
      <button price={basePrice * StatCrit.lv} upgrade="crit" onClick={ upgrade }>Upgrade crit, level = {StatCrit.lv} , crit = {StatCrit.stat}% , price = {basePrice * StatCrit.lv} </button>
      <button price={basePrice * StatCritDmg.lv} upgrade="critdmg" onClick={ upgrade }>Upgrade critdmg, level = {StatCritDmg.lv} , critdmg = {StatCritDmg.stat}% , price = {basePrice * StatCritDmg.lv} </button>
      <button price={basePrice * StatGold.lv} upgrade="gold" onClick={ upgrade }>Upgrade gold, level = {StatGold.lv} , gold = {StatGold.stat} %, price = {basePrice * StatGold.lv} </button>
    </div>
  );
}

export default App;
