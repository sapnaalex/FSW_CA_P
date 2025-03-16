import React, { useState } from 'react';

function MusicPlaylistManager() {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({ title: '', artist: '', duration: '' });
  const [search, setSearch] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdateSong = () => {
    if (newSong.title && newSong.artist && newSong.duration) {
      if (editIndex !== null) {
        const updatedSongs = songs.map((song, index) =>
          index === editIndex ? newSong : song
        );
        setSongs(updatedSongs);
        setEditIndex(null);
      } else {
        setSongs([...songs, newSong]);
      }
      setNewSong({ title: '', artist: '', duration: '' });
    }
  };

  const deleteSong = (index) => {
    setSongs(songs.filter((_, i) => i !== index));
  };

  const editSong = (index) => {
    setNewSong(songs[index]);
    setEditIndex(index);
  };

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Music Playlist Manager</h1>
      
      <input 
        type="text" 
        placeholder="Search by title or artist..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      
      <h2>{editIndex !== null ? "Edit Song" : "Add Song"}</h2>
      <input 
        type="text" 
        placeholder="Title" 
        value={newSong.title} 
        onChange={(e) => setNewSong({ ...newSong, title: e.target.value })} 
      />
      <input 
        type="text" 
        placeholder="Artist" 
        value={newSong.artist} 
        onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })} 
      />
      <input 
        type="text" 
        placeholder="Duration" 
        value={newSong.duration} 
        onChange={(e) => setNewSong({ ...newSong, duration: e.target.value })} 
      />
      <button onClick={addOrUpdateSong}>{editIndex !== null ? "Update Song" : "Add Song"}</button>
      
      <h2>Playlist</h2>
      <ul>
        {filteredSongs.map((song, index) => (
          <li key={index}>
            {song.title} - {song.artist} ({song.duration})
            <button onClick={() => editSong(index)}>Edit</button>
            <button onClick={() => deleteSong(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MusicPlaylistManager;
