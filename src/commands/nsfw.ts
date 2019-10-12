/*
 *     File: nsfw.ts
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

import {Message} from "libfb/dist";
import MessengerBot from "../App/MessengerBot";
import {command} from "../App/Command";
import {get} from "request";
import * as fs from "fs";
import NekosCli = require('nekos.life');
const {nsfw} = new NekosCli();

async function getImageUrl(type: string) {
    try {
        switch (type) {
            case 'randomhentaigif':
                return (await nsfw.randomHentaiGif()).url;
            case 'pussy':
                return (await nsfw.pussy()).url;
            case 'nekogif':
                return (await nsfw.nekoGif()).url;
            case 'neko':
                return (await nsfw.neko()).url;
            case 'lesbian':
                return (await nsfw.lesbian()).url;
            case 'kuni':
                return (await nsfw.kuni()).url;
            case 'cumsluts':
                return (await nsfw.cumsluts()).url;
            case 'classic':
                return (await nsfw.classic()).url;
            case 'boobs':
                return (await nsfw.boobs()).url;
            case 'bj':
                return (await nsfw.bJ()).url;
            case 'anal':
                return (await nsfw.anal()).url;
            case 'avatar':
                return (await nsfw.avatar()).url;
            case 'yuri':
                return (await nsfw.yuri()).url;
            case 'trap':
                return (await nsfw.trap()).url;
            case 'tits':
                return (await nsfw.tits()).url;
            case 'girlsologif':
                return (await nsfw.girlSoloGif()).url;
            case 'girlsolo':
                return (await nsfw.girlSolo()).url;
            case 'smallboobs':
                return (await nsfw.smallBoobs()).url;
            case 'pussywankgif':
                return (await nsfw.pussyWankGif()).url;
            case 'pussyart':
                return (await nsfw.pussyArt()).url;
            case 'kemonomimi':
                return (await nsfw.kemonomimi()).url;
            case 'kitsune':
                return (await nsfw.kitsune()).url;
            case 'keta':
                return (await nsfw.keta()).url;
            case 'holo':
                return (await nsfw.holo()).url;
            case 'holoero':
                return (await nsfw.holoEro()).url;
            case 'hentai':
                return (await nsfw.hentai()).url;
            case 'futanari':
                return (await nsfw.futanari()).url;
            case 'femdom':
                return (await nsfw.femdom()).url;
            case 'feetgif':
                return (await nsfw.feetGif()).url;
            case 'erofeet':
                return (await nsfw.eroFeet()).url;
            case 'feet':
                return (await nsfw.feet()).url;
            case 'ero':
                return (await nsfw.ero()).url;
            case 'erokitsune':
                return (await nsfw.eroKitsune()).url;
            case 'erokemonomimi':
                return (await nsfw.eroKemonomimi()).url;
            case 'eroneko':
                return (await nsfw.eroNeko()).url;
            case 'eroyuri':
                return (await nsfw.eroYuri()).url;
            case 'cumarts':
                return (await nsfw.cumArts()).url;
            case 'blowjob':
                return (await nsfw.blowJob()).url;
            case 'pussygif':
                return (await nsfw.pussyGif()).url;
            default:
                return undefined;
        }
    }catch (e) {
        throw e;
    }
}


const help: command = {
    aliases: ['n'],
    params: ["typ"],
    help: "Wysyła obrazek wybranego typu, lista wszystkich typów dostępna tutaj: https://fedox.pl/files/2ibBot/nsfw.pdf",
    hidden: false,
    name: "nsfw",

    async main(app: MessengerBot, message: Message, params: string[]) {


        let fileURL: string;

        if (!params[0]) {
            return app.client.sendMessage(message.threadId, `Musisz podać parametr, aby dowiedzieć się więcej wpisz !help nsfw`)
        }else {
            fileURL = await getImageUrl(params[0]);
        }
        if (fileURL === undefined) {
            await app.client.sendMessage(message.threadId, `Nieprawidłowy parametr ${params[0]}, aby poznać dostępne opcje wpisz !help nsfw`)
        } else {
            try {
                let imgName = Date.now();
                let filePath = './' + imgName;
                get(fileURL, {encoding: 'binary'}, async function (error, response, body) {
                    if (error) throw error;
                    fs.writeFileSync(filePath, body, 'binary');
                    app.client.sendAttachmentFile(message.threadId, filePath).then(() => {
                        fs.unlinkSync(filePath);
                    });
                });

            } catch (e) {
                app.client.sendMessage(message.threadId, `Coś poszło nie tak podczas wywoływania komendy ${message.message}`);
            }
        }
    }

};


export default help;

