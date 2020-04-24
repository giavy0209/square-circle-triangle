import React , { useEffect, useState , useCallback} from 'react';
function App({Level,SubLevel}) {
  
  return (
    <div className="level-zone">
        <p>Level = {Level} </p>
        <p>SubLevel = {SubLevel} </p>
    </div>
  );
}

export default App;
