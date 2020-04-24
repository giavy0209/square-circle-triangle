import React , { useEffect, useState , useCallback} from 'react';
import BirdZone from './BirdZone'
import Monster from './Monster'
import MonsterHP from './MonsterHP'
function App({MonsterState,IsMonsterDead}) {
  return (
    <div className="monster-zone">
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
