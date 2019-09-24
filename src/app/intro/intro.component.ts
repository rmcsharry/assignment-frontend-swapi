import {Component, OnInit, Renderer2, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  @ViewChild('audioOption', null) audioPlayerRef: ElementRef;

  constructor(
    private _renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit() {
    this.audioPlayerRef.nativeElement.play();
    setTimeout(() => this.goNext(), 1000 * 98);
  }

  onSkip(event: Event) {
    this._renderer.removeClass(document.body, 'intro');
    this.goNext();
  }

  goNext() {
    this.audioPlayerRef.nativeElement.pause();
    this.router.navigate(['people']);
  }

}
