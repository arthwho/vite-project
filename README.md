# **CSI606-2025-01 - Remoto - Proposta de Trabalho Final**

## *Discente: Arthur Silva Ferreira Coelho*

<!-- Descrever um resumo sobre o trabalho. -->

### Resumo

Este projeto se trata de um website onde o usuário pode se comunicar com uma entidade antiga "capaz" de ler o futuro de quem pergunta: A API do Google Gemini. O Oráculo é uma aplicação web interativa que combina autenticação de usuários, interface mística e inteligência artificial para criar uma experiência única de consulta ao futuro.

<!-- Apresentar o tema. -->
### 1. Tema

O tema do trabalho é um chat tipo-GPT com temática mística de oráculo. É utilizado o Firebase para fazer autenticação de usuário e as respostas são feitas através de uma API do Google Gemini, configurada para responder como um oráculo ancestral.

<!-- Descrever e limitar o escopo da aplicação. -->
### 2. Escopo

- **Chat Interativo**: Troca de mensagens com uma entidade vidente através da API Gemini
- **Sistema de Autenticação**: Login com email/senha e conta do Google via Firebase
- **Interface Mística**: Design temático com efeitos visuais (glitter, gradientes)
- **Sistema de Usuários**: Cadastro e gerenciamento de usuários no Firestore
- **Funcionalidades Administrativas**: Comandos especiais para administradores
- **Design Responsivo**: Interface adaptável para diferentes tamanhos de tela
- **Navegação**: Sistema de rotas protegidas com React Router

<!-- Apresentar restrições de funcionalidades e de escopo. -->
### 3. Restrições

- Histórico de mensagens não é persistido
- Acesso limitado a funcionalidades administrativas
- Requer chave de API do Google Gemini para funcionamento

<!-- Construir alguns protótipos para a aplicação, disponibilizá-los no Github e descrever o que foi considerado. //-->
### 4. Protótipo

Protótipos para as páginas foram elaborados e podem ser encontrados em:
- **Página Principal (Entrada)**: Interface de consulta ao oráculo com campo de input
- **Página de Login**: Sistema de autenticação com múltiplas opções
- **Página Sobre**: Informações sobre o oráculo (em desenvolvimento)
- **Navegação**: Menu superior com navegação entre páginas

## 🚀 **Funcionalidades Principais**

### **Sistema de Autenticação**
- Login com email e senha
- Login com Google (OAuth)
- Cadastro de novos usuários
- Rotas protegidas para usuários autenticados
- Sistema de logout

### **Chat com Oráculo**
- Interface de consulta com design místico
- Integração com API Google Gemini
- Respostas personalizadas com temática de oráculo
- Efeitos visuais de glitter animado
- Frases aleatórias de introdução

### **Funcionalidades Administrativas**
- Comandos especiais para administradores (prefixo `\s`)
- Sistema de queries para consultar banco de dados
- Comandos: `list`, `find`, `order`, `limit`
- Acesso restrito por email de administrador

### **Sistema de Banco de Dados**
- Armazenamento de usuários no Firestore
- Estrutura de dados para eventos (preparado para futuras funcionalidades)
- Métodos de consulta e manipulação de dados
- Sincronização em tempo real

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**
- **React 18.2.0** - Framework principal
- **Vite 5.1.6** - Build tool e dev server
- **React Router DOM 6.22.3** - Roteamento
- **Tailwind CSS 3.4.1** - Framework CSS utilitário
- **Flowbite React 0.7.2** - Componentes UI
- **React Icons 5.5.0** - Ícones

### **Backend**
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **CORS** - Middleware para requisições cross-origin
- **dotenv** - Gerenciamento de variáveis de ambiente

### **Serviços Externos**
- **Firebase** - Autenticação e banco de dados
- **Google Gemini API** - Inteligência artificial para respostas
- **Firestore** - Banco de dados NoSQL

### **Ferramentas de Desenvolvimento**
- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS
- **Autoprefixer** - Prefixos CSS automáticos
- **Concurrently** - Execução simultânea de comandos

## 📁 **Estrutura do Projeto**

```
vite-project/
├── src/
│   ├── components/
│   │   ├── Entrada.jsx          # Página principal do oráculo
│   │   ├── Login.jsx            # Sistema de autenticação
│   │   ├── Sobre.jsx            # Página sobre (em desenvolvimento)
│   │   └── GlitterEffect.jsx    # Efeito visual de glitter
│   ├── services/
│   │   ├── auth.js              # Métodos de autenticação
│   │   └── database.js          # Métodos de banco de dados
│   ├── assets/                  # Imagens e recursos
│   ├── App.jsx                  # Componente principal
│   └── main.jsx                 # Ponto de entrada
├── backend/
│   └── server.js                # Servidor Express com API Gemini
├── public/                      # Arquivos estáticos
└── package.json                 # Dependências e scripts
```

## 🔧 **Instalação e Configuração**

### **Pré-requisitos**
- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta Firebase com projeto configurado
- Chave de API do Google Gemini

### **1. Clone o repositório**
```bash
git clone https://github.com/arthwho/vite-project
cd vite-project
```

### **2. Instale as dependências**
```bash
npm install
cd backend && npm install && cd ..
```

### **3. Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
VITE_GEMINI_API_KEY=sua_chave_api_gemini
```

Crie um arquivo `.env` na pasta `backend/`:
```env
GEMINI_API_KEY=sua_chave_api_gemini
PORT=3000
```

### **4. Configure o Firebase**
- Crie um projeto no Firebase Console
- Ative Authentication e Firestore
- Configure as credenciais no arquivo de configuração do Firebase
- Adicione o arquivo de configuração ao projeto

### **5. Execute o projeto**
```bash
# Desenvolvimento (frontend + backend)
npm run dev:all

# Apenas frontend
npm run dev

# Apenas backend
npm run dev:backend
```

## 🎯 **Como Usar**

### **Acesso ao Sistema**
1. Acesse a aplicação no navegador
2. Faça login com email/senha ou conta Google
3. Navegue para a página principal para consultar o oráculo

### **Consultando o Oráculo**
1. Digite sua pergunta no campo de texto
2. Clique em "Perguntar"
3. Aguarde a resposta mística do oráculo

### **Funcionalidades Administrativas**
- Use o prefixo `\s` seguido de comandos especiais
- Exemplos:
  - `\s list users` - Lista todos os usuários
  - `\s find users Email == "user@example.com"`- Busca usuário específico pelo email
  - `\s find users Name == "Example"` - Busca usuário específico pelo nome
  - `\s order users Name asc` - Ordena usuários por nome
  - `\s order users createdAt desc` - Ordena usuários por data de criação
  - `\s limit users 5` - Limita resultados a 5 usuários

  O administrador é configurado manualmente no código.

## 🔒 **Segurança**

- Rotas protegidas para usuários autenticados
- Validação de entrada no backend
- Controle de acesso para funcionalidades administrativas
- Variáveis de ambiente para chaves sensíveis
- CORS configurado para origens específicas

## 🎨 **Design e UX**

- **Tema Místico**: Gradientes roxos e azuis
- **Efeitos Visuais**: Partículas animadas de glitter
- **Responsividade**: Design adaptável para mobile e desktop
- **Componentes UI**: Biblioteca Flowbite para consistência
- **Ícones Temáticos**: Ícones mágicos e místicos

## 🚧 **Funcionalidades Futuras**

- Histórico de consultas
- Sistema de eventos e agendamentos
- Perfis de usuário expandidos
- Temas visuais alternativos
- Sistema de notificações

## 📱 **Compatibilidade**

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: Desktop, tablet e mobile
- **Sistemas**: Windows, macOS, Linux

## 🤝 **Contribuição**

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 **Licença**

Este projeto está sob a licença especificada no arquivo LICENSE.txt

## 👨‍💻 **Autor**

**Arthur Silva Ferreira Coelho**
- GitHub: [arthwho](https://github.com/arthwho)
- LinkedIn: [Arthur Ferreira Coelho](https://www.linkedin.com/in/arthur-ferreira-coelho/)
- Behance: [Arthur Ferreira](https://www.behance.net/arthur-ferreira)

## 📞 **Suporte**

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Entre em contato através do LinkedIn
- Verifique a documentação do Firebase e Google Gemini

---

*Projeto desenvolvido para a disciplina CSI606 - Interface Humano-Computador - UFOP 2025*
