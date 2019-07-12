import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import SecretCard from './SecretCard';

const shuffleSecrets = (allSecrets) => {

	var currentIndex = allSecrets.length;
	var temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = allSecrets[currentIndex];
		allSecrets[currentIndex] = allSecrets[randomIndex];
		allSecrets[randomIndex] = temporaryValue;
	}

	return allSecrets;
}

const useSetSecrets = (targetSecret, updateSecrets) => {
    targetSecret.ownerFound = true
    updateSecrets((secrets) => {
        const targetSecretIndex = secrets.indexOf(targetSecret)
        secrets[targetSecretIndex] = targetSecret
        return secrets
    })

}

export default function CardTable() {
    const [secrets, setSecrets] = useState([]);

    
    const [gameOn, setGameOn] = useState(false)
    const [newSecret, setNewSecret] = useState({secret: ""})

    const secretsShuffled = shuffleSecrets(secrets) 

    const styles = {
        display: "flex",
        margin: "2rem"
    }

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                { !gameOn &&
                    <form onSubmit={(e) => {
                            e.preventDefault()
                            setSecrets(secrets.concat(newSecret))
                            setNewSecret({secret: ""})
                    }}>
                        <label for="new_secret">Add a new secret: </label>
                        <input id="new_secret" type="text" name="new_secret" value={newSecret.secret} onChange={(e) => setNewSecret({secret: e.target.value, ownerFound: false})}></input>
                        <input type="submit" value="Submit secret"></input>
                    </form>
                }
                { !gameOn ? ( <Button variant="success" size="sm" onClick={() => {setGameOn(true)}}>Start Game</Button> ) : ( <Button variant="warning" size="sm" onClick={() => {setGameOn(false)}}>Pause Game</Button> )
                }
            </div>
            <div style={styles}>
                { 
                    secretsShuffled.map(secret => { 
                        return <SecretCard secret={secret}s updateList={setSecrets} revealOwner={useSetSecrets} /> 
                    })
                }

            </div>

        </div>
    )

}