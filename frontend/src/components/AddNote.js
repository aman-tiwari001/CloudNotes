import React, {useContext, useState} from 'react'
import NoteContext from "../context/Notes/noteContext";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title: "", description: "", tag : ""});

  const handleClick = (e) => {
    e.preventDefault(); // to prevent page refresh on button click
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag : ""});
    props.showAlert("Note added successfully", "success");
  }

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <div className='container mt-4'>
      <h3 className='text-center mb-4'>Hi {localStorage.getItem('user-name')}! Add your notes to cloud</h3>
      <div className="mb-3">
        <label htmlFor="title" className="form-label"><b>Enter your title</b></label>
        <input onChange={onChange} value={note.title} style={{ "backgroundColor": "#1987541a"}} name="title" type="text" className="form-control border border-success inp-fsize" id="title" placeholder="Title" />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label"><b>Description</b></label>
        <textarea onChange={onChange} value={note.description} style={{ "backgroundColor": "#1987541a" }} name="description" placeholder="Describe your thoughts, feelings & ideas here..." className="form-control border border-success inp-fsize" id="description" rows="5"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label"><b>Tags</b></label>
        <input onChange={onChange} value={note.tag} style={{ "backgroundColor": "#1987541a" }} name="tag" type="text" className="form-control border border-success inp-fsize" id="tag" placeholder="#tags" />
      </div>
      <button disabled={note.title.length===0 | note.description.length===0} className='btn btn-success' onClick={handleClick}>Save Note</button>
    </div>
  )
}

export default AddNote