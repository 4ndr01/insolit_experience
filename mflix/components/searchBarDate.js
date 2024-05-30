import React, { useState } from 'react';
import Voyages from '../components/voyages/list';
import Link from 'next/link';
import styles from'../../mflix/pages/SearchBar.module.css';
const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [category, setCategory] = useState('');
    const [filteredData, setFilteredData] = useState(Voyages); // Initialiser avec tous les voyages

    const handleSearch = () => {
        const filtered = Voyages.filter(voyage => {
            const matchesQuery = voyage.position.toLowerCase().includes(query.toLowerCase());
            const matchesPrice = maxPrice ? voyage.price <= maxPrice : true;
            const matchesCategory = category ? voyage.category === category : true;
            return matchesQuery && matchesPrice && matchesCategory;
        });
        setFilteredData(filtered);
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.inputContainer}>
                <input
                    className="search-input rounded-lg"
                    type="text"
                    placeholder="Rechercher..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <input
                    className="search-input rounded-lg"
                    type="number"
                    placeholder="Prix max"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                />
                <select
                    className="search-input rounded-lg"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="">Toutes les catégories</option>
                    <option value="Aventure">Aventure</option>
                    <option value="Relaxation">Relaxation</option>
                    <option value="Culture">Culture</option>
                    <option value="Sport">Sport</option>
                </select>
                <button className="search-button rounded-lg" onClick={handleSearch}>Rechercher</button>


            </div>

            <ul className={styles.voyagesList}>
                {filteredData.map((voyage) => (
                    <Link href={`/voyage/${voyage.id}`} key={voyage.id}>
                        <li className={styles.voyageItem}>
                            <img src={voyage.image} alt={voyage.name} className={styles.image}/>
                            <h3 className={styles.title}>{voyage.name}</h3>
                            <p className={styles.content}>{voyage.content}</p>
                            <p className={styles.price}>{voyage.price} €</p>

                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;
