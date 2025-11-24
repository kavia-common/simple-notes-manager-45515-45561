import { component$, useStyles$, $, useTask$ } from '@builder.io/qwik';
import { useNotes } from '~/hooks/use-notes';
import styles from './note-editor.css?inline';

export const NoteEditor = component$(() => {
  useStyles$(styles);
  const notesStore = useNotes();
  const activeNote = notesStore.notes.find(n => n.id === notesStore.activeNoteId);

  const handleInput = $((event: Event) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const note = notesStore.notes.find(n => n.id === notesStore.activeNoteId);
    if (note) {
      if (target.name === 'title') {
        note.title = target.value;
      } else {
        note.content = target.value;
      }
      localStorage.setItem('notes', JSON.stringify(notesStore.notes));
    }
  });

  const handleDelete = $(() => {
    if(notesStore.activeNoteId) {
        notesStore.notes = notesStore.notes.filter(n => n.id !== notesStore.activeNoteId);
        const newActiveId = notesStore.notes.length > 0 ? notesStore.notes[0].id : null;
        notesStore.activeNoteId = newActiveId;
        localStorage.setItem('notes', JSON.stringify(notesStore.notes));
    }
  });

  useTask$(({track}) => {
    track(() => notesStore.activeNoteId);
  });

  return (
    <div class="note-editor">
      {activeNote ? (
        <div class="editor-content">
          <input
            name="title"
            class="note-title-input"
            type="text"
            value={activeNote.title}
            onInput$={handleInput}
            placeholder="Note Title"
          />
          <textarea
            name="content"
            class="note-content-input"
            value={activeNote.content}
            onInput$={handleInput}
            placeholder="Start writing..."
          ></textarea>
           <button class="delete-note-btn" onClick$={handleDelete}>Delete Note</button>
        </div>
      ) : (
        <div class="no-note-selected">
          <h2>Select a note to edit, or create a new one.</h2>
        </div>
      )}
    </div>
  );
});
