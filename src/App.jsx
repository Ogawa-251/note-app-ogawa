
import { useEffect, useState } from 'react';
import './App.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import uuid from 'react-uuid';

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
    );
  const [actineNote, setActiveNote] = useState(false);


  useEffect(() => {
    // ローカルストレージにノートを保存する
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  useEffect(() => {
    if (notes.length > 0) {
      setActiveNote(notes[0].id);
    }
  }, []);

  const onAddNote = () => {
    console.log("新しくノートが追加されました");
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
    console.log(notes);
  };

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };


  const getActiveNote = () => {
    return notes.find((note) => note.id === actineNote)
  };

  const onUpdateNote = (updateNote) => {
    // 修正された新しいノートの配列を返す
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updateNote.id) {
        return updateNote;
      } else {
        return note;
      }
    });

    setNotes(updatedNotesArray);
  };



  return (
  <div className='App'>
    <Sidebar 
    onAddNote={onAddNote} 
    notes={notes} 
    onDeleteNote={onDeleteNote}
    actineNote={actineNote}
    setActiveNote={setActiveNote}
     />
    <Main actineNote={getActiveNote()} onUpdateNote={onUpdateNote} />

  </div>
  );
}

export default App;
