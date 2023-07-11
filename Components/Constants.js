import { importAll } from "../lib/utils";

// GAME CONSTANTS
export const ROUND_TIME = 2; //in Minutes

export const getSkrawlAvatars = () =>
  importAll(require.context("../public/avatars", false, /\.(png|jpe?g|svg)$/));
