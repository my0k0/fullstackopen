import React, { useEffect, useState } from 'react'
import Note from './components/Note'
import netService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const getID = () => {
    const maxID = Math.max(...notes.map(note => note.id))

    return maxID + 1
  }

  const addNote = event => {
    event.preventDefault()
    const newObject = {
      id: getID(),
      content: newNote,
      important: Math.random() < 0.5
    }

    netService
      .create(newObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const toggleImportanceOf = id => {
    let note = notes.find(note => note.id === id)
    const newObject = {
      ...note,
      important: !note.important
    }

    netService
      .update(id, newObject)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note ${note.content} was already removed from server`
        )
        setTimeout(()=> {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(n => n.id !== id))
      })
  }

  useEffect(() => {
    netService
      .getAll()
      .then(returnedNotes => {
        setNotes(returnedNotes)
        // console.log(returnedNotes)
      })
      .catch(error => {
        console.log(`some error occurs`)
      })
  }, [])

  const notesToShow = showAll
  ? notes 
  : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {
          notesToShow.length > 0 && notesToShow.map(note => <Note key={note.id} note={note} toggleImportanceOf={() => toggleImportanceOf(note.id)} />)
        }
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit" style={{ marginLeft: 4 }}>add</button>
      </form>

      <Footer />
    </div>
  )
}

export default App