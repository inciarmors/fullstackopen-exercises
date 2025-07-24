sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document with SPA shell
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    Note right of browser: SPA initializes, rendering the app interface without reloading

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa/api/notes (new note data)
    activate server
    server-->>browser: JSON response with saved note
    deactivate server

    Note right of browser: SPA updates UI to display the new note immediately
