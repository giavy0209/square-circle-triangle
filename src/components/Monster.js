import React , { useEffect, useState , useCallback} from 'react';
function App({IsMonsterDead}) {
  return (
    <div className="monster" style={IsMonsterDead ? {opacity:  0} : { opacity : 1 } }>
      
    </div>
    );
}

export default App;
