import React, {useEffect, useState} from 'react';
import Navbar from "../component/Navbar";
import Head from "next/head";
import {useRouter} from "next/router";
import {Loader} from "semantic-ui-react";
import styled from "styled-components";
// styles
const Main = styled.main`
    display: flex;
    align-items:center;
    flex-direction: column;
    
   
    `
const Form1 = styled.form`
    background-color: #77493670;
    padding: 1rem;
    border-radius: 20px;
    margin-top:16px;
    width: 400px;
    display: flex;
    flex-direction: column;
    
    .label {
    color: white;
    margin-bottom: 10px;
    text-align: center;
    }
    
    textarea {
    margin-bottom: 16px;
    resize: none;
    height:100px;
    }
    
    input {
    margin-bottom: 16px;
    width: 100%;
    padding:10px;
    }
    
    .error{
    color: red;
    }
    
    `
// end styles
const New = () => {


    const [form, setForm] = useState({title: '', description: '', sortie: '', realisator: '', acteur: ''})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState({})
    const router = useRouter()

    useEffect(() => {
        if (isSubmitted) {
            if (Object.keys(errors).length == 0) {
                createFilm();
                alert('envoie')
            } else {
                setIsSubmitted(false)
            }
        }
    }, [errors])

    const createFilm = async () => {
        try {
            const add = await fetch("http://localhost:3000/api/films",{
                method : "POST",
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(form)
            })
            router.push("/")
            
        } catch (error) {
            console.log(error)

        }
    }

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value

        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        let errs = validate()
        setErrors(errs)
        setIsSubmitted(true)
    }
    const validate = () => {
        let erreurs = {};
        if (!form.title) {
            erreurs.title = "titre du film requis"
        }
        if (!form.realisator) {
            erreurs.realisator = "réalisateur du film requis"
        }
        if (!form.acteur) {
            erreurs.acteur = "acteur/trice (s) du film requis"
        }
        if (form.sortie == "") {
            erreurs.sortie = "date de sortie du film requis"
        }
        if (!form.description) {
            erreurs.description = "description du film requis"
        }
        return erreurs;
    }


    return (
        <>
            <Head>
                <title>Ajouter un film</title>
            </Head>
            <Navbar/>

            <Main>
                {
                    isSubmitted
                        ? <Loader active inline="centered"/>
                        : <Form1 method="POST" onSubmit={handleSubmit}>

                            <input type="text" value={form.title}
                                   placeholder="titre du film"
                                   name="title"
                                   onChange={handleChange}
                            />
                            <span className="error" id="erreur_title">{errors.title ?
                                errors.title
                                : ""}</span>
                            <textarea
                                placeholder='description'
                                name="description"
                                onChange={handleChange}
                            />
                            <span className="error" id="erreur_description">{errors.description ?
                                errors.description
                                : ""}</span>

                            <label htmlFor="sortie">date de sortie</label>
                            <input type="date"
                                   name="sortie"
                                   onChange={handleChange}

                            />
                            <span className="error" id="erreur_date">{errors.sortie ?
                                errors.sortie
                                : ""}</span>

                            <input type="text"
                                   error={errors.realisator}
                                   placeholder='réalisateur'
                                   name="realisator"
                                   onChange={handleChange}
                            />
                            <span className="error" id="erreur_realisator">{errors.realisator ?
                                errors.realisator
                                : ""}</span>
                            <input type="text"
                                   placeholder='acteur'
                                   name="acteur"
                                   onChange={handleChange}
                            />
                            <span className="error" id="erreur_acteur">{errors.acteur ?
                                errors.acteur
                                : ""}</span>
                            <input type="submit"
                                   value="ajouter le film"
                            />

                        </Form1>
                }
            </Main>

        </>
    );
};

export default New;