import React from 'react';
import FontAwesome from 'react-fontawesome';

import styles from './cardInfo.css'

const CardInfo = (props) =>{

    const teamName = (teams,team) =>{
       
        let data = teams.find((item)=>{
            console.log(item );
            return item.teamId === team
        });
        if(data){
            return data.name
        }
    }


    return(
        <div className={styles.cardNfo}>
            <span className={styles.teamName}>
                {teamName(props.teams,props.team)}
            </span>
            <span className={styles.date}>
                <FontAwesome name="clock-o"/>
                {props.date}
            </span>
        </div>
    )
}

export default CardInfo;