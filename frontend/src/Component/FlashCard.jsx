import React, { useState } from 'react';

const Flashcard = ({ question, answer,setFlip,flip }) => {
   
        
    const handleFlip = () => {
        setFlip(!flip);
    };

    return (
        <div
            onClick={handleFlip}
            style={{
                width: '300px',
                height: '200px',
                perspective: '1000px',
                margin: '20px auto',
                cursor: 'pointer',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    textAlign: 'center',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: flip ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#1e1e1e', // Dark background for the flashcard
                        color: '#ffffff', // White text for readability
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Subtle shadow for depth
                        padding: '20px',
                        fontSize: '18px',
                    }}
                >
                    {question}
                </div>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#333333', // Slightly lighter background for the answer side
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                        padding: '20px',
                        fontSize: '18px',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    {answer}
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
