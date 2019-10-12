/*
 *     File: example.ts
 *     Project: messenger-bot-pl
 *     Copyright (C) 12/10/2019, 19:31  Mikołaj Bogucki
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this file.  If not, see https://www.gnu.org/licenses/.
 */

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
        app.client.sendMessage(message.threadId, `Przykładowe działanie - odsyłam ID rozmowy (${message.threadId}), na której wysłano wiadomośc oraz parametr: ${params[0]}`);
    }

};

export default command;
