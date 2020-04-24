import React , { useEffect, useState , useCallback} from 'react';
function App({BulletMove,BulletPos}) {
    

  return (
    <div className="bullet" style={{top : BulletMove, left:BulletPos}}>

    </div>
  );
}

export default App;
