/*
 *     File: lucky.ts
 *     Project: 2ib-bot
 *     Copyright (C) 12/10/2019, 23:15  Mikołaj Bogucki, Franciszek Job
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
import {random} from "lodash";

export interface authorityData {
    butler1: string,
    butler2: string,
}

const command: command = {
    aliases: ["ruser", "lucky"],
    help: "Pozwala wylosować jednego z członków grupy / rozmowy",
    hidden: false,
    name: "unlucky",
    params: [],
    async main(app: MessengerBot, message: Message, params: string[]) {
        try {
            let thread = await app.client.getThreadInfo(message.threadId);
            let user = await app.client.getUserInfo(thread.participants[random(0,thread.participants.length-1)].id);
            app.client.sendMessage(message.threadId, `Na kogo wypadnie na tego bęc\nTym razem trafiło na: ${user.name}`);
        } catch (e) {
            app.client.sendMessage(message.threadId, `Wystąpił błąd: ${e.message}`);
        }
    }

};

export default command;
