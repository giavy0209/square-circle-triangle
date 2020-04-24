import React , { useEffect, useState , useCallback} from 'react';
import BirdZone from './BirdZone'
import Sun from './Sun'
import Monster from './Monster'
import MonsterHP from './MonsterHP'
function App({MonsterState,IsMonsterDead,ScreenWidth,IsDay,setIsDay}) {
  return (
    <div className="monster-zone">
      <Sun ScreenWidth ={ScreenWidth} IsDay={IsDay} setIsDay={setIsDay}/>
      <BirdZone
      ScreenWidth = {ScreenWidth}
      />
      <Monster
      IsMonsterDead = {IsMonsterDead}
      MonsterState={MonsterState}
      />
      <MonsterHP
      MonsterState = {MonsterState}
      />
    </div>
    );
}

export default App;
