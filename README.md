
Aplicação web interativa que simula uma rede profissional voltada ao futuro do trabalho. Desenvolvida com **HTML + React + Tailwind CSS** (SPA, Vite).

# Funcionalidades
- Listagem de profissionais (cards com nome, foto, cargo e skills).
- **Modal** com dados completos: pessoais, acadêmicos, experiências, hard/soft skills, hobbies, projetos, certificações e idiomas.
- Ações no modal:
  - **Recomendar profissional** (contagem persistida no `localStorage`).
  - **Enviar mensagem** (formulário simples; mensagens salvas no `localStorage`).
- **Busca e filtros** por **área**, **cidade** e **tecnologia**.
- **Dark Mode** (persistência em `localStorage`).
- **Integração com JSON local** (`public/data/profissionais.json`) com **60 perfis** simulados.
- Design moderno e responsivo com Tailwind.
- Estrutura preparada para **repositório** e **deploy**.

# Como rodar localmente
1. Tenha **Node.js 18+** instalado.
2. Dentro da pasta do projeto, instale as dependências:
   ```bash
   npm install
   ```
3. Rode em desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse a URL impressa no terminal (ex.: `http://localhost:5173`).

