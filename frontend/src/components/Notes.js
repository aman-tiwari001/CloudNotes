import React, { useContext, useEffect, useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import NoteContext from '../context/Notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {
  const navigate = useNavigate();
  const refClose = useRef(null);
  const context = useContext(NoteContext);
  const { notes, getAllNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')) {
      getAllNotes();
    }
    else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [])

  const [note, setNote] = useState({id: "", title: "", description: "", tag : ""});

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  }
  
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note._id, note.title, note.description, note.tag);
    refClose.current.click();
    props.showAlert("Note updated successfully!", "success");
  }

  const updateNote = (currentNote) => {
    setNote(currentNote);
  }
  return (
    <div className="row my-3">
      <AddNote showAlert={props.showAlert} />

      {/* MODAL TO EDIT NOTES */}

      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit your note</h1>
              <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='container my-3'>
                <div className="mb-3">
                  <input onChange={onChange} value={note.title} style={{ "backgroundColor": "#1987541a" }} name="title" type="text" className="form-control border border-success" id="title" placeholder="Title" />
                </div>
                <div className="mb-3">
                  <textarea onChange={onChange} value={note.description} style={{ "backgroundColor": "#1987541a"}} name="description" placeholder="Description" className="form-control border border-success" id="description" rows="8"></textarea>
                </div>
                <div className="mb-3">
                  <input onChange={onChange} value={note.tag}style={{ "backgroundColor": "#1987541a" }} name="tag" type="text" className="form-control border border-success" id="tag" placeholder="Tags" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-success" onClick={handleClick}>Update note</button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL TO VIEW NOTES */}

      <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Your saved note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='container my-3'>
                <div className="mb-3">
                  <input readOnly onChange={onChange} value={note.title} style={{ "backgroundColor": "#1987541a" }} name="title" type="text" className="form-control border border-success" id="title" placeholder="Title" />
                </div>
                <div className="mb-3">
                  <textarea readOnly onChange={onChange} value={note.description} style={{ "backgroundColor": "#1987541a" }} name="description" placeholder="Description" className="form-control border border-success" id="description" rows="8"></textarea>
                </div>
                <div className="mb-3">
                  <input readOnly onChange={onChange} value={note.tag}style={{ "backgroundColor": "#1987541a" }} name="tag" type="text" className="form-control border border-success" id="tag" placeholder="Tags" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <h3 className='mt-4'>Your notes</h3>
      <h5 className='mt-2'>{notes.length===0 && "No notes to display!"}</h5>
      {notes.map((note) => {
        return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />;
      })}
    </div>
  )
}

export default Notes;