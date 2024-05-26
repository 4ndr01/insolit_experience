import React, { useState } from 'react';
import Voyages from '../components/voyages/list';
import Link from 'next/link';
import styles from './SearchBar.module.css'; // Importez le module CSS

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [category, setCategory] = useState('');
    const [filteredData, setFilteredData] = useState(Voyages); // Initialiser avec tous les voyages

    const handleSearch = () => {
        const filtered = Voyages.filter(voyage => {
            const matchesQuery = voyage.name.toLowerCase().includes(query.toLowerCase());
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
                    className={styles.input}
                    type="text"
                    placeholder="Rechercher..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <input
                    className={styles.input}
                    type="number"
                    placeholder="Prix max"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                />
                <select
                    className={styles.input}
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="">Toutes les catégories</option>
                    <option value="Aventure">Aventure</option>
                    <option value="Relaxation">Relaxation</option>
                    <option value="Culture">Culture</option>
                    <option value="Sport">Sport</option>
                </select>
                <button
                    className={styles.button}
                    onClick={handleSearch}
                >
                    Rechercher
                </button>
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
