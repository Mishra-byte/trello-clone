import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [boards, setBoards] = useState([]);
    const [newBoard, setNewBoard] = useState('');

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = async () => {
        try {
            const res = await axios.get('/api/boards');
            setBoards(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateBoard = async () => {
        if (newBoard.trim()) {
            try {
                const res = await axios.post('/api/boards', { name: newBoard });
                setBoards([...boards, res.data]);
                setNewBoard('');
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-8">Trello Clone</h1>
            <div className="flex gap-4 mb-8">
                <input type="text" value={newBoard} onChange={(e) => setNewBoard(e.target.value)} placeholder="New board name" className="flex-1 px-4 py-2 border rounded" />
                <button onClick={handleCreateBoard} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create Board</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {boards.map(board => (
                    <div key={board.id} className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold">{board.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}