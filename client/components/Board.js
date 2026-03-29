import React from 'react';

export default function Board({ board }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
            <h2 className="text-lg font-bold text-gray-800">{board.name}</h2>
            <p className="text-gray-500 text-sm mt-2">ID: {board.id}</p>
        </div>
    );
}