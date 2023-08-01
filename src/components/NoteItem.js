import React, {useContext} from 'react';
import NoteContext from "../context/Notes/noteContext";

const NoteItem = (props) => {
    const {note, updateNote} = props;
    const context = useContext(NoteContext);
    const { deleteNote, editNote } = context;
  return (
    <div className='col-md-3 my-2'>
        <div className="card border border-success" style={{"backgroundColor" : "#1987541a"}}>
            <div className="card-body">
                <h4 className='card-title'>{note.title.slice(0,100)}</h4>
                <p className='card-text'>{note.description.slice(0,100)}</p>
                <p><strong>#{note.tag.slice(0,100)}</strong></p>
                <i className="fa-regular fa-note-sticky fa-lg mx-3" data-bs-toggle="modal" data-bs-target="#viewModal" onClick={() => updateNote(note)} style={{"color": "#198754"}}></i>
                <i className="fa-regular fa-pen-to-square fa-lg mx-3" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => updateNote(note)} style={{"color": "#198754"}}></i>
                <i className="fa-regular fa-trash-can fa-lg mx-3" onClick={() => {deleteNote(note._id); props.showAlert("Note deleted successfully!","danger")}} style={{"color": "#198754"}}></i>
            </div>
        </div>
    </div>
  )
}

export default NoteItem;