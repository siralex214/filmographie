import React, {useEffect, useState} from 'react';
import Navbar from "../component/Navbar";
import Head from "next/head";
import {useRouter} from "next/router";
import {Form, Input, Loader, TextArea} from "semantic-ui-react";
import styled from "styled-components";

const New = () => {


    const [form, setForm] = useState({title: '', description: '', image: '', sortie: '', acteur: '', realisator: ''})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState({})
    const router = useRouter()
    const Main = styled.main`
    display: flex;
    align-items:center;
    flex-direction: column;
    
   
    `
    const Form = styled.form`
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
    
    `

    useEffect(() => {
        if (isSubmitted) {
            if (Object.keys(errors).length == 0) {
                // createFilm();
                alert('envoie')
            } else {
                setIsSubmitted(false)
            }
        }
    }, [errors])


    const handleChange = (event) => {
        setForm({
            ...form,
            // [event.target.name]: event.target.value
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
        if (!form.sortie) {
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
                        : <Form method="POST" onSubmit={handleSubmit}>

                            <Input type="text"
                                   fluid
                                   error={errors.title ? {
                                       content: "Description obligatoire", pointing: "below"
                                   } : null}
                                   placeholder='titre du film'
                                   name="title"
                                   onChange={handleChange}
                            />
                            <TextArea
                                fluid
                                error={errors.description}
                                placeholder='description'
                                name="description"
                                onChange={handleChange}
                            />
                            <Input type="date"
                                   fluid
                                   error={errors.date}
                                   label='date de sortie'
                                   name="sortie"
                                   onChange={handleChange}

                            />
                            <Input type="text"
                                   fluid
                                   error={errors.realisator}
                                   placeholder='réalisateur'
                                   name="realisator"
                                   onChange={handleChange}

                            />
                            <Input type="text"

                                   error={errors.acteur}
                                   placeholder='acteur'
                                   name="acteur"
                                   onChange={handleChange}
                            />
                            <Input type="submit"
                                   fluid
                                   value="ajouter le film"
                            />

                        </Form>
                }
            </Main>

        </>
    );
};

export default New;