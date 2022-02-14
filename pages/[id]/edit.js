import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Navbar from "../../component/Navbar";
import Show from "./show";
import {useRouter} from "next/router";
import {Loader} from "semantic-ui-react";
import styled from "styled-components";

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



const Edit = ({film}) => {

    const [form, setForm] = useState({
        title: film.title,
        description: film.description,
        sortie: film.sortie,
        acteur: film.acteur,
        realisator: film.realisator
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitted) {
            if (Object.keys(errors).length === 0) {
                updateFilm();
            } else {
                setIsSubmitted(false);
            }
        }
    }, [errors])

    const updateFilm = async () => {
        try {
            const res = await fetch(`https://filmographie.vercel.app/api/films/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
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
                <title>Page édition</title>
            </Head>
            <Navbar/>
            <Main>
                <h1>page edit</h1>
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
                                   value={form.realisator}
                                   error={errors.realisator}
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
                            <span className="error" id="erreur_acteur">{errors.acteur ?
                                errors.acteur
                                : ""}</span>
                            <input type="submit"
                                   value="Modifier le film"
                            />

                        </Form1>
                }
            </Main>
        </>
    );
};
Edit.getInitialProps = async ({query: {id}}) => {
    const res = await fetch(`https://filmographie.vercel.app/api/films/${id}`);
    const {data} = await res.json();
    return {film: data}
}

export default Edit;