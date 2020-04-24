import React , { useEffect, useState , useCallback} from 'react';
import LevelZone from './components/LevelZone'
import MonsterZone from './components/MonsterZone'
import TankZone from './components/TankZone'
import UpgradeZone from './components/UpgradeZone'

import baseMonster from './components/baseMonster'
import baseTank from './components/baseTank'


function App() {
  const [Level, setLevel] = useState(1)
  const [SubLevel, setSubLevel] = useState(0)
  const [BaseMonster,setBaseMonster] = useState(baseMonster)
  const [MonsterState, setMonsterState] = useState({
    type: Math.round(Math.random() * 19 + 1),
    HP: BaseMonster.HP + (BaseMonster.HP * (Level - 1) / 100 ),
    currentHP: BaseMonster.HP + (BaseMonster.HP * (Level - 1) / 100 ),
    gold: BaseMonster.gold + (BaseMonster.gold * (Level - 1) / 100 ),
  })

  const [Gold, setGold] = useState(50)

  const [TankState, setTankState] = useState(baseTank)

  const [IsMonsterDead, setIsMonsterDead] = useState(false)

  const increaseLevel = useCallback(()=>{
    if(SubLevel < 10){
      setSubLevel( SubLevel + 1 )
    }else{
      setSubLevel(0)
      setLevel( Level + 1 )
    }
  },[Level, SubLevel])

  const createNewMonster = useCallback(()=>{
    var monsterMultiple = 1;
    if(SubLevel === 9){
      if(Level % 5 === 0){
        monsterMultiple = 5
      }else{
        monsterMultiple = 2
      }
    }

    setGold( Gold + MonsterState.gold + (MonsterState.gold * TankState.goldRate / 100)) 

    setMonsterState({
      type: Math.round(Math.random() * 19 + 1),
      HP: Math.ceil((BaseMonster.HP + (BaseMonster.HP * (Level - 1) / 100 )) * monsterMultiple),
      currentHP: Math.ceil((BaseMonster.HP + (BaseMonster.HP * (Level - 1) / 100 )) * monsterMultiple),
      gold: Math.floor((BaseMonster.gold + (BaseMonster.gold * (Level - 1) / 100 )) * monsterMultiple),
    })
    setIsMonsterDead(false)
    if(SubLevel === 10){
      setBaseMonster({
        HP: Math.ceil((BaseMonster.HP + (BaseMonster.HP * (Level - 1) / 100 )) * monsterMultiple),
        currentHP: Math.ceil((BaseMonster.HP + (BaseMonster.HP * (Level - 1) / 100 )) * monsterMultiple),
        gold: Math.floor((BaseMonster.gold + (BaseMonster.gold * (Level - 1) / 100 )) * monsterMultiple),
      })
    }
    increaseLevel()
  },[Level,BaseMonster,MonsterState,SubLevel])

  const hitMonster = useCallback(()=>{
    if(MonsterState.currentHP > 0){
      setMonsterState({
        ...MonsterState,
        currentHP: MonsterState.currentHP - TankState.dmg,
      })
    }else{
      setTimeout(() => {
        createNewMonster()
      }, 500);
      setIsMonsterDead(true)
    }
  },[MonsterState,TankState])

  return (
    <>
      <div className="game">
        <LevelZone
        Level = {Level}
        SubLevel = {SubLevel}
        />
        <MonsterZone
        MonsterState = {MonsterState}
        IsMonsterDead = {IsMonsterDead}
        MonsterState={MonsterState}
        />
        <TankZone
        hitMonster={hitMonster}
        TankState = {TankState}
        setTankState={setTankState}
        IsMonsterDead = {IsMonsterDead}
        />
        <UpgradeZone
        Gold = {Gold}
        setGold = {setGold}
        TankState = {TankState}
        setTankState={setTankState}
        />
      </div>
    </>
  );
}

export default App;
