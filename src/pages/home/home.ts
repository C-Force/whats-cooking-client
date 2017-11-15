import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController, IonicPage, Loading, LoadingController, ModalController, AlertController } from 'ionic-angular';
import {
  StackConfig,
  DragEvent,
  Direction,
  SwingCardComponent,
  SwingStackComponent,
} from 'angular2-swing';
import { MenuProvider, Dish } from '../../providers/menu/menu';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  cardIndex: number = 0;
  listIndex: number = 0;
  cards: Array<Dish> = [];
  list: Array<Dish> = [];
  stackConfig: StackConfig;
  recentCard: string = '';
  loading: Loading = this.loadingCtrl.create();
  toggleView: boolean = false;
  toggleFilter: boolean = false;
  filter: string = 'all';

  constructor(
    private navCtrl: NavController,
    private auth: AuthProvider,
    private menu: MenuProvider,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
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
    this.auth.getToken().then((token: string) => {
      this.menu.setToken(token);
      this.addNewCards(3).add(() => {
        this.addNewItems().add(() => {
          this.loading.dismiss();
        });
      });
    })
  }

  ngAfterViewInit() {
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
  }

  addFavoriteSuccessful(dish: Dish) {
    const alert = this.alertCtrl.create({
      //title: 'Fail',
      subTitle: `You favorited ${dish.name}`,
      buttons: ['Cancel', 'Notify Me'],
    });
    alert.present();
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
    this.addNewCards(1, 3);
    if (like) {
      //this.recentCard = `You disliked: ${removedCard.name}`;
      this.addFavoriteSuccessful(removedCard);
      this.auth.addFavorite(removedCard._id);
    } else {
      //this.addFavoriteSuccessful(removedCard);
      this.recentCard = `You disliked: ${removedCard.name}`;
    }
  }

  addNewCards(count: number = 1, offset: number = 0) {
    return this.menu.load(this.cardIndex, count, offset).subscribe((newCards: Array<Dish>) => {
      for (let card of newCards) {
        this.cards.push(card);
      };
      ++this.cardIndex;
    });
  }

  addNewItems(count: number = 10, offset: number = 0) {
    return this.menu.load(this.listIndex, count, offset).subscribe((newItems: Array<Dish>) => {
      for (let item of newItems) {
        this.list.push(item);
      };
      ++this.listIndex;
    });
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

  openDetail() {
    const modal = this.modalCtrl.create('DishDetailPage', { dishId: this.cards[0]._id });
    modal.present();
  }

  doInfinite(infiniteScroll:any) {
    console.log('Begin async operation');
    this.addNewItems().add(() => {
      console.log('Async operation has ended');
      infiniteScroll.complete();
    });
  }

  likeDish(dish: Dish) {
    this.addFavoriteSuccessful(dish);
    this.auth.addFavorite(dish._id);
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.list = this.list.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
