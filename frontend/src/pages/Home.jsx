import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/items');
            setItems(res.data);
        } catch (err) {
            console.error('Error fetching items', err);
        }
    };

    const addItem = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/items', { name });
            setName('');
            fetchItems();
        } catch (err) {
            console.error('Error adding item', err);
        }
    };

    return (
        <main style={{ padding: '2rem' }}>
            <h2>Items</h2>
            <form onSubmit={addItem}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="New Item Name"
                    required
                />
                <button type="submit">Add Item</button>
            </form>
            <ul>
                {items.map(item => (
                    <li key={item._id}>{item.name}</li>
                ))}
            </ul>
        </main>
    );
};

export default Home;
