import { createContextId, useContextProvider, useStore, useContext, $, useVisibleTask$ } from '@builder.io/qwik';
import type { Note } from '~/types';

export interface NotesStore {
  notes: Note[];
  activeNoteId: string | null;
}

export const NotesContext = createContextId<NotesStore>('notes-context');

export const useNotesProvider = () => {
  const store = useStore<NotesStore>({
    notes: [],
    activeNoteId: null,
  });

  useContextProvider(NotesContext, store);

  useVisibleTask$(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      store.notes = JSON.parse(savedNotes);
      if (store.notes.length > 0) {
        store.activeNoteId = store.notes[0].id;
      }
    } else {
        // Create a default note if no notes are saved
        const defaultNote: Note = {
            id: crypto.randomUUID(),
            title: 'Welcome to Qwik Notes!',
            content: 'This is your first note. Feel free to edit or delete it.',
        };
        store.notes = [defaultNote];
        store.activeNoteId = defaultNote.id;
        localStorage.setItem('notes', JSON.stringify(store.notes));
    }
  });

  const saveNotes = $(() => {
    localStorage.setItem('notes', JSON.stringify(store.notes));
  });

  const createNote = $(() => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'New Note',
      content: '',
    };
    store.notes.unshift(newNote);
    store.activeNoteId = newNote.id;
    saveNotes();
  });

  const updateNote = $((id: string, title: string, content: string) => {
    const note = store.notes.find((n) => n.id === id);
    if (note) {
      note.title = title;
      note.content = content;
      saveNotes();
    }
  });

  const deleteNote = $((id: string) => {
    store.notes = store.notes.filter((n) => n.id !== id);
    if (store.activeNoteId === id) {
      store.activeNoteId = store.notes.length > 0 ? store.notes[0].id : null;
    }
    saveNotes();
  });

  const setActiveNoteId = $((id: string | null) => {
    store.activeNoteId = id;
  });

  return {
    store,
    createNote,
    updateNote,
    deleteNote,
    setActiveNoteId,
  };
};

export const useNotes = () => {
  return useContext(NotesContext);
};
