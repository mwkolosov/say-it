import { MainService } from '../app/services/main.service';
import { observe } from 'rxjs-observe';

export enum EventsName {
    READY,
    USERS_LOAD,
    TWEETS_LOAD,
    TWEETS_UPDATED
}

export class Store {
    private subscribers = new Map<EventsName, ((data?: any) => void)[]>();

    public isReady = false;
    public isSigned = false;
    public toggleMenu = true;
    public users = [];
    public activeUser = [];
    public says = [];
    public saysCount = 0;
    public followersCount = 0;
    public followsCount = 0;
    public token = localStorage.getItem('token');
    public user = this.token ? MainService.parseJwt(this.token) : '';

    constructor() {
        this.init();
    }

    async init() {
        await this.checkIsAuth();
        await this.getUsers();
        await this.getAllTweets();

        console.log('[APP][Store]', this.users);
        console.log('[APP][Store]', this.says);

        this.isReady = true;
        this.call(EventsName.READY);
        if (window.screen.width >= 1024) {
            this.toggleMenu = false;
            console.log('togggle', this.toggleMenu);
        }
    }

    on(event: EventsName, callback: (data?) => void) {
        if (!this.subscribers.get(event)) {
            this.subscribers.set(event, []);
        }
        this.subscribers.get(event).push(callback);
    }

    call(event: EventsName, data?: any) {
        console.log(`[APP] Evented: ${EventsName[event]}`);
        const subscribers = this.subscribers.get(event);
        if (subscribers) {
            subscribers.forEach((callback) => callback(data));
        }
    }

    toggleEvent() {
        this.toggleMenu = !this.toggleMenu;
        console.log(this.toggleMenu);
    }

    checkIsAuth() {
        console.log('[APP] Checking auth...');
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem('token');
            if (!token) {
                this.isSigned = false;
                return resolve(false);
            }

            setTimeout(() => {
                this.isSigned = true;
                resolve(true);
            });
        });
    }

    getUsers() {
        return new Promise((resolve) => {
            fetch('https://say-it-twitter.herokuapp.com/api/users/all', {
                method: 'GET'
            })
            .then(async (response) => {
                if (response.status !== 200) {
                throw (await response.text());
                }
                return response.json();
            })
            .then((msg) => {
                msg.forEach((user) => this.users.push(user));
                this.call(EventsName.USERS_LOAD);
                resolve();
            });
            console.log('[APP] Loading users...');
        });
    }

    getUserName(userId) {
        let userName = 'Unknown';
        this.users.forEach((user) => {
            if (user._id === userId) {
                userName = user.firstName + ' ' + user.lastName;
            }
        });
        return userName;
    }

    getUserLogin(userId) {
        let userLogin = 'Unknown';
        this.users.forEach((user) => {
            if (user._id === userId) {
                userLogin = user.userName;
            }
        });
        return userLogin;
    }

    getNumberOfSays(userId) {
        let saysCount = 0;
        this.users.forEach((user) => {
            if (user._id === userId) {
                saysCount = user.numberOfTweets;
            }
        });
        return saysCount;
    }

    getNumberOfFollowers(userId) {
        let followersCount = 0;
        this.users.forEach((user) => {
            if (user._id === userId) {
                followersCount = user.numberOfFollowers;
            }
        });
        return followersCount;
    }

    getNumberOfFollows(userId) {
        let followsCount = 0;
        this.users.forEach((user) => {
            if (user._id === userId) {
                followsCount = user.numberOfFollowings;
            }
        });
        return followsCount;
    }

    getCurrentUserName() {
        if (this.user) {
            console.log('1111111', this.user);
            return this.getUserLogin(this.user._id);
        }
    }

    getCurrentUserFirstLastName() {
        if (this.user) {
            console.log('1111111', this.user);
            return this.getUserName(this.user._id);
        }
    }

    getNumberOfSaysOfCurrentUser() {
        if (this.user) {
            return this.getNumberOfSays(this.user._id);
        }
    }

    getCurrentUserPhoto() {
        if (this.user) {
            return this.getUserPhoto(this.user._id);
        }
    }

    getUserPhoto(userId) {
        let userPhoto = '/';
        this.users.forEach((user) => {
            if (user._id === userId) {
                userPhoto = user.profilePhoto;
            }
        });
        return userPhoto;
    }

    getAllTweets() {
        console.log('[APP] Loading tweets...', this.says);
        const requests = this.users.map((user) => this.getUserTweets(user._id));
        return Promise.all(requests).then(() => this.call(EventsName.TWEETS_LOAD, this.says));
    }

    getUserTweets(userId) {
        return new Promise((resolve) => {
            fetch('https://say-it-twitter.herokuapp.com/api/tweets/all/' + userId, {
                method: 'GET',
                headers: {
                    'content-type' : 'application/json'
                },
            })
            .then(async (response) => {
                if (response.status !== 200) {
                    throw (await response.text());
                }
                return response.json();
            })
            .then((msg) => {
                msg.forEach((say) => this.says.push(say));
                resolve();
            });
        });
    }

    getAllTweetsOfCurrentUser() {
        const tweets = [];
        const token = localStorage.getItem('token');
        const user = token ? MainService.parseJwt(token) : '';

        if (user) {
            this.says.forEach((say) => {
                if (say.user._id === user._id) {
                    tweets.push(this.translateSay(say));
                }
            });
        }
        return tweets;
    }

    getAllSays() {
        const tweets = [];

        this.says.forEach((say, users) => {
            tweets.push(this.translateSay(say));
        });
        return tweets;
    }

    translateSay(say) {
        if (!say) {
            return;
        }

        const userName = this.getUserName(say.user._id);
        return {
            id: say._id,
            author: userName,
            msg: say.tweetText,
            profilePhoto: say.user.profilePhoto,
            date: new Date(say.creationDate).toLocaleString()
        };
    }

    deleteSay(sayId) {
        fetch('https://say-it-twitter.herokuapp.com/api/tweets/delete/' + sayId, {
          method: 'DELETE',
          // mode: 'no-cors',
          headers: {
            'x-auth-token' : localStorage.getItem('token')
          },
        })
        .then(async (response) => {
            this.says.forEach((say, index) => {
                if (say._id === sayId) {
                    this.says.splice(index, 1);
                }
            });
            this.call(EventsName.TWEETS_UPDATED, this.says);
        });
    }
}

export const store = new Store();
