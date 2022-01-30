import React, { useContext, useEffect, useState } from 'react';
import { StartButton, InviteButton } from '../../widgets/Buttons'
import styles from './style.module.css';
import avatarList from '../../../globals/AvatarList';
import {SocketContext} from '../../../socket';

function PlayerIcon({ i, name }) {
    return (
        <div className={styles.playerIcon}>
            <img className={styles.pfp} src={`resources/pfps/${avatarList[i]}`} />
            <p>{name}</p>
        </div>
    );
}
function TitlePage() {

    const [players, setPlayers] = useState([{pic: 0, username: 'hi',}]);

    var socket = useContext(SocketContext);

    useEffect(() => {
        socket.emit('join','room1');
        socket.on('userUpdate', setPlayers);

        return () => socket.disconnect();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.playerContainer}>
                {
                    players.map((player) => {
                        return (
                            <PlayerIcon i={player.pic} name={player.username} />
                        );
                    })}
            </div>
            <div>
                <div style={{ marginBottom: '24px' }}>
                    <StartButton />
                </div>
                <InviteButton />
            </div>
        </div>
    )
}

export default TitlePage;
