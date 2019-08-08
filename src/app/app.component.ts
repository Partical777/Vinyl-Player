import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  constructor(public sanitizer: DomSanitizer){}

  player;
  subscription: Subscription;

  loop = true;
  shuffle = false;

  volumn = 50;
  time = 0;



  Playlist = 'https://www.youtube.com/playlist?list=PLxySa8Rx-er9SUSOEbDh1KwguS2y9BL_D';
  PlaylistID = "PLxySa8Rx-er9SUSOEbDh1KwguS2y9BL_D";
  GenerateURL(){
    this.PlaylistID = this.Playlist.slice(38);
    this.player.loadPlaylist({list : this.PlaylistID, index : 0});
  }



  ngAfterViewInit() {
    const doc = (<any>window).document;
    let playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApiScript);
  }

  ngOnInit() {
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('player', {
        border: '5px solid red',
        height: '390',
        width: '640',
        playerVars: {
          'autoplay': 1, 
          'controls': 2
          },
        events: {
          'onReady': this.onPlayerReady,
          'onStateChange': this.onPlayerStateChange
        }
      });
    };

    const source = interval(2000);
    this.subscription = source.subscribe(val => this.getTimeTimely());
  }

  onPlayerReady(event) {
    event.target.loadPlaylist({list : "PLxySa8Rx-er9SUSOEbDh1KwguS2y9BL_D", index : 0});
    document.getElementById('player').style.width = "120vh";
    document.getElementById('player').style.height = "68vh";
    document.getElementById('player').style.position = "fixed";
    document.getElementById('player').style.clipPath = "circle(30% at 50% 50%)";
    document.getElementById('player').style.animation = "rotation 10s infinite linear";
  }

  
  onPlayerStateChange(event) {
    if (event.data == -1) {
      //when music started, load the duration to animation of arm
      document.getElementById('arm-image').style.animation = "rotation2 " + event.target.getDuration() + "s infinite linear";
    }
  }
  



  
  playVideo() {
    this.player.playVideo();
    document.getElementById('player').style.animationPlayState = "running";
  }

  pauseVideo() {
    this.player.pauseVideo();
    document.getElementById('player').style.animationPlayState = "paused";
  }

  nextVideo() {
    this.player.nextVideo();
  }

  previousVideo() {
    this.player.previousVideo();
  }

  loopSet() {
    this.loop = !this.loop;
    this.player.setLoop(this.loop);
  }

  shuffleSet() {
    this.shuffle = !this.shuffle;
    this.player.setShuffle(this.shuffle);
  }

  changeVolumn() {
    this.player.setVolume(this.volumn);
  }

  getTimeTimely() {
    this.time = this.player.getCurrentTime()/this.player.getDuration()*100;
  }
  
  changeCurrentTime(time){
    this.player.seekTo(time / 100 * this.player.getDuration());
    this.time = this.player.getCurrentTime()/this.player.getDuration()*100;
    console.log(this.player.getCurrentTime()/this.player.getDuration()*100);
  }
  
}
