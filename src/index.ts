import Telegraf, { Extra, Markup } from "telegraf";
import fs from "fs";
import { ConfigInterface } from "./config";
import { GameInterface, getGameById, keyboardByGame, OptionInterface } from "./game";

export const config: ConfigInterface = JSON.parse(fs.readFileSync("config.json", {encoding: "utf-8"}));
export const game: { 
  [key: string]: GameInterface
} = JSON.parse(fs.readFileSync("game.json", {encoding: "utf-8"}));

const app = new Telegraf(config.bot_token);

if (!fs.existsSync("session.json")) {
  fs.writeFileSync("session.json", JSON.stringify({}));
}

const session: {
  [chatId: number]: OptionInterface[]
} = JSON.parse(fs.readFileSync("session.json", {encoding:"utf-8"}));

app.start((ctx) => {
  const startGame = getGameById(game, "start");
  const keyboard = keyboardByGame(startGame);

  const chatId = ctx.chat?.id;
  if (chatId === undefined) return;

  session[chatId] = startGame.options;

  ctx.reply(startGame.message, Extra.markup(
    Markup.keyboard(
      [keyboard],
      //{ columns: keyboard.length }
    )
  ))
});

app.on("message", (ctx) => {
  const msg = ctx.message?.text;
  const chatId = ctx.chat?.id;
  
  if (msg !== undefined) {
    const wa = /^[0-9]+/.test(msg) ? /^[0-9]+/.exec(msg):[];

    if (chatId === undefined) return;
    if (session[chatId] === undefined) {
      ctx.reply("Enter /start .");
      return;
    }

    if (wa?.length !== undefined && wa?.length > 0) {
      const num = parseInt(wa[0]);
      if (num > session[chatId].length) return;

      const currentGameId = session[chatId][num-1].to;
      const currentGame = getGameById(game, currentGameId);

      const keyboard = keyboardByGame(currentGame);

      session[chatId] = currentGame.options;
      fs.writeFileSync("session.json", JSON.stringify(session));

      if (currentGame.embed !== undefined) {
        if (currentGame.embed.audio)  ctx.replyWithAudio(currentGame.embed.audio);
        if (currentGame.embed.document)  ctx.replyWithDocument(currentGame.embed.document);
        if (currentGame.embed.photo)  ctx.replyWithPhoto(currentGame.embed.photo);
        if (currentGame.embed.sticker)  ctx.replyWithSticker(currentGame.embed.sticker);
        if (currentGame.embed.video)  ctx.replyWithVideo(currentGame.embed.video);
        if (currentGame.embed.voice)  ctx.replyWithVoice(currentGame.embed.voice);
      }

      ctx.reply(currentGame.message, Extra.markup(
        Markup.keyboard(
          [keyboard],
          { columns: keyboard.length }
        )
      ));
    }
  }
})

app.launch();
