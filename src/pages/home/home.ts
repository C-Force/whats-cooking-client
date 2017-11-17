import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController, IonicPage, Loading, LoadingController, ModalController, AlertController } from 'ionic-angular';
import {
  StackConfig,
  DragEvent,
  Direction,
  SwingCardComponent,
  SwingStackComponent,
} from 'angular2-swing';
import { MenuProvider } from '../../providers/menu/menu';
import { AuthProvider } from '../../providers/auth/auth';
import { Dish, DishDetail, User } from '../../providers/models';

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
  cards: Array<Dish | DishDetail> = [];
  list: Array<Dish | DishDetail> = [];
  searchResults: Array<Dish> = null;
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
      this.menu.loadDailyMenu().add(() => {
        this.addNewCards(3).add(() => {
          this.addNewItems().add(() => {
            this.loading.dismiss();
          });
        });
      })
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
    // let color = '';
    // const abs = Math.abs(x);
    // const min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    // const hexCode = this.decimalToHex(min, 2);

    // if (x < 0) {
    //   color = `#FF${hexCode}${hexCode}`;
    // } else {
    //   color = `#${hexCode}FF${hexCode}`;
    // }

    //element.style.background = color;
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
        const serve = this.menu.dailyMenu.find(dish => dish.name === card.name);
        this.cards.push(serve ? serve : card);
        //this.cards.push(card);
      };
      ++this.cardIndex;
    });
  }

  addNewItems(count: number = 10, offset: number = 0) {
    return this.menu.load(this.listIndex, count, offset).subscribe((newItems: Array<Dish>) => {
      for (let item of newItems) {
        const serve = this.menu.dailyMenu.find(dish => dish.name === item.name);
        if (serve) {
          serve.favorited = this.auth.user.favorites
                            .find(dish => dish.name === serve.name) !== undefined;
          this.list.push(serve);
        } else {
          item.favorited = this.auth.user.favorites
          .find(dish => dish.name === item.name) !== undefined;
          this.list.push(item);
        }
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
    this.addNewItems().add(() => {
      infiniteScroll.complete();
    });
  }

  likeDish(dish: Dish, index: number) {
    this.addFavoriteSuccessful(dish);
    this.auth.addFavorite(dish._id).add((user: User) => {
      if (this.searchResults) {
        this.searchResults[index].favorited = true;
      } else {
        this.list[index].favorited = true;
      }
    });
  }

  dislikeDish(dish: Dish, index: number) {
    this.addFavoriteSuccessful(dish);
    this.auth.addFavorite(dish._id).add((user: User) => {
      if (this.searchResults) {
        this.searchResults[index].favorited = false;
      } else {
        this.list[index].favorited = false;
      }
    });
  }

  openPersonal() {
    this.navCtrl.push('PersonalPage');
  }

  getItems(ev: any) {
    const searchText = ev.target.value;
    if (searchText) {
      this.menu.searchDish(searchText).subscribe((results: Dish[]) => {
        results = results.map(result => ({
          ...result,
          favorited: this.auth.user.favorites
          .find(dish => dish.name === result.name) !== undefined,
        }))
        this.searchResults = results;
      })
    } else {
      this.searchResults = null;
    }
  }

}
