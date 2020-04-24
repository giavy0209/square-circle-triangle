import React from 'react';
function App({MonsterState}) {
  
  return (
    <div className="monster-hp-bar">
        <div className="monster-hp" style={{width : (MonsterState.currentHP > 0 ?   MonsterState.currentHP / MonsterState.HP * 100 : 0) + '%'}}>
          <span> {MonsterState.currentHP >= 0 ? MonsterState.currentHP : 0} / {MonsterState.HP} </span>
        </div>
    </div>
    );
}

export default App;
