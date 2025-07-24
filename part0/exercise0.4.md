# Exercise 0.4: New Note Diagram

This diagram shows the sequence of events when a user creates a new note by typing something into the text field and clicking the Save button on the page https://studies.cs.helsinki.fi/exampleapp/notes.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/notes\n(with new note content)
    activate server
    server-->>browser: Saved note (e.g. JSON with id, content, date)
    deactivate server

    Note right of browser: The browser updates the list of notes\nshowing the new note
