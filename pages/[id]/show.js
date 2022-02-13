import React from 'react';
import Head from "next/head";
import Navbar from "../../component/Navbar";

const Show = ({film}) => {
    console.log(film)
    return (
        <>
            <Head>
                <title>Affichage du film</title>
            </Head>
            <Navbar/>
            <h1>Page show</h1>
        </>
    );
};
Show.getInitialProps = async ({query: {id}}) => {
    const res = await fetch(`http://localhost:3000/api/films/${id}`);
    const {data} = await res.json();

    return {film: data}
}


export default Show;