const Note = ({note, toggleImportanceOf}) => {
    const label = note.important 
        ? 'make not important' 
        : 'make important'

    return (
        <li>
            {note.content}
            <button onClick={toggleImportanceOf} style={{ marginLeft: 8 }}>{label}</button>
        </li>
    )
}

export default Note