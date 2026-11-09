import React from 'react';
import styles from './to-do.module.css'
import { Sidebar } from '@/src/components/ui/sidebar/sidebar';

export default function ToDoPage() {
  return (
    <main>
      <Sidebar />
      <header>
        <div>
          <h1>To-Do List</h1>
          <h2>*Nome do Projeto*</h2>
        </div>
        <div>
          <button>Tickets</button>
          <button>Trocar Projeto</button>
        </div>
      </header>

      <section>
        
      </section>
    </main>
  );
}