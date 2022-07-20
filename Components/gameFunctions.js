export const toMMSS = function (sec) {
  var sec_num = parseInt(sec, 10); // don't forget the second param
  var minutes = Math.floor(sec_num / 60);
  var seconds = sec_num - minutes * 60;


  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
};