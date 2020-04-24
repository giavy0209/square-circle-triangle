import React , { useEffect, useState , useCallback} from 'react';
import LevelZone from './components/LevelZone'
import MonsterZone from './components/MonsterZone'
import TankZone from './components/TankZone'
import UpgradeZone from './components/UpgradeZone'

import baseMonster from './components/baseMonster'
import tank from './components/TankState/index.js'

import chance from './components/chanceHelper'

const {
  crit,
  critdmg,
  dmg,
  firerate,
  gold
} = tank



function App() {
  const [ScreenWidth, setScreenWidth] = useState(0)
  const [IsDay, setIsDay] = useState(true)

  useEffect(()=>{
    setScreenWidth(document.querySelector('.game').offsetWidth)
  },[])

  const [Level, setLevel] = useState(1)
  const [SubLevel, setSubLevel] = useState(0)
  const [MonsterState, setMonsterState] = useState({
    HP: Math.ceil(baseMonster.HP * Level),
    currentHP: Math.ceil(baseMonster.HP * Level),
    gold: Math.floor(baseMonster.gold * Level),
    type: Math.round(Math.random() * 19 + 1),
  })

  const [Gold, setGold] = useState(0)

  const [StatDmg, setStatDmg] = useState(dmg)
  const [StatFireRate, setStatFireRate] = useState(firerate)
  const [StatCrit, setStatCrit] = useState(crit)
  const [StatCritDmg, setStatCritDmg] = useState(critdmg)
  const [StatGold, setStatGold] = useState(gold)

  const [IsMonsterDead, setIsMonsterDead] = useState(false)

  const [MonsterMutiple, setMonsterMutiple] = useState(1)

  const increaseLevel = useCallback(()=>{
    if(SubLevel < 10){
      setSubLevel( SubLevel + 1 )
    }else{
      setSubLevel(0)
      setLevel( Level + 1 )
      setMonsterMutiple(MonsterMutiple + MonsterMutiple * 0.5)
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
    increaseLevel()

    if(SubLevel === 10){
      setMonsterState({
        HP: Math.ceil((baseMonster.HP * (Level + 1)) * monsterMultiple * (MonsterMutiple + MonsterMutiple * 0.5)),
        currentHP: Math.ceil((baseMonster.HP * (Level + 1)) * monsterMultiple * (MonsterMutiple + MonsterMutiple * 0.5)),
        gold: Math.floor(baseMonster.gold * (Level + 1) * monsterMultiple ),
        type: Math.round(Math.random() * 19 + 1),
      })
    }else{
      setMonsterState({
        HP: Math.ceil((baseMonster.HP * Level) * monsterMultiple * MonsterMutiple),
        currentHP: Math.ceil((baseMonster.HP * Level) * monsterMultiple * MonsterMutiple),
        gold: Math.floor(baseMonster.gold * Level * monsterMultiple),
        type: Math.round(Math.random() * 19 + 1),
      })
    }
    setIsMonsterDead(false)
  },[Level,baseMonster,MonsterState,SubLevel,])

  const hitMonster = useCallback(()=>{
    var isCrit = chance(StatCrit.stat)

    var currentHP = isCrit ? Math.ceil(MonsterState.currentHP - (StatDmg.stat + StatDmg.stat * StatCritDmg.stat / 100)) : Math.floor(MonsterState.currentHP - StatDmg.stat);
      setMonsterState({
        ...MonsterState,
        currentHP: currentHP,
      })
      if(currentHP <= 0){
        setGold( Gold + MonsterState.gold + (MonsterState.gold * StatGold.stat / 100)) 
        setTimeout(() => {
          createNewMonster()
        }, 500);
        setIsMonsterDead(true)
      }
  },[MonsterState,StatDmg,StatGold,Gold,StatCrit,StatCritDmg])

  return (
    <>
      <div className={ IsDay ? 'game day' : 'game night'} >
        <LevelZone
        Level = {Level}
        SubLevel = {SubLevel}
        />
        <MonsterZone
        ScreenWidth={ScreenWidth}
        setIsDay={setIsDay}
        IsDay={IsDay}
        MonsterState = {MonsterState}
        IsMonsterDead = {IsMonsterDead}
        MonsterState={MonsterState}
        />
        <TankZone
        hitMonster={hitMonster}
        StatFireRate = {StatFireRate}
        setStatFireRate={setStatFireRate}
        IsMonsterDead = {IsMonsterDead}
        />
        <UpgradeZone
        Gold = {Gold}
        setGold = {setGold}
        StatDmg = {StatDmg}
        setStatDmg={setStatDmg}
        StatFireRate = {StatFireRate}
        setStatFireRate={setStatFireRate}
        StatCrit = {StatCrit}
        setStatCrit={setStatCrit}
        StatCritDmg = {StatCritDmg}
        setStatCritDmg={setStatCritDmg}
        StatGold = {StatGold}
        setStatGold={setStatGold}
        />
      </div>
    </>
  );
}

export default App;
