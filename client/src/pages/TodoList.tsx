import { useEffect, useState } from 'react';
import api from '../api/axios';
import type { Todo } from '../types';

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTodos = async () => {
        try {
            const res = await api.get<Todo[]>('/todos');
            setTodos(res.data);
        } catch (error) {
            console.error('Failed to fetch todos', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this task?')) return;
        try {
            await api.delete(`/todos/${id}`);
            setTodos(todos.filter(t => t.id !== id));
        } catch (error) {
            alert('Failed to delete todo');
        }
    };

    const handleToggle = async (todo: Todo) => {
        try {
            const updated = { ...todo, isCompleted: !todo.isCompleted };
            await api.put(`/todos/${todo.id}`, updated);
            setTodos(todos.map(t => t.id === todo.id ? updated : t));
        } catch (error) {
            alert('Failed to update todo');
        }
    };

    if (loading) return <div className="page-container">Loading...</div>;

    return (
        <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', margin: 0 }}>My Tasks</h2>
            </div>

            {todos.length === 0 ? (
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <p>No tasks found. Create one to get started!</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {todos.map(todo => (
                        <div key={todo.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '1.25rem',
                                    textDecoration: todo.isCompleted ? 'line-through' : 'none',
                                    color: todo.isCompleted ? 'var(--text-secondary)' : 'var(--text)',
                                }}>
                                    {todo.name}
                                </h3>
                                <input
                                    type="checkbox"
                                    checked={todo.isCompleted}
                                    onChange={() => handleToggle(todo)}
                                    style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer', accentColor: 'var(--primary)' }}
                                />
                            </div>
                            {todo.description && (
                                <p style={{ color: 'var(--text-secondary)', marginTop: 0, flex: 1 }}>{todo.description}</p>
                            )}
                            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    style={{
                                        background: 'transparent',
                                        color: '#ef4444',
                                        border: '1px solid currentColor',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TodoList;
