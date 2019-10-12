# Messenger Bot

Prosty bot do messengera, umożliwiający swobodną i wygodną rozbudowę.

## Instalacja

Uruchomienie własnej instancji tego bota i jego dalasza rozbudowa są banalnie proste.

Wymagania:
* NodeJS
* TypeScript
* Konto na Facebook-u
 
Na samym początku kolnujemy repo
```
git clone https://github.com/Fiiranek/SchoolBot.git
```
Później należy zainstalować NodeJS (optymalnie w wersji >= 10). Instalator można pobrać z oficjalnej strony [nodejs.org](https://nodejs.org/en/)

Następnie uruchamiamy CMD z uprawnieniami administratora i instalujemy TypeScript
```
npm install -g typescript
```
Instalujemy moduły
```
npm i
```

Gdy udało się wszystko zainstalować kompilujemy TypeScript do JavaScriptu
```
tsc --project tsconfig.json
```
Uruchamiamy bota
```
node ./build/app
```

## Dodawanie Własnych Komend
Aby dodać własne komendy wystarczy w folderze *commands* tworzyć kolejne pliki `.ts`

### Przykładowa komenda
```typescript
import {command} from "../App/Command";
import MessengerBot from "../App/MessengerBot";
import {Message} from "libfb/dist";

const command: command = {
    aliases: ["sample"], // Aliasy komendy - bot będzie reagował zarówno na name jak i na aliasy
    help: "Jest to przykładowa komenda, której zadaniem jest pokazanie jak mają być zbudowane komendy", // Pomoc dotycząca komendy wyświetlana przez komendę help
    hidden: false, // Czy komenda powinna znajdować się w zbiorze komend wyświetlanych przez help
    name: "example", // Podstawowa nazwa komendy
    params: ["parameter1"], // Parametry, o których ma być informowany użytkownik
    main(app: MessengerBot, message: Message, params: string[]) { // funkcja komendy
        app.client.sendMessage(message.threadId, `Przykładowe działanie - odsyłam ID rozmowy, na której wysłano wiadomośc oraz parametr: ${params[0]}`);
    }

};

export default command;
```
### Szybsze budowanie projektu
Aby zbudować projekt i go uruchomić wystarczy wpisać w terminal `grunt`

Gdy chcemy tylko zbudować projekt wpisujemy `grunt build`

## Logo Poszukiwane
Jeśli chciał(a) byś stworzyć logo do tego bota [dodaj issue](https://bitbucket.org/fedox8/messengerbot-pl/issues/new) i dołącz do niego logo.

Z góry dziękuję :)

## Autorzy

* **Mikołaj Bogucki** ([Fedox](https://fedox.pl))
* **Franciszek Job** ([Firanek](https://firanek.tech/))

## Licencja
Ten projekt jest dostępny na licencji GNU GPL3

```
Copyright (C) 12/10/2019, 19:30 Mikołaj Bogucki

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
```
