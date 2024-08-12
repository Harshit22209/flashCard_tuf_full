import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('/flashcards').then((response) => {
            setFlashcards(response.data);
        });
    }, []);

    const handleAdd = () => {
        axios.post('/flashcards', { question: newQuestion, answer: newAnswer }).then((response) => {
            setFlashcards([...flashcards, response.data]);
            setNewQuestion('');
            setNewAnswer('');
            setIsAdding(false);
        });
    };

    const handleEdit = (id, question, answer) => {
        axios.put(`/flashcards/${id}`, { question, answer }).then(() => {
            setFlashcards(
                flashcards.map((card) =>
                    card.id === id ? { ...card, question, answer } : card
                )
            );
        });
    };

    const handleDelete = (id) => {
        axios.delete(`/flashcards/${id}`).then(() => {
            setFlashcards(flashcards.filter((card) => card.id !== id));
        });
    };

    // Filter flashcards based on search query
    const filteredFlashcards = flashcards.filter(card =>
        card.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: '20px', color: '#ffffff' }}>
            <h2>Admin Dashboard</h2>
            
            
            
            {/* Button to Toggle Adding New Flashcard */}
            <button 
                onClick={() => setIsAdding(!isAdding)}
                style={{
                    backgroundColor: '#333',
                    color: '#fff',
                    padding: '10px 20px',
                    margin: '10px 0',
                    border: '1px solid #555',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#444'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#333'}
            >
                {isAdding ? 'Cancel' : 'Add New Flashcard'}
            </button>
            
            {/* Form to Add New Flashcard */}
            {isAdding && (
                <div style={{ marginBottom: '20px' }}>
                    <textarea
                        style={{
                            width: '100%',
                            height: '100px',
                            padding: '10px',
                            fontSize: '16px',
                            backgroundColor: '#222',
                            color: '#fff',
                            border: '1px solid #555',
                            marginBottom: '10px',
                            borderRadius: '5px',
                        }}
                        placeholder="Question"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    <textarea
                        style={{
                            width: '100%',
                            height: '100px',
                            padding: '10px',
                            fontSize: '16px',
                            backgroundColor: '#222',
                            color: '#fff',
                            border: '1px solid #555',
                            marginBottom: '10px',
                            borderRadius: '5px',
                        }}
                        placeholder="Answer"
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                    />
                    <button 
                        onClick={handleAdd}
                        style={{
                            backgroundColor: '#333',
                            color: '#fff',
                            padding: '10px 20px',
                            border: '1px solid #555',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#444'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#333'}
                    >
                        Add Flashcard
                    </button>
                </div>
            )}
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search flashcards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '3px solid #5e0099',
                    backgroundColor: '#222',
                    color: '#fff',
                    marginBottom: '20px',
                    marginTop:'20px'
                }}
            />
            {/* Display All Flashcards */}
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {filteredFlashcards.length > 0 ? (
                    filteredFlashcards.map((card) => (
                        <li key={card.id} style={{ marginBottom: '20px' }}>
                            <textarea
                                style={{
                                    width: '100%',
                                    height: '100px',
                                    padding: '10px',
                                    fontSize: '16px',
                                    backgroundColor: '#222',
                                    color: '#fff',
                                    border: '1px solid #555',
                                    marginBottom: '10px',
                                    borderRadius: '5px',
                                }}
                                value={card.question}
                                onChange={(e) =>
                                    handleEdit(card.id, e.target.value, card.answer)
                                }
                            />
                            <textarea
                                style={{
                                    width: '100%',
                                    height: '100px',
                                    padding: '10px',
                                    fontSize: '16px',
                                    backgroundColor: '#222',
                                    color: '#fff',
                                    border: '1px solid #555',
                                    marginBottom: '10px',
                                    borderRadius: '5px',
                                }}
                                value={card.answer}
                                onChange={(e) =>
                                    handleEdit(card.id, card.question, e.target.value)
                                }
                            />
                            <button 
                                onClick={() => handleDelete(card.id)}
                                style={{
                                    backgroundColor: '#800000',
                                    color: '#fff',
                                    padding: '10px 20px',
                                    border: '1px solid #a00',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#a00'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#800000'}
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No flashcards found.</p>
                )}
            </ul>
        </div>
    );
};

export default AdminDashboard;
