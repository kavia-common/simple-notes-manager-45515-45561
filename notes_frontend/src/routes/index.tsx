import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { NoteEditor } from "~/components/note-editor/note-editor";

export default component$(() => {
  return <NoteEditor />;
});

export const head: DocumentHead = {
  title: "Qwik Notes",
  meta: [
    {
      name: "description",
      content: "A simple notes app built with Qwik.",
    },
  ],
};
