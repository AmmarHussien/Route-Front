import { useState, useEffect } from "react";
import "./InternalNotes.css"; // Make sure to create this CSS file
import { useParams } from "react-router-dom";
import { useDriverNotes } from "../../features/drivers/driver/useDriverNotes";
import { useRideNotes } from "../../features/rides/ride/useRideNotes";
import { useTranslation } from "react-i18next";

const InternalNotes = ({ notes: initialNotes }) => {
  const { t } = useTranslation();

  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(initialNotes);

  const { userId, Id } = useParams(); // Extract userId from the URL

  const { isAdded: DriverLoading, addNote: DriverNotes } = useDriverNotes();
  const { isAdded: RideLoading, addNote: RiderNotes } = useRideNotes();

  const handleAddNote = () => {
    if (note.trim() !== "") {
      const newNote = {
        id: notes.length + 1,
        description: note,
        created_at: new Date().toLocaleString(),
      };

      if (Id === undefined) {
        DriverNotes({ userId, note: newNote.description });
      } else {
        RiderNotes({ Id, note: newNote.description });
      }

      setNotes([...notes, newNote]);
      setNote("");
    }
  };

  useEffect(() => {
    if (DriverLoading || RideLoading) {
      // Update the notes state to reflect the addition (already handled above with setNotes)
      //console.log("New note added successfully, updating UI...");
    }
  }, [DriverLoading, RideLoading]); // This effect runs when `isAdded` changes

  return (
    <div className="internal-notes">
      <h2>{t("InternalNotes")}</h2>
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
        placeholder={t("InternalNotesHolder")}
      />
      <button onClick={handleAddNote}>{t("AddNote")}</button>
    </div>
  );
};

export default InternalNotes;
