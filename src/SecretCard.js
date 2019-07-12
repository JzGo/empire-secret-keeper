import React from 'react';
import { Button, Card } from 'react-bootstrap';

export default function SecretCard(props) {

    const styles = {
        width: "14rem",
        textAlign: "center"
    }

    let ownerRevealed = props.secret.ownerFound ? { textDecoration: "line-through" } : { textDecoration: "none"}
 
    return (
        <Card style={styles}>
            <Card.Body>
                <Card.Title style={ownerRevealed}>{props.secret.secret}</Card.Title>
                { !props.ownerFound && <Button variant="success" onClick={() => props.revealOwner(props.secret, props.updateList)}>Owner Found</Button> }
            </Card.Body>
        </Card>
    )
}