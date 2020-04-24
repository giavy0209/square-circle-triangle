import React, { useEffect, useState, useCallback, useMemo } from 'react';
import TankBody from './TankBody'
import TankGun from './TankGun'

function App({ TankMove, setTankMove }) {
	useEffect(() => {
		const gameWidth = document.querySelector('.game').offsetWidth
		setTimeout(() => {
			if (!TankMove.position) {
				setTankMove({
					position: gameWidth / 2 - 40, dirrectLeft: false
				})
			} else {
				if (TankMove.dirrectLeft) {
					if (TankMove.position === gameWidth / 2 + 40) {
						setTankMove({
							position: TankMove.position - 1,
							dirrectLeft: false,
						})
					} else {
						setTankMove({
							position: TankMove.position + 1,
							dirrectLeft: true,
						})
					}
				} else {
					if (TankMove.position === gameWidth / 2 - 40) {
						setTankMove({
							position: TankMove.position + 1,
							dirrectLeft: true,
						})
					} else {
						setTankMove({
							position: TankMove.position - 1,
							dirrectLeft: false,
						})
					}
				}
			}
		}, 20);
	}, [TankMove])
	return (
		<>
			<div className="tank" style={TankMove.position ? { left: TankMove.position } : {}}>
				<TankBody />
				<TankGun />
			</div>
		</>
	);
}

export default App;
