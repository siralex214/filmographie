import React from 'react';
import Head from "next/head";
import Navbar from "../../component/Navbar";

const Show = () => {
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

export default Show;