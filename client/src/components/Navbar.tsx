import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="glass-panel" style={{ borderRadius: '0', marginBottom: '2rem', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}>
            <div className="page-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
                    GeminiTodo
                </h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link
                        to="/list-todos"
                        style={{
                            color: isActive('/list-todos') ? '#fff' : '#94a3b8',
                            textDecoration: 'none',
                            fontWeight: 500,
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            background: isActive('/list-todos') ? 'rgba(59, 130, 246, 0.2)' : 'transparent'
                        }}
                    >
                        My Todos
                    </Link>
                    <Link
                        to="/create-todos"
                        style={{
                            color: isActive('/create-todos') ? '#fff' : '#94a3b8',
                            textDecoration: 'none',
                            fontWeight: 500,
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            background: isActive('/create-todos') ? 'rgba(59, 130, 246, 0.2)' : 'transparent'
                        }}
                    >
                        Create Todo
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
