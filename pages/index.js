import Head from 'next/head'
import styles from '../styles/Home.module.css'
import styled from "styled-components";
import Card from "../component/Card";
import Navbar from "../component/Navbar";

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
    padding: 16px;
    border-radius: 25px;
    display:flex;
    flex-direction: column;
    align-items: center;
    color: #B33030;
    // width: 180px;
    height:300px;
    background-color: white;
    
    h2 {
    color: red
    }
    
    p {
     text-align: center
     }
`
export default function Home() {
    return (
        <>
            <Head>
                <title>Filmographie</title>
            </Head>
            <Navbar/>
            <main>
            </main>
        </>
    )
}
