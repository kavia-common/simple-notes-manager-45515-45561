import { component$, useStyles$, $ } from '@builder.io/qwik';
import { useNotes } from '~/hooks/use-notes';
import styles from './sidebar.css?inline';

export const Sidebar = component$(() => {
  useStyles$(styles);
  const notesStore = useNotes();

  const handleNoteClick = $((id: string) => {
    notesStore.activeNoteId = id;
  });

  const handleNewNote = $(() => {
    const newNote = {
      id: crypto.randomUUID(),
      title: "New Note",
      content: ""
    };
    notesStore.notes.unshift(newNote);
    notesStore.activeNoteId = newNote.id;
    localStorage.setItem('notes', JSON.stringify(notesStore.notes));
  });

  return (
    <div class="sidebar">
      <button class="new-note-btn" onClick$={handleNewNote}>
        + New Note
      </button>
      <ul class="notes-list">
        {notesStore.notes.map((note) => (
          <li
            key={note.id}
            class={{
              'note-item': true,
              'active': notesStore.activeNoteId === note.id,
            }}
            onClick$={() => handleNoteClick(note.id)}
          >
            <span class="note-title">{note.title || 'Untitled'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});
