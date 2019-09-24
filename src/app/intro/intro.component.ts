import {Component, OnInit, Renderer2, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from '../services/page.service';

@Component({
  selector: 'sw-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  @ViewChild('audioOption', null) audioPlayerRef: ElementRef;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.pageService.setPageTitle("Patience padwan. The intro is only 90s!");
    this.audioPlayerRef.nativeElement.play();
    setTimeout(() => this.goNext(), 1000 * 95.5);
  }

  onSkip(event: Event) {
    this.goNext();
  }

  goNext() {
    this.renderer.removeClass(document.body, 'intro');
    this.audioPlayerRef.nativeElement.pause();
    this.router.navigate(['characters']);
  }

}
