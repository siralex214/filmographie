import React from 'react';
import Link from 'next/link'
import styled from "styled-components";

const Nav = styled.nav`
    height: 140px;
    background-color: #774936;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    .sous-div {
        transition: 0.5s all;
        color: white;
        font-size: 32px;
    }
    .sous-div:hover {
        transition: 0.5s all;
        color:red;
    }
    
    .test {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 32px;
    
        a{
            color: white;
            background-color: black;
            padding: 10px;
            border-radius: 20px;
            transition: 0.5s all;
            
            :hover{
                color: black;
                background-color: white;
                transition: 0.5s all;
                transform: scale(1.2)
            }
        }
    }
}
    
`


const Navbar = () => {
    return (
        <header>
            <Nav>
                <div className="sous-div">
                    <a>Filmographie</a>
                </div>
                <div className=" test">
                    <Link href="/">
                        <a className="">Accueil</a>
                    </Link>

                    <Link href="/new">
                        <a>Ajouter un film</a>
                    </Link>
                </div>
            </Nav>
        </header>
    );
};

export default Navbar;