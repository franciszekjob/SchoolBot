/*
 *     File: repo.ts
 *     Project: 2ib-bot
 *     Copyright (C) 13/10/2019, 11:52 Mikołaj Bogucki
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
    aliases: ["github", "url"],
    help: "Wysyła link do kodu źródłowego bota",
    hidden: false,
    name: "repo",
    params: [],
    async main(app: MessengerBot, message: Message, params: string[]) {
        try {
            app.client.sendMessage(message.threadId, "https://github.com/Fiiranek/SchoolBot");
        } catch (e) {
            app.client.sendMessage(message.threadId, `Wystąpił błąd: ${e.message}`);
        }
    }

};

export default command;
