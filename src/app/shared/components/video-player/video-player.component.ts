import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoId: string;
  @Input() startTime: number;
  @Input() showSkipTime: boolean;
  @Input() set refresh (val: number) {
    this.counter = JSON.parse(localStorage.getItem('v-counter') || '0');
    this.counter++;
    localStorage.setItem('v-counter', JSON.stringify(this.counter));
    setTimeout(() => {
      this.initPlayer();
    }, 10);
  }

  public counter: number;
  private player;

  constructor() { }

  ngOnInit() {
  }

  public skipIntro() {
    this.player.seekTo(this.startTime);
    this.player.playVideo();
  }

  private initPlayer() {

    const showPlayer = () => {
      this.player = new (window as any).YT.Player('player-' + this.counter, {
        height: '300',
        width: '100%',
        playerVars: { 'rel': 0, 'origin': 'localhost' },
        videoId: this.videoId,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
      (window as any).pl = this.player;
    };

    const el = document.querySelector('[src="https://www.youtube.com/iframe_api"]');

    if (!el) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      (window as any).onYouTubeIframeAPIReady = () => {
        showPlayer();
      };

    } else {
      setTimeout(() => {
        showPlayer();
      }, 4);

    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      // event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
      if (event.data == (window as any).YT.PlayerState.PLAYING && !done) {
        // setTimeout(stopVideo, 6000);
        done = true;
      }
    }
    function stopVideo() {
      this.player.stopVideo();
    }
  }

}
