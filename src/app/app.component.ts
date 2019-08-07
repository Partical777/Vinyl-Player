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
        videoId: 'SQorLsOiu34',
        playerVars: {'autoplay': 1, 'controls': 2},
        events: {
          'onReady': this.onPlayerReady,
          'onStateChange': () => {
          }
        }
      });
    };
  }

  onPlayerReady(event) {
    event.target.playVideo();
    document.getElementById('player').style.width = "120vh";
    document.getElementById('player').style.height = "68vh";
    document.getElementById('player').style.position = "fixed";
    document.getElementById('player').style.clipPath = "circle(30% at 50% 50%)";
    document.getElementById('player').style.animation = "rotation 10s infinite linear";
  }
  
  
  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  //===============================
  index = 0;
  
  loop = true;

  shuffle = false;

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
