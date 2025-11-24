import { component$, useStyles$ } from '@builder.io/qwik';
import styles from './header.css?inline';

export const Header = component$(() => {
  useStyles$(styles);

  return (
    <header class="header">
      <div class="logo">
        <h1>Qwik Notes</h1>
      </div>
    </header>
  );
});
