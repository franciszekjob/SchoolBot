/*
 *     File: MessengerBot.ts
 *     Project: messenger-bot-pl
 *     Copyright (C) 12/10/2019, 18:58  Mikołaj Bogucki
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

import {Client} from 'libfb';
import {login, password} from '../../config';
import * as fs from 'fs';
import * as path from 'path';
import {Message} from "libfb/dist";
import Command, {command, CommandStoreVersion} from "./Command";

export default class MessengerBot {
    private login: string;
    private password: string;
    public readonly client: Client;
    public commands: CommandStoreVersion[] = [];
    private actionsStore: { [name: string]: number } = {};
    private functionsStore: {[id: number]: Function} = {};
    public readonly prefix: string;


    constructor(login: string, password: string, prefix: string) {
        this.login = login;
        this.password = password;
        this.prefix = prefix;
        this.client = new Client();
    }

    public InitialiseCommands(base: string) {
        let rawCommands = fs.readdirSync(base);
        console.time("Initialised in");
        for (let command of rawCommands) {
            if (!fs.statSync(path.join(base, command)).isDirectory()) {
                let importedCommand : command = require(path.join(base, command)).default;
                let cmdId = Number(String(Date.now()) + String(Math.round(Math.random() * 1000)));
                this.functionsStore[cmdId] = importedCommand.main;
                this.commands.push(Command.GenerateStoreVersion(importedCommand, cmdId));
                for (let action of Command.GetActionsList(importedCommand)) {
                    this.actionsStore[action] = cmdId;
                }
            }
        }
        console.timeEnd("Initialised in");
    }

    public Start() {
        let client = this.client;

        client.login(login, password).then(() => {
            console.log(`Logged in as ${login}`);
        });

        client.on('message', async message => {
            if (!message.message.startsWith(this.prefix)) return;
            const base = message.message.trim().slice(this.prefix.length);
            const command = base.split(" ")[0];
            const params = base.split(" ").slice(1);
            if (!this.actionsStore[command]) {
                return this.respond(message, `Nie znam takiej komendy: ${command}`)
            } else {
                this.functionsStore[this.actionsStore[command]](this, message, params);
            }
        });
    }

    private async respond(message: Message, text: string) {
        return this.client.sendMessage(message.threadId, text);
    }

}
