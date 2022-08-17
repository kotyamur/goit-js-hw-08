import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const onTimeupdate = (data) => {
    const time = data.seconds;
    console.log(time);

    localStorage.setItem(STORAGE_TIME, time);
}
player.on('timeupdate', throttle(onTimeupdate, 1000));

const savedTime = localStorage.getItem(STORAGE_TIME);
if (savedTime) {
  player.setCurrentTime(savedTime);
}
