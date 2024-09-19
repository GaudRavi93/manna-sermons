import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoId: string;
  @Input() startTime: number;
  @Input() showSkipTime: boolean;
  @Input() excerpts: any;
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

  public skipSections: {label: string, time: number, start_time: string}[] = [];
  
  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.excerpts && this.excerpts.length > 0) {
      this.setSkipSections();
    }
    
  }

  public skipIntro() {
  }

  public skipToSection(time: number) {
      this.player.seekTo(time);
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

  private setSkipSections() {
     if (this.excerpts && this.excerpts.length > 0) {
      this.skipSections = this.excerpts.map(excerpt => ({
        label: excerpt.title,
        time: excerpt.start_time,
        start_time: excerpt.formatted_start_time
      }));
      this.cdr.detectChanges();
    }
  }

  formatTime(value: number) {
    const minutes = Math.floor(value);
    const seconds = Math.floor((value - minutes) * 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  public getThumbnailUrl(): string {
    return `https://img.youtube.com/vi/${this.videoId}/0.jpg`;
  }
}
