import React , { useEffect, useState , useCallback} from 'react';
function App({IsMonsterDead,MonsterState}) {
  return (
    <div className={'monster monster-' + MonsterState.type} style={IsMonsterDead ? {opacity:  0} : { opacity : 1 } }>
      
    </div>
    );
}

export default App;
