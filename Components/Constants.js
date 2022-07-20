import { importAll } from "../lib/utils";

export const skrawlAvatars = importAll(
  require.context("../public/avatars", false, /\.(png|jpe?g|svg)$/)
);

export const ROUND_TIME = 2  //in Minutes