/*
 *     File: app.ts
 *     Project: 2ib-bot
 *     Copyright (C) 12/10/2019, 21:05  Mikołaj Bogucki, Franciszek Job
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

import MessengerBot from "./App/MessengerBot";
import {login, password, prefix} from "../config"
import * as path from 'path';

const App = new MessengerBot(login, password, prefix);
App.InitialiseCommands(path.join(__dirname, './commands'));
App.Start();
