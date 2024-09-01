import { useState, useEffect } from "react";
import "./InternalNotes.css"; // Make sure to create this CSS file
import { useParams } from "react-router-dom";
import { useNotes } from "../../features/drivers/driver/useNotes";

const InternalNotes = ({ notes: initialNotes }) => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(initialNotes);

  const { userId } = useParams(); // Extract userId from the URL

  const { isAdded, addNote } = useNotes();

  const handleAddNote = () => {
    if (note.trim() !== "") {
      const newNote = {
        id: notes.length + 1,
        description: note,
        created_at: new Date().toLocaleString(),
      };

      addNote({ userId, note: newNote.description });
      setNotes([...notes, newNote]);
      setNote("");
    }
  };

  useEffect(() => {
    if (isAdded) {
      // Update the notes state to reflect the addition (already handled above with setNotes)
      console.log("New note added successfully, updating UI...");
    }
  }, [isAdded]); // This effect runs when `isAdded` changes

  return (
    <div className="internal-notes">
      <h2>Internal Notes</h2>
      <div className="notes-display">
        {notes.length === 0 ? (
          <div className="no-note">There is no note</div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note">
              {note.description}
            </div>
          ))
        )}
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your note here"
      />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
};

export default InternalNotes;
