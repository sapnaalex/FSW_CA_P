import React, { useState } from 'react';

function ArtExhibitionShowcase() {
  const [exhibitions, setExhibitions] = useState([]);
  const [newExhibition, setNewExhibition] = useState({ title: '', venue: '', date: '', description: '', status: 'pending' });
  const [editId, setEditId] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [filterByStatus, setFilterByStatus] = useState('all');

  const addOrUpdateExhibition = () => {
    if (newExhibition.title && newExhibition.venue && newExhibition.date && newExhibition.description) {
      if (editId !== null) {
        const updatedExhibitions = exhibitions.map((exhibition) =>
          exhibition.id === editId ? { ...newExhibition, id: editId } : exhibition
        );
        setExhibitions(updatedExhibitions);
        setEditId(null);
      } else {
        const newEntry = { ...newExhibition, id: Date.now() };
        setExhibitions([...exhibitions, newEntry]);
      }
      setNewExhibition({ title: '', venue: '', date: '', description: '', status: 'pending' });
    }
  };

  const deleteExhibition = (id) => {
    setExhibitions(exhibitions.filter((exhibition) => exhibition.id !== id));
  };

  const editExhibition = (id) => {
    const exhibitionToEdit = exhibitions.find((exhibition) => exhibition.id === id);
    setNewExhibition(exhibitionToEdit);
    setEditId(id);
  };

  const toggleStatus = (id) => {
    setExhibitions(exhibitions.map((exhibition) =>
      exhibition.id === id ? { ...exhibition, status: exhibition.status === 'pending' ? 'approved' : 'pending' } : exhibition
    ));
  };

  const sortedExhibitions = [...exhibitions].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'venue') {
      return a.venue.localeCompare(b.venue);
    }
    return 0;
  });

  const filteredExhibitions = filterByStatus === 'all' ? sortedExhibitions : sortedExhibitions.filter(exhibition => exhibition.status === filterByStatus);

  return (
    <div>
      <h1>Art Exhibition Showcase</h1>
      
      <h2>{editId !== null ? "Edit Exhibition" : "Add Exhibition"}</h2>
      <input 
        type="text" 
        placeholder="Title" 
        value={newExhibition.title} 
        onChange={(e) => setNewExhibition({ ...newExhibition, title: e.target.value })} 
      />
      <input 
        type="text" 
        placeholder="Venue" 
        value={newExhibition.venue} 
        onChange={(e) => setNewExhibition({ ...newExhibition, venue: e.target.value })} 
      />
      <input 
        type="date" 
        value={newExhibition.date} 
        onChange={(e) => setNewExhibition({ ...newExhibition, date: e.target.value })} 
      />
      <textarea 
        placeholder="Description" 
        value={newExhibition.description} 
        onChange={(e) => setNewExhibition({ ...newExhibition, description: e.target.value })} 
      />
      <button onClick={addOrUpdateExhibition}>{editId !== null ? "Update Exhibition" : "Add Exhibition"}</button>
      
      <h2>Exhibitions</h2>
      <label>Sort by: </label>
      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
        <option value="date">Date</option>
        <option value="venue">Venue</option>
      </select>
      
      <label>Filter by Status: </label>
      <select onChange={(e) => setFilterByStatus(e.target.value)} value={filterByStatus}>
        <option value="all">All</option>
        <option value="approved">Approved</option>
        <option value="pending">Pending</option>
      </select>
      
      <ul>
        {filteredExhibitions.map((exhibition) => (
          <li key={exhibition.id}>
            <strong>{exhibition.title}</strong> - {exhibition.venue} ({exhibition.date})
            <p>{exhibition.description}</p>
            <p>Status: {exhibition.status}</p>
            <button onClick={() => editExhibition(exhibition.id)}>Edit</button>
            <button onClick={() => deleteExhibition(exhibition.id)}>Delete</button>
            <button onClick={() => toggleStatus(exhibition.id)}>Toggle Status</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtExhibitionShowcase;
