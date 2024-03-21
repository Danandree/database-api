# API RESTful
Applicazione che permette di contattare un database grazie alla chiamate rest per creare collezioni di utenti, post e interazioni (commenti e like).

> [!IMPORTANT]
> L'applicazione si appoggia ad un database MongoDB

## Instllazione e test
Per testare l'applicazione è necessario che sul vostro sistema sia intallato nodeJs, il relativo package manager (NPM) ed abbiate accesso ad un database MongoDb.<br>
Una volta scaricato il repository intallare le dipendenza con il comando npm install e lanciare il file app.js.<br>

Assicurarsi di aver inserito correttamente i dati nel file .env altrimenti saranno presi i parametri di default:
- URI Database: mongo:\\localhost:12033
- Indirizzo IP applicazione: localhost
- Porta applicazione: 3000

> [!IMPORTANT]
> Per modificare i parametri dell'applicazione quali URI del database, ip del server e porta da usare bisogna creare un file .env ed inserire i dati (guardare il file di esempio ".env-esempio")
