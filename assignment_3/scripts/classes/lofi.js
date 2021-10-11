class Lofi {
    #lofi_song;
    #all_lofi_songs;
    #lofi_songs_count;

    constructor() {
        this.#lofi_songs_count = 1;
        this.#all_lofi_songs = new Array(this.#lofi_songs_count);
        this.#all_lofi_songs[0] = loadSound('assets/barradeen-bedtime-after-a-coffee.mp3');
    }

    load_song() {
        let random_index = Math.floor(Math.random() * this.#lofi_songs_count);
        this.#lofi_song = this.#all_lofi_songs[random_index];
    }

    get current_track() {
        return this.#lofi_song;
    }
}

/* Song attributions

bedtime after a coffee by Barradeen | https://soundcloud.com/barradeen/
Creative Commons Attribution-ShareAlike 3.0 Unported
https://creativecommons.org/licenses/by-sa/3.0/deed.en_US
Music promoted by https://www.chosic.com/free-music/all/


*/