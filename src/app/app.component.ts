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

  Playlist = 'https://www.youtube.com/embed/videoseries?list=PLxySa8Rx-er_crWm9uz9ETLVrPMpFBuX8';

  PlaylistURL = "https://www.youtube.com/embed/videoseries?list=PLxySa8Rx-er_crWm9uz9ETLVrPMpFBuX8&index=77&autoplay=0&loop=1&cc_load_policy=0&controls=0&iv_load_policy=3&modestbranding=1&showinfo=0&autohide=1";

  GenerateURL(){
    this.PlaylistURL = this.Playlist + "&autoplay=&cc_load_policy=0&controls=0&iv_load_policy=3&modestbranding=1&showinfo=0&autohide=1";
    
    this.PlaylistURL += this.loop ? "&loop=1" : "&loop=0";
    this.PlaylistURL += "&index=" + this.index;
  }
  
}
