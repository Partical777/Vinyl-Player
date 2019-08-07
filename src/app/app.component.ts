import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  constructor(public sanitizer: DomSanitizer){}

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
