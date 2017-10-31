import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController, IonicPage, Loading, LoadingController } from 'ionic-angular';
import {
  StackConfig,
  DragEvent,
  Direction,
  SwingCardComponent,
  SwingStackComponent,
} from 'angular2-swing';
import { MenuProvider, Dish } from '../../providers/menu/menu';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  count: number = 0;
  cards: Array<Dish> = [];
  stackConfig: StackConfig;
  recentCard: string = '';
  loading: Loading = this.loadingCtrl.create();
  toggle: boolean = false;

  constructor(
    public navCtrl: NavController,
    private menu: MenuProvider,
    private loadingCtrl: LoadingController,
  ) {
    this.stackConfig = {
      allowedDirections: [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT],
      throwOutConfidence: (offsetX: number, offsetY: number, element: HTMLElement) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: d => 800,
    };
  }

  ionViewDidLoad() {
    this.loading.present();
    this.menu.load().add(data => {
      this.addNewCards(3);
      this.loading.dismiss();
    });
  }

  ngAfterViewInit() {
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
  }

  onItemMove(element, x, y, r) {
    let color = '';
    const abs = Math.abs(x);
    const min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    const hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      color = `#FF${hexCode}${hexCode}`;
    } else {
      color = `#${hexCode}FF${hexCode}`;
    }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  voteUp(like: boolean) {
    const removedCard = this.cards.shift();
    this.addNewCards(1);
    if (like) {
      this.recentCard = `You liked: ${removedCard.name}`;
    } else {
      this.recentCard = `You disliked: ${removedCard.name}`;
    }
  }

  addNewCards(count: number) {
    const newCards = this.menu.getTodayMenu().slice(this.count, this.count + count);
    for (let card of newCards) {
      this.cards.push(card);
    };
    this.count += count;
  }

  decimalToHex(d, padding): string {
    let hex = Number(d).toString(16);
    const tmpPadding = typeof(padding) === 'undefined' || padding === null ? padding = 2 : padding;

    while(hex.length < tmpPadding) {
      hex = `0${hex}`;
    }

    return hex;
  }

  trackByCards(index: number, card: Dish) {
    return card.name;
  }

  toggleActive() {
    this.toggle = !this.toggle;
  }
}
