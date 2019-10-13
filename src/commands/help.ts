/*
 *     File: help.ts
 *     Project: 2ib-bot
 *     Copyright (C) 13/10/2019, 11:54 Mikołaj Bogucki
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

import {Message} from "libfb/dist";
import MessengerBot from "../App/MessengerBot";
import {command, CommandStoreVersion} from "../App/Command";
import {find} from 'lodash';

function generateDescriptionString(command: CommandStoreVersion) {
    let aliasesStr: string;
    if (command.aliases.length === 0) {
        aliasesStr = ""
    } else {
        aliasesStr = `| ${command.aliases.join(", ")} | `;
    }
    let paramsStr: string;
    if (command.params.length === 0) {
        paramsStr = "";
    } else {
        paramsStr = "<" + command.params.join("> <") + "> ";
    }
    return {aliasesStr, paramsStr};
}

const help: command = {
    params: ["name"],
    aliases: [],
    help: "Komenda help wyświetla pomoc dotyczącą wszystkich, bądź wybranej komendy",
    hidden: false,
    name: "help",

    main(app: MessengerBot, message: Message, params: string[]) {
        if (!!params[0]) {
            let command = find(app.commands, {name: params[0]});
            let {paramsStr, aliasesStr} = generateDescriptionString(command);
            app.client.sendMessage(message.threadId, `${command.name} ${paramsStr}${aliasesStr}- ${command.help}`);
        } else {
            let tmpStr: string[] = [];
            for (let command of app.commands) {
                let {paramsStr, aliasesStr} = generateDescriptionString(command);
                if (!command.hidden) tmpStr.push(`${command.name} ${paramsStr}${aliasesStr}- ${command.help}`);
            }
            app.client.sendMessage(message.threadId, tmpStr.join("\n\n"));
        }
    }

};


export default help;

