import { InputFile } from "telegraf/typings/telegram-types";

export type GameInterface = SelectionInterface | InfoInterface;

export interface EmbedInterface {
  audio?: InputFile;
  document?: InputFile;
  photo?: InputFile;
  sticker?: InputFile;
  video?: InputFile;
  voice?: InputFile;
}

export interface SelectionInterface {
  type: "selection";
  message: string;
  embed: EmbedInterface;
  options: OptionInterface[];
}

export interface InfoInterface {
  type: "info";
  message: string;
  embed: EmbedInterface;
  options: OptionInterface[];
}

export interface OptionInterface {
  name: string;
  to: keyof GameInterface;
}

export function getGameById(game: { [key: string]: GameInterface }, id: string): GameInterface {
  return game[id];
}

export function keyboardByGame(game: GameInterface) {
  const keyboard = [];
  for (let i = 0; i < game.options.length; i++) {
    keyboard.push((i+1)+". "+game.options[i].name);
  }

  return keyboard;
}
