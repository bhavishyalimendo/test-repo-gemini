import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CreateTodo = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/todos', { name, description });
            navigate('/list-todos');
        } catch (error) {
            console.error('Failed to create todo', error);
            alert('Failed to create todo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container" style={{ maxWidth: '600px' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
                <h2 style={{ marginTop: 0, marginBottom: '2rem', fontSize: '1.75rem' }}>Create New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Task Name</label>
                        <input
                            type="text"
                            className="input-field"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="e.g., Buy groceries"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description (Optional)</label>
                        <textarea
                            className="input-field"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add more details..."
                            style={{ minHeight: '120px', resize: 'vertical' }}
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Creating...' : 'Create Task'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTodo;
