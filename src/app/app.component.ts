import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  constructor(public sanitizer: DomSanitizer){}

  player;

  loop = true;
  shuffle = false;

  volumn = 50;
  time = 0;


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
          'onStateChange': () => {
          }
        }
      });
    };
  }

  onPlayerReady(event) {
    event.target.loadPlaylist({list : "PLxySa8Rx-er9SUSOEbDh1KwguS2y9BL_D", index : 0});
    document.getElementById('player').style.width = "120vh";
    document.getElementById('player').style.height = "68vh";
    document.getElementById('player').style.position = "fixed";
    document.getElementById('player').style.clipPath = "circle(30% at 50% 50%)";
    document.getElementById('player').style.animation = "rotation 10s infinite linear";
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

  getCurrentTime() {
    this.time = this.player.getCurrentTime()/this.player.getDuration()*100;
  }
  changeCurrentTime(time){
    this.player.seekTo(time / 100 * this.player.getDuration());
    this.time = this.player.getCurrentTime()/this.player.getDuration()*100;
    console.log(this.player.getCurrentTime()/this.player.getDuration()*100);
  }

  //===============================
  index = 0;
  
  

  Playlist = 'https://www.youtube.com/playlist?list=PLxySa8Rx-er9SUSOEbDh1KwguS2y9BL_D';

  PlaylistURL = "https://www.youtube.com/embed/videoseries?list=PLxySa8Rx-er_crWm9uz9ETLVrPMpFBuX8&index=77&autoplay=0&loop=1&cc_load_policy=0&controls=0&iv_load_policy=3&modestbranding=1&showinfo=0&autohide=1";

  GenerateURL(){
    let res = this.Playlist.slice(38);
    this.PlaylistURL = "https://www.youtube.com/embed/videoseries?list=" + res + "&autoplay=1&cc_load_policy=0&controls=0&iv_load_policy=3&modestbranding=1&showinfo=0&autohide=1";
    
    this.PlaylistURL += this.loop ? "&loop=1" : "&loop=0";
    
    //shuffle
    // this.PlaylistURL += "&index=" + this.index;
  }
  
}
