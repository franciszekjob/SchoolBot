/*
 *     File: Command.ts
 *     Project: 2ib-bot
 *     Copyright (C) 12/10/2019, 21:06  Mikołaj Bogucki, Franciszek Job
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

import MessengerBot from './MessengerBot';
import {Message} from "libfb/dist";

export default class Command {

    public static GenerateStoreVersion(command:command,execID: number): CommandStoreVersion{
        return {
            name: command.name,
            help: command.help,
            aliases: command.aliases,
            hidden: command.hidden,
            execute: execID,
            params: command.params,
        }
    }

    public static GetActionsList(command:command){
        return [...command.aliases, command.name];
    }
}

export interface command {
    name: string;
    help: string;
    aliases: string[];
    hidden: boolean;
    params: string[];
    main(app: MessengerBot, message: Message, params: string[]);
}

export interface CommandStoreVersion {
    name: string;
    help: string;
    execute: number;
    aliases: string[];
    hidden: boolean;
    params: string[];
}
