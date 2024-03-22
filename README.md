# Database API

API JSON RESTful che permettono di contattare un database per creare, visualizzare e modificare collezioni di utenti, post e interazioni (commenti e like).

> [!NOTE]
> L'applicazione si appoggia ad un database MongoDB

## Instllazione e test
Per testare l'applicazione è necessario che sul vostro sistema sia intallato nodeJs, il relativo package manager (NPM) ed abbiate accesso ad un database MongoDb.<br>
Una volta scaricato il repository intallare le dipendenza con il comando npm install e creare un file .env con i dati dell'applicazione.<br>

Assicurarsi di aver inserito correttamente i dati nel file .env altrimenti saranno presi i parametri di default:
- URI Database: mongo://localhost:27017
- Indirizzo IP applicazione: localhost
- Porta applicazione: 3000

> [!IMPORTANT]
> Per modificare i parametri dell'applicazione quali URI del database, ip del server e porta da usare bisogna creare un file .env ed inserire i dati (guardare il file di esempio ".env-example")

Una volta installate le dipendenze e creato il file .env, avviare l'applicazione principale app.js con nodeJs.

## Richieste dell'applicazione
- UTENTI:
    - GET /users --> Restituisce tutti gli utenti
    - POST /users --> Crea un nuovo utente
    - DELETE /users/{id} --> Elimina un utente
    - PUT | PATCH /users/{id} --> Modifica un utente
- POSTS:
    - GET /posts --> Restituisce tutti i posts
    - POST /posts --> Crea un nuovo post
    - DELETE /posts/{id} --> Elimina un post
    - PUT | PATCH /posts/{id} --> Modifica un post
- INTERAZIONI:
    - GET posts/{id}/interactions --> Restituisce tutte le interazioni
    - POST posts/{id}/interactions --> Crea una nuova interazione
    - DELETE posts/{id}/interactions/{interactionId} --> Elimina una interazione
    - PUT | PATCH posts/{id}/interactions/{interactionId} --> Modifica una interazione
 
L'applicazione implementa anche una query di ricerca con la quale si possono cercare post per data oppure interazioni per data o città:
- GET /posts?date=yyyy.mm.dd --> Cerca post per data
- GET /posts/{id}/interactions?date=yyyy.mm.dd&city=venice --> Cerca interazioni per data e città

> [!NOTE]
> L'applicazione fornisce di default 100 risultati, per mostrarne di più usare la query "?per_page=50".<br>
> Per cambiare pagina usare la query "?page=1"

> [!TIP]
> La lista dei comandi é consultabile come pagina html alla radice del dominio dell'applicazione (/).
