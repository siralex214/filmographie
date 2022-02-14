import Head from 'next/head'
import Link from "next/link";
import styles from '../styles/Home.module.css'
import styled from "styled-components";
import Navbar from "../component/Navbar";
import affiche1 from "../public/assets/img/affiche_iron-man.png"
import {useState} from "react";


const Img = styled.img`
    width: 140px
`
const DivButton = styled.div`
margin-top: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 157px;
    
    button {
    padding: 5px
    }
`
const Main = styled.main`
    margin: 0 auto;
    max-width: 100%;
    width: 1000px; 
    color: white;
    margin-top: 130px;
    display: flex;
    flex-wrap: wrap    
`
const OneCard = styled.div`
    cursor: pointer;
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 25px;
    display:flex;
    flex-direction: column;
    align-items: center;
    color: #B33030;
    background-color: white;
    width: 200px;
    margin-right: 15px;
    transition: all 0.5s;
    
    &:hover {
    transition: all 0.5s;
    transform: scale(1.1);
    }
    
    
    
    h2 {
    color: red;
    text-align: center;
    }
    
    p {
     text-align: center;
     }
`


function transformDate(date) {
    date = date.replace("-", "/")
    date = date.replace("-", "/")
    let newDate = new Date(date)
    const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
    newDate = newDate.toLocaleDateString("fr", options)
    return newDate
}

export default function Home({films}) {


    return (
        <>
            <Head>
                <title>Filmographie</title>
            </Head>
            <Navbar/>
            <Main>
                {films.data.length == 0 ? <h2>Pas de film trouver</h2>
                    :


                    films.data.map(film =>
                        <Link key={film.id} href={`/${film._id}/show`} passHref>
                            <OneCard key={film.id}>
                                <Img src={affiche1.src} alt="affiche_film"/>
                                <h2>{film.title.substr(0, 15)}</h2>
                                <h3>{film.acteur.substr(0, 15)}</h3>
                                <h4>{film.realisator.substr(0, 22)}</h4>
                                <span>{transformDate((film.sortie))}</span>
                                <DivButton>
                                    <Link href={`/${film._id}/edit`} passHref>
                                        <button>Modifier</button>
                                    </Link>
                                    <Link href={`/${film._id}/sup`} passHref>
                                        <button>Supprimer</button>
                                    </Link>
                                </DivButton>
                            </OneCard>
                        </Link>
                    )}

            </Main>
        </>
    )
}

export async function getServerSideProps() {
    const films = await fetch("http://localhost:3000/api/films")
        .then(response => response.json())
    return {
        props: {
            films
        }
    }
}
