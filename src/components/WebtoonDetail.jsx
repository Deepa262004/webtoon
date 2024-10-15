import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WebtoonDetail = () => {
    const { id } = useParams();  // Fetching webtoon ID from URL parameters
    const [webtoon, setWebtoon] = useState(null);  // Webtoon details
    const [comments, setComments] = useState([]);  // User comments
    const [comment, setComment] = useState('');    // New comment input
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState('');        // Error state

    useEffect(() => {
        const fetchWebtoon = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/webtoons/${id}`);
                setWebtoon(response.data);
                setComments(response.data.comments);
            } catch (err) {
                setError('Failed to fetch webtoon data.');
            } finally {
                setLoading(false);
            }
        };

        fetchWebtoon();
    }, [id]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            const newComment = { user: 'Anonymous', text: comment.trim() };
            setComments([...comments, newComment]);  // Append new comment
            setComment('');  // Reset comment input
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={styles.container}>
            <h1>{webtoon.title}</h1>
            <img src={webtoon.image} alt={webtoon.title} style={styles.image} />
            <p style={styles.description}>{webtoon.description}</p>

            <section style={styles.commentsSection}>
                <h2>User Comments</h2>
                <ul style={styles.commentsList}>
                    {comments.map((c, index) => (
                        <li key={index} style={styles.commentItem}>
                            <strong>{c.user}:</strong> {c.comment}
                        </li>
                    ))}
                </ul>

                <form onSubmit={handleCommentSubmit} style={styles.form}>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment"
                        style={styles.input}
                    />
                    <button type="submit" style={styles.submitButton}>
                        Submit
                    </button>
                </form>
            </section>
        </div>
    );
};

// CSS-in-JS Styling for better modern practices
const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    description: {
        fontSize: '1.2rem',
        lineHeight: '1.6',
        marginBottom: '20px',
    },
    commentsSection: {
        marginTop: '30px',
    },
    commentsList: {
        listStyle: 'none',
        padding: '0',
    },
    commentItem: {
        backgroundColor: '#f9f9f9',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '20px',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    submitButton: {
        padding: '10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }
};

export default WebtoonDetail;
