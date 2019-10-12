/*
 *     File: lokaj.ts
 *     Project: 2ib-bot
 *     Copyright (C) 12/10/2019, 21:38  Mikołaj Bogucki, Franciszek Job
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
import {get} from "request";

export interface butlerData {
    butler1: string,
    butler2: string,
}

const command: command = {
    aliases: ["dyżurny", "dyżurni"],
    help: "Pozwala sprawdzić kto jest dyżurnym",
    hidden: false,
    name: "lokaj",
    params: [],
    main(app: MessengerBot, message: Message, params: string[]) {
        try {
            //TODO: Dodać url API
            get('', function (error, response, body) {
                if (error) throw new Error("Nie udało się uzyskać danych na temat dyżurnych");
                if (response.statusCode !== 200) throw new Error(`Serwer zwrócił status ${response.statusCode} zamiast 200`);
                let data: butlerData = JSON.parse(body);
                app.client.sendMessage(message.threadId, `Dyżurni dzisiaj to: ${data.butler1} i ${data.butler2}`);
            });
        } catch (e) {
            app.client.sendMessage(message.threadId, `Wystąpił błąd: ${e.message}`);
        }
    }

};

export default command;
