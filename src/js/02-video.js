
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.getElementById('vimeo-player');

const player = new Player(iframe);

const currentTime = localStorage.getItem('videoplayer-current-time');

if (currentTime) {
  player.setCurrentTime(parseFloat(currentTime));
}

const saveCurrentTime = () => {
  player
    .getCurrentTime()
    .then(time => {
      localStorage.setItem('videoplayer-current-time', time);
    })
    .catch(error => {
      console.error('Error saving current time to localStorage:', error);
    });
};

player.on('timeupdate', throttle(saveCurrentTime, 1000));
