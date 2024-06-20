import mainStyles from "./Main.module.scss";
import { useState, useRef } from "react";

const Main = () => {

    const Categories = ["Esotico", "Montagna", "Mare", "Nella natura"]
    const Tags = ["In famiglia", "Economico", "Con gli amici", "Istruttivo", "Relax"]

    // Array che conterrà i Post creati
    const [posts, setPosts] = useState([]);

    // Base Data per i post
    const initialData = {
        title: "",
        img: "",
        text: "",
        Category: "",
        Tags: [],
        visible: true
    }

    const [formData, setFormData] = useState(initialData);

    // const [editIndex, setEditIndex] = useState(null);
    // const [editValue, setEditValue] = useState("");

    // Aggiungi Data
    const dataSubmit = (event) => {
        event.preventDefault();
        setPosts(array => ([...array, formData]));
        setFormData(initialData);
    }


    // Se clicchi il pulsante enter aggiunge il post
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            dataSubmit(event);
        }
    }

    // Gestione del cambiamento
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            const updatedTags = checked ?
                [...formData.Tags, value] :
                formData.Tags.filter(tag => tag !== value);
            setFormData({
                ...formData,
                Tags: updatedTags
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };


    return (
        <main>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 my-5">

                        <form onSubmit={dataSubmit}>
                            <div className="d-flex flex-wrap">
                                <div className="col-6 p-1 text-center">
                                    {/* Titolo post */}
                                    <label htmlFor="title" className={mainStyles.viola}>
                                        <h3>Titolo del post</h3>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Inserisci il titolo del post"
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>

                                <div className="col-6 p-1 text-center">

                                    {/* Link img */}
                                    <label htmlFor="img" className={mainStyles.viola}>
                                        <h3>Inserisci la foto</h3>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="img"
                                        name="img"
                                        value={formData.img}
                                        onChange={handleChange}
                                        placeholder="Inserisci il link della foto"
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                                <div className="col-12 my-2 text-center">
                                    {/* text-area */}
                                    <label htmlFor="text" className={mainStyles.viola}>
                                        <h3>Inserisci Il testo</h3>
                                    </label>
                                    <textarea
                                        required
                                        type="text"
                                        className="form-control"
                                        id="text"
                                        name="text"
                                        value={formData.text}
                                        onChange={handleChange}
                                        placeholder="Inserisci il contenuto"
                                        onKeyPress={handleKeyPress}
                                    ></textarea>
                                </div>

                                <div className="col-12 col-md-6 my-2 p-1 text-center">
                                    {/* Categorie */}
                                    <label htmlFor="Category" className={mainStyles.viola}>
                                        <h3>Seleziona una categoria</h3>
                                    </label>
                                    <select
                                        required
                                        id="Category"
                                        className="form-select"
                                        aria-label="Seleziona una categoria"
                                        name="Category"
                                        value={formData.Category}
                                        onChange={handleChange}
                                    >
                                        <option value="">Seleziona una categoria</option>
                                        {Categories.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-12 col-md-6 p-1 ">
                                    {/* Tags */}
                                    <div className={mainStyles.viola}>
                                        <h3 className="text-center">Seleziona i Tag</h3>
                                        <div className="d-flex flex-wrap">
                                            {Tags.map((tag, index) => (
                                                <div className="form-check mx-1 my-3" key={index}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`tag-${index}`}
                                                        value={tag}
                                                        checked={formData.Tags.includes(tag)}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor={`tag-${index}`}>
                                                        {tag}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <button className={mainStyles.button} >Invia</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <h3 className={mainStyles.viola}>Posts salvati</h3>
                    {posts.map((post, index) => (
                        <div className="col-12 col-md-4 col-lg-3 my-3 text-center">
                            <h3 className="Text-center">{post.title}</h3>
                            <figure>
                                <img src={post.img} alt={post.title} className={mainStyles.image} />
                            </figure>
                            <p className="text-center">{post.text}</p>
                            <h5><strong className={mainStyles.viola}>Categoria:</strong> {post.Category}</h5>
                            <h6><strong className={mainStyles.viola}>Tags:</strong> {post.Tags.join(" - ")}</h6>
                        </div>
                    ))}

                </div>
            </div>
        </main>
    );
}

export default Main;
