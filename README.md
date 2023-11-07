# nodejs-challenge

## Code Name RED

Herzlichen Glückwunsch, Du erhältst heute unsere Coding Challenge! Weiter unten findest Du die Aufgaben-Stellung.
Alles, was Du (neben NodeJS) brauchst, findest du in diesem Paket.

### Lösung
Vielen Dank für die Challenge. Ich hoffe meine Lösungen sind auch die Richtigen :D
Zum erhalten der Lösungen muss man folgendes Script ausführen:

`npm i; npm run build-source; npm run start`

### Kriterien
1. Es werden nur Lösungen gewertet die mit NodeJS/TypeScript programmiert wurden. 
2. Externe npm module sind nur zur Entwicklung (= devDependencies) gestattet.
3. Zeitansatz max. 4 Stunden
4. Abgabe der Lösung erfolgt als Repository (github oder bitbucket). Du kannst einfach ein Repository anlegen, deine Lösung pushen und
 uns den Link zukommen lassen. Bitte achte darauf, dass das Repository alle zur Ausführung benötigten Dateien und Anweisungen enthält.

### Aufgabe

Gegeben ist eine geheime Datei (-> `secret.enc`), deren Inhalt uns brennend interessiert.
1. Entschlüssele die Datei mit dem Schlüssel `secret.key`. Der Verschlüsselungs-Algorithmus ist AES256-GCM. Alle Dateien, die du hierfür 
   benötigst, findest du im Paket. 
    - Die entschlüsselte Datei ist ein ZIP-Archiv, das noch (programmatisch!) entpackt werden muss. ACHTUNG! Die Datei ist **stark** 
      komprimiert!
    - Die nativen Node-Module sind vollkommen ausreichend, um die Aufgabe zu lösen. Du musst keine weiteren Module installieren.
    - Achte darauf, den Schlüssel als *String der Länge 32* zu verwenden.
    - Die Entschlüsselung ist zentraler Bestandteil dieser Aufgabe. Falls Du die Datei nicht entschlüsselt bekommst, kannst du aber die
     weiteren Aufgaben mit der Datei `clear_smaller.txt` bearbeiten. Der Workflow sollte dabei aber nicht abweichen (löse die Aufgaben 
      2-4 mit der kleinen Datei so, wie wenn du die geheime Datei entschlüsselt und entpackt hättest und weiter verarbeiten würdest).
2. Sag uns wie die Summe aller vorkommenden Ziffern in der Datei aus Aufgabe 1) lautet.
   Beispiel:
   ```
   Text: "D1es 1st 31n Te4t."
   Summe der Ziffern: 1+1+3+1+4 = 10 
   ```
3. Zähle zu der gefundenen Summe aus Aufgabe 2) alle vorkommenden Vokale (in der Datei aus Aufgabe 1) mit folgender Wertigkeit hinzu:  
    a = 2  
    e = 4  
    i = 8  
    o = 16  
    u = 32
4. Berechne für die Datei aus Aufgabe 1 die Summe der Ziffern (vgl. Aufgabe 2) pro Satz (Satz-Trennzeichen wie im deutschen Sprachgebrauch
).      
    
    a) Sortiere die 10 größten Werte in der Reihenfolge ihres Vorkommens im Text in ein Array aus und subtrahiere von jedem Wert dessen
     Index im Array.
    Beispiel: 
    ```
    gefundene Summen: [4, 8, 1, 9, 2, 7, 8]
    größte 3 Werte: [9, 8, 8]
    größte 3 Werte in der Reihenfolge ihres Vorkommens: [8, 9, 8]
    größte 3 Werte in der Reihenfolge ihres Vorkommens abzüglich Index: [8, 8, 6]
    ```
    
    b) Untersuche die Ergebnisse der 10 Werte anhand einer ASCII Tabelle...kommt da etwa ein Lösungswort heraus?
    
    c) Das Lösungswort soll von einem node HTTP-Server als Antwort zurückgegeben werden. Du findest im Paket localhost-Zertifikate
     (`localhost.*`), mit denen du lokal mit https testen kannst.
