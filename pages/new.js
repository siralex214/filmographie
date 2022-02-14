import React, {useEffect, useState} from 'react';
import Navbar from "../component/Navbar";
import Head from "next/head";
import {useRouter} from "next/router";
import {Loader} from "semantic-ui-react";
import styled from "styled-components";
import Show from "./[id]/show";
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


    const createFilm = async () => {
        try {
            const add = await fetch("http://localhost:3000/api/films", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            })
            router.push("/")

        } catch (error) {
            console.log(error)

        }
    }


    useEffect(() => {
        if (isSubmitted) {
            if (Object.keys(errors).length == 0) {
                createFilm();
                alert('envoie')
            } else {
                setIsSubmitted(false)
            }
        }
    }, [errors, isSubmitted])


    const handleChange = (event) => {

        if (event.target.type == "file") {


            console.log("file")
        }

        console.log(event.target.value)
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
        } else if (form.title.length < 3) {
            erreurs.title = "caractère minimum: 3";
        } else if (form.title.length > 100) {
            erreurs.title = "caractère maximal: 100";
        }
        if (!form.realisator) {
            erreurs.realisator = "réalisateur du film requis"
        } else if (form.realisator.length < 3) {
            erreurs.realisator = "caractère minimum: 3";
        } else if (form.realisator.length > 100) {
            erreurs.realisator = "caractère maximal: 100";
        }
        if (!form.acteur) {
            erreurs.acteur = "acteur/trice (s) du film requis"
        } else if (form.acteur.length < 3) {
            erreurs.acteur = "caractère minimum: 3";
        } else if (form.acteur.length > 100) {
            erreurs.acteur = "caractère maximal: 100";
        }
        if (form.sortie == "") {
            erreurs.sortie = "date de sortie du film requis"
        }
        if (!form.description) {
            erreurs.description = "description du film requis"
        } else if (form.description.length < 3) {
            erreurs.description = "caractère minimum: 3";
        } else if (form.description.length > 500) {
            erreurs.description = "caractère maximum: 500";
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
                {isSubmitted
                    ? <Loader active inline="centered"/>
                    : <Form1 method="POST" onSubmit={handleSubmit} enctype="multipart/form-data">

                        <input type="text"
                               value={form.title}
                               placeholder="titre du film"
                               name="title"
                               onChange={handleChange}
                        />
                        <span className="error" id="erreur_title">{errors.title ?
                            errors.title
                            : ""}</span>
                        <textarea
                            value={form.description}
                            placeholder='description'
                            name="description"
                            onChange={handleChange}
                        />
                        <span className="error" id="erreur_description">{errors.description ?
                            errors.description
                            : ""}</span>

                        <label htmlFor="sortie">date de sortie</label>
                        <input type="date"
                               value={form.sortie}
                               name="sortie"
                               onChange={handleChange}

                        />
                        <span className="error" id="erreur_date">{errors.sortie ?
                            errors.sortie
                            : ""}</span>

                        <input type="text"
                               error={errors.realisator}
                               value={form.realisator}
                               placeholder='réalisateur'
                               name="realisator"
                               onChange={handleChange}
                        />
                        <span className="error" id="erreur_realisator">{errors.realisator ?
                            errors.realisator
                            : ""}</span>
                        <input type="text"
                               value={form.acteur}
                               placeholder='acteur'
                               name="acteur"
                               onChange={handleChange}
                        />
                        <input type="file"
                               name="image"
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

New.getInitialProps = async () => {

}


export default New;

