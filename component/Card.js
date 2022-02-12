import React from 'react';
import styled from "styled-components";
const FausseImage = styled.img`
    width: 120px;
    height: 150px;
    background-color: black;
    border-radius: 25px;
    `
const Text_back = styled.div `
    color: black;
    justify-items: flex-end;
`


const Card = () => {
    return (
        <>
            {/*l'image sera ici*/}
            <FausseImage src=""/>
            <Text_back>
                <h2>titre du film</h2>
                <p>Réalisateur</p>
                <p>Acteur</p>
                <p>date de sortie</p>
            </Text_back>
        </>
    );
};

export default Card;