import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { Header } from '~/components/header/header';
import { Sidebar } from '~/components/sidebar/sidebar';
import { useNotesProvider } from '~/hooks/use-notes';
import styles from './styles.css?inline';

export default component$(() => {
  useStyles$(styles);
  useNotesProvider();

  return (
    <div class="app-layout">
      <Header />
      <div class="main-wrapper">
        <Sidebar />
        <main class="main-content">
          <Slot />
        </main>
      </div>
    </div>
  );
});
