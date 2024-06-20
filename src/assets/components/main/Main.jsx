import mainStyles from "./Main.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const api = 'http://localhost:3000/posts';

const Main = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(api);
            setPosts(response.data.data);
            console.log('Dati ricevuti:', response.data.data);
        } catch (error) {
            console.error('Qualcosa è andato storto nel recupero dei post', error);
        }
    };

    const Categories = ["Esotico", "Montagna", "Mare", "Nella natura"];
    const Tags = ["In famiglia", "Economico", "Con gli amici", "Istruttivo", "Relax"];

    const initialData = {
        title: "",
        image: "",
        content: "",
        categoryID: "",
        tags: [],
        published: true
    };

    const [formData, setFormData] = useState(initialData);

    const dataSubmit = async (e) => {
        e.preventDefault();

        // Validazione dei dati prima dell'invio
        if (!formData.title || !formData.image || !formData.content || !formData.categoryID) {
            setError('Tutti i campi sono obbligatori');
            return;
        }

        try {
            const res = await axios.post(api, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            console.log(res);
    
            if (res.status < 400) {
                onCreate();
            }
        } catch (error) {
            console.error('Errore durante l\'aggiunta del post', error);
            setError('Errore durante l\'invio dei dati');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            dataSubmit(event);
        }
    };

const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
        const updatedTags = checked ?
            [...formData.tags, value] :
            formData.tags.filter(tag => tag !== value);
        setFormData({
            ...formData,
            tags: updatedTags
        });
    } else if (name === 'categoryID') {
        setFormData({
            ...formData,
            categoryID: value
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
                                    <label htmlFor="image" className={mainStyles.viola}>
                                        <h3>Inserisci la foto</h3>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="image"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="Inserisci il link della foto"
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                                <div className="col-12 my-2 text-center">
                                    <label htmlFor="content" className={mainStyles.viola}>
                                        <h3>Inserisci Il testo</h3>
                                    </label>
                                    <textarea
                                        required
                                        className="form-control"
                                        id="content"
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        placeholder="Inserisci il contenuto"
                                        onKeyPress={handleKeyPress}
                                    ></textarea>
                                </div>
                                <div className="col-12 col-md-6 my-2 p-1 text-center">
                                    <label htmlFor="category" className={mainStyles.viola}>
                                        <h3>Seleziona una categoria</h3>
                                    </label>
                                    <select
                                        required
                                        id="category"
                                        className="form-select"
                                        aria-label="Seleziona una categoria"
                                        name="categoryID"
                                        value={formData.categoryID}
                                        onChange={handleChange}
                                    >
                                        <option value="">Seleziona una categoria</option>
                                        {Categories.map((category, index) => (
                                            <option key={index} value={index + 1}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12 col-md-6 p-1 ">
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
                                                        checked={formData.tags.includes(tag)}
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
                                    <button type="submit" className={mainStyles.button}>Invia</button>
                                </div>
                            </div>
                        </form>
                        {error && <p className="text-danger text-center">{error}</p>}
                    </div>
                    <h3 className={mainStyles.viola}>Posts salvati</h3>
                    {posts.map((post, index) => (
                        <div key={index} className="col-12 col-md-4 col-lg-3 my-3 text-center">
                            <figure>
                                <img src={post.image} alt={post.title} className={mainStyles.image} />
                            </figure>
                            <h3 className="text-center">{post.title}</h3>
                            <p className="text-center">{post.content}</p>
                            <h5><strong className={mainStyles.viola}>Categoria:</strong> {post.category ? post.category.name : 'Non disponibile'}</h5>
                            <h6><strong className={mainStyles.viola}>Tags:</strong> {post.tags && post.tags.length > 0 ? post.tags.map(tag => tag.name).join(', ') : 'Non disponibile'}</h6>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Main;
