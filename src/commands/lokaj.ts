/*
 *     File: lokaj.ts
 *     Project: 2ib-bot
 *     Copyright (C) 12/10/2019, 21:23  Mikołaj Bogucki, Franciszek Job
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


const command: command = {
    aliases: ["dyżurny", "dyżurni"],
    help: "Pozwala sprawdzić kto jest dyżurnym",
    hidden: false,
    name: "lokaj",
    params: [],
    main(app: MessengerBot, message: Message, params: string[]) {
        get('', function () {

        })
    }

};

export default command;
