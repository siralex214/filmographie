import React from 'react';
import Head from "next/head";
import Navbar from "../../component/Navbar";
import styled from "styled-components";
import Link from "next/link";
import LinkApi from "../../component/linkApi";

const Main = styled.main`
    border-radius: 20px;
    max-width: 100%;
    width: 798px;
    margin: 0 auto;
    border: 1px solid;
    margin-top: 32px;
    background-color: burlywood;
    padding: 30px;
    }
    
    .buttons {
        margin-top: 16px;
        display: flex;
        justify-content: space-around;
        
        button{
            padding: 1rem;
            border: none;
            border-radius: 20px;
            transition: all 0.5s;
            
            &:hover{
                transition: all 0.5s;
                transform: scale(1.2);
                cursor: pointer;
            }
        }
    }
`

const Card = styled.section`
    display: flex;
    
    img {
    border: 1px solid;
    width: 339px;
    height: 390px;
    }
        
    .information{
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        
        h2 {
        font-size: 40px;
        }
        h3 {
        font-size: 30px;
        }
        h4 {
        font-size: 25px;
        }
        h5 {
        font-size: 20px;
        }
        h6 {
        font-size: 16px;
        }
    }
}
`
const Show = ({film}) => {
    function transformDate(date) {
        date = date.replace("-", "/")
        date = date.replace("-", "/")
        console.log(date)
        let newDate = new Date(date)
        const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
        newDate = newDate.toLocaleDateString("fr", options)
        return newDate
    }

    console.log(film)
    return (
        <>
            <Head>
                <title>Affichage du film</title>
            </Head>
            <Navbar/>
            <Main>
                <Card>
                    <img src="" alt="image"/>
                    <div className="information">
                        <h2>{film.title}</h2>
                        <h3>{film.realisator}</h3>
                        <h4>{film.acteur}</h4>
                        <h5>{film.description}</h5>
                        <h6>{transformDate(film.sortie)}</h6>
                    </div>
                </Card>
                <div className="buttons">
                    <Link href={`/${film._id}/sup`}>
                        <button>Supprimer</button>
                    </Link>
                    <Link href={`/${film._id}/edit`}>
                        <button>Modifier</button>
                    </Link>
                </div>
            </Main>
        </>
    );
};
Show.getInitialProps = async ({query: {id}}) => {
    const res = await fetch(`${LinkApi}${id}`);
    const {data} = await res.json();

    return {film: data}
}


export default Show;