# Clipboard to QR Code Chrome Extension

Eine Chrome-Erweiterung, die Text aus der Zwischenablage in QR-Codes umwandelt und das QR-Bild automatisch zurück in die Zwischenablage kopiert.

![Logo](logo-128.png)

## Funktionen

- Liest automatisch den Text aus der Zwischenablage beim Öffnen der Erweiterung
- Generiert mit einem Klick einen QR-Code aus dem Zwischenablage-Inhalt
- Kopiert den generierten QR-Code als Bild zurück in die Zwischenablage, bereit zum Einfügen in andere Anwendungen
- Arbeitet komplett lokal ohne Internetverbindung oder externe Server
- Benutzerfreundliche Statusmeldungen und Fehlerbehandlung

## Installation

### Methode 1: Installation über GitHub

1. Klonen oder laden Sie dieses Repository herunter
2. Öffnen Sie Chrome und navigieren Sie zu `chrome://extensions/`
3. Aktivieren Sie den "Entwicklermodus" mit dem Schalter in der oberen rechten Ecke
4. Klicken Sie auf "Entpackte Erweiterung laden"
5. Wählen Sie den Ordner mit den heruntergeladenen Dateien aus

### Methode 2: Installation über die Paketdatei

1. Laden Sie die neueste Version als `.tar.gz`-Datei herunter (aus dem `dist`-Ordner)
2. Entpacken Sie die Datei in einen Ordner
3. Folgen Sie den Schritten 2 bis 5 aus Methode 1

## Verwendung

1. Kopieren Sie einen Text in Ihre Zwischenablage (Strg+C oder Cmd+C)
2. Klicken Sie auf das Erweiterungs-Symbol in der Chrome-Toolbar
3. Sie sehen den Inhalt Ihrer Zwischenablage im Popup-Fenster 
4. Klicken Sie auf "Get QR"
5. Ein QR-Code wird generiert und automatisch in Ihre Zwischenablage kopiert
6. Sie können diesen QR-Code nun überall einfügen (Strg+V oder Cmd+V), wo Bilder erlaubt sind

## Berechtigungen

Diese Erweiterung benötigt Zugriff auf die Zwischenablage, um:
- Den aktuellen Inhalt zu lesen und als QR-Code darzustellen
- Den generierten QR-Code zurück in die Zwischenablage zu schreiben

## Technische Details

- Verwendet das Chrome Extension Manifest V3
- Nutzt Service Workers im Hintergrund für zuverlässigen Zugriff auf die Zwischenablage
- Nutzt HTML Canvas zum Konvertieren des QR-Codes in ein Bild
- Basiert auf der qrcode-generator Bibliothek zur Erstellung von QR-Codes
- Enthält benutzerfreundliche Fehlerbehandlung mit klaren Meldungen

## Problembehandlung

Falls Sie auf Probleme beim Zugriff auf die Zwischenablage stoßen:

1. Stellen Sie sicher, dass Sie die Berechtigungsanfrage zur Nutzung der Zwischenablage akzeptiert haben
2. Klicken Sie zuerst irgendwo im Popup-Fenster der Erweiterung, bevor Sie eine Aktion ausführen
3. Bei anhaltenden Problemen: Öffnen Sie Chrome DevTools für die Erweiterung, indem Sie mit der rechten Maustaste auf das Erweiterungssymbol klicken und "Untersuchen" auswählen

## Mitwirken

Beiträge sind willkommen! Bitte öffnen Sie ein Issue oder einen Pull Request, wenn Sie Verbesserungen vorschlagen möchten.

## Lizenz

MIT