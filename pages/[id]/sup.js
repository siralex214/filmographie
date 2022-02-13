import React from 'react';
import Head from "next/head";
import Navbar from "../../component/Navbar";
import styled from "styled-components";
import {Button} from "semantic-ui-react";
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';

const Main = styled.main`
    height: 400px;
    display:flex;
    justify-content: center;
    align-items: center;
    
    .suppression {
    background-color: #bbbbbb;
    width: 500px;
    height: 200px;
     
        p{
        margin-top: 16px;
        text-align: center;
        color: black;
        font-size: 20px;
        }
        .buttons {
            margin-top:16px;
            display: flex;
            justify-content: space-evenly;
            
            Button {
                font-size: 20px;
                padding: 10px 16px;
                border: none;
                border-radius: 20px;
                transition: all 0.5s;
                
                &:hover {
                    transition: all 0.5s;
                    transform: scale(1.2);
                    cursor: pointer;
                }
            }
        }
    }
`
const Sup = ({film}) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteFilm();
        }
    }, [isDeleting])

    const open = () => setIsDeleting(true);
    const close = () => router.push("/");
    const deleteFilm = async () => {
        const filmId = router.query.id;
        try {
            const deleted = await fetch(`https://filmographie-dxyygktif-siralex214.vercel.app/api/films/${filmId}`, {
                method: "Delete"
            });

            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Head>
                <title>Supprimer le film</title>
            </Head>
            <Navbar/>

            <Main>
                    <div className="suppression">
                        <p>Voulez vous vraiment supprimer ce contenu?</p>
                        <div className="buttons">
                            <Button color='red' onClick={open}>Oui</Button>
                            <Button color='red' onClick={close}>Non</Button>
                        </div>
                    </div>
            </Main>
        </>
    );
};

Sup.getInitialProps = async ({query: {id}}) => {
    const res = await fetch(`https://filmographie-dxyygktif-siralex214.vercel.app/api/films/${id}`);
    const {data} = await res.json();

    return {film: data}
}

export default Sup;