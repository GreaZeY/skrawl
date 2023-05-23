import { importAll } from "../lib/utils";


// GAME CONSTANTS
export const ROUND_TIME = 2  //in Minutes


export const skrawlAvatars = importAll(
  require.context("../public/avatars", false, /\.(png|jpe?g|svg)$/)
);
