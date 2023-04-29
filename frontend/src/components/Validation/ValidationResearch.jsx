const ValidationResearch = ({ onInputChange, onSubmit }) => {
    return (
        <div className="ValidationResearch-wrapper">
            <form
                className="ValidationResearch-container"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <label>
                    <input
                        name="namearticle"
                        type="text"
                        placeholder="Nom de l'article "
                        onChange={onInputChange}
                    />
                </label>

                <label>
                    <input
                        name="author1"
                        type="text"
                        placeholder="auteur 1"
                        onChange={onInputChange}
                    />
                    <input
                        name="author2"
                        type="text"
                        placeholder="auteur 2"
                        onChange={onInputChange}
                    />
                    <input
                        name="author3"
                        type="text"
                        placeholder="auteur 3"
                        onChange={onInputChange}
                    />
                </label>

                <label>
                    <input
                        type="text"
                        name="keyword1"
                        placeholder="Mot clé 1"
                        onChange={onInputChange}
                    />
                    <input
                        name="keyword2"
                        type="text"
                        placeholder="Mot clé 2"
                        onChange={onInputChange}
                    />
                    <input
                        name="keyword3"
                        onChange={onInputChange}
                        type="text"
                        placeholder="Mot clé 3"
                    />
                </label>

                <button type="submit">Chercher</button>
            </form>
        </div>
    );
};

export default ValidationResearch;
