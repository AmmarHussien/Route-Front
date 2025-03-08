import { useState, useEffect } from "react";
import "./InternalNotes.css"; // Make sure to create this CSS file
import { useParams } from "react-router-dom";
import { useDriverNotes } from "../../features/drivers/driver/useDriverNotes";
import { useRideNotes } from "../../features/rides/ride/useRideNotes";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Permission from "../permission";

const Note = styled.div`
  position: relative;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const CurrentDate = styled.div`
  font-size: 0.8em;
  color: grey;
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

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

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = month + "/" + date + "/" + year;

  return (
    <div className="internal-notes">
      <h2>{t("InternalNotes")}</h2>
      <div className="notes-display">
        {notes.length === 0 ? (
          <div className="no-note">There is no note</div>
        ) : (
          notes.map((note) => (
            <Note key={note.id} className="note">
              {note.description}
              <CurrentDate>{currentDate}</CurrentDate>
            </Note>
          ))
        )}
      </div>
      <Permission requiredPermissions="createNotes">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t("InternalNotesHolder")}
        />
        <button onClick={handleAddNote}>{t("AddNote")}</button>
      </Permission>
    </div>
  );
};

export default InternalNotes;
