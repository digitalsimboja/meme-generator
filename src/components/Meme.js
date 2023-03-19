import React, { useEffect, useState } from "react";

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMemes] = useState([])

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        joinedNewsletter: false
    })


    function getRandomMeme(e) {
        e.preventDefault();
        const randonIndex = Math.floor(Math.random() * allMemes.length)
        setMeme(prevMeme => ({ ...prevMeme, randomImage: allMemes[randonIndex].url }))
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function handleSignUpInput(event) {
        const { name, type, value, checked } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }))


    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(formData)
    }

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])



    return (
        <main>
            <form className="form">
                <input  name="topText" value={meme.topText} type="text"  onChange={handleChange} className="meme-input" placeholder="Top text" />
                <input name="bottomText" value={meme.bottomText} type="text" onChange={handleChange} className="meme-input" placeholder="Bottom Text" />
                <button onClick={(e) => getRandomMeme(e)} className="meme-button"> Get a new meme image 🖼</button>
            </form>
            <div className="image-container">
                <img className="meme-image" src={meme.randomImage} alt="" />
                <h2 className="top meme-text">{meme.topText}</h2>
                <h2 className="bottom meme-text">{meme.bottomText}</h2>
            </div>
            <div className="signup-form-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleSignUpInput}
                        className="signup-input"
                        placeholder="john.doe@mail.com"
                    />
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleSignUpInput}
                        className="signup-input"
                        placeholder="password"
                    />
                    <input
                        name="passwordConfirm"
                        type="password"
                        value={formData.passwordConfirm}
                        onChange={handleSignUpInput}
                        className="signup-input"
                        placeholder="confirm password"
                    />
                    <div className="form--marketing">
                        <input type="checkbox" name="joinedNewsletter" onChange={handleSignUpInput} checked={formData.joinedNewsletter} />
                        <label>I want to join the newsletter</label>
                    </div>
                    <button className="signup-btn">Sign up</button>

                </form>
            </div>
        </main>
    )
}