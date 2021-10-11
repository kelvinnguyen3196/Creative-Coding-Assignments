class Lofi {
    #lofi_song;
    #all_lofi_songs;
    #lofi_songs_count;
    #song_index;

    constructor() {
        this.#lofi_songs_count = 14;
        this.#all_lofi_songs = new Array(this.#lofi_songs_count);

        this.#all_lofi_songs[0] = loadSound('assets/Afternoon-Nap-Lofi-Study-Music.mp3');
        this.#all_lofi_songs[1] = loadSound('assets/And-So-It-Begins-Inspired-By-Crush-Sometimes.mp3');
        this.#all_lofi_songs[2] = loadSound('assets/barradeen-bedtime-after-a-coffee.mp3');
        this.#all_lofi_songs[3] = loadSound('assets/Japan-by-uniq.mp3');
        this.#all_lofi_songs[4] = loadSound('assets/liqwyd-coral.mp3');
        this.#all_lofi_songs[5] = loadSound('assets/Merry-Bay-Upbeat-Summer-Lofi.mp3');
        this.#all_lofi_songs[6] = loadSound('assets/Midnight-Stroll-Lofi-Study-Music.mp3');
        this.#all_lofi_songs[7] = loadSound('assets/Morning-Routine-Lofi-Study-Music.mp3');
        this.#all_lofi_songs[8] = loadSound('assets/purrple-cat-calm-waters.mp3');
        this.#all_lofi_songs[9] = loadSound('assets/purrple-cat-equinox.mp3');
        this.#all_lofi_songs[10] = loadSound('assets/purrple-cat-field-of-fireflies.mp3');
        this.#all_lofi_songs[11] = loadSound('assets/purrple-cat-floating-castle.mp3');
        this.#all_lofi_songs[12] = loadSound('assets/purrple-cat-lullaby.mp3');
        this.#all_lofi_songs[13] = loadSound('assets/Still-Awake-Lofi-Study-Music.mp3');
        
        this.#song_index = 0;
    }

    load_song() {
        this.#song_index = Math.floor(Math.random() * this.#lofi_songs_count);
        this.#lofi_song = this.#all_lofi_songs[this.#song_index];
    }

    change_song() {
        this.#lofi_song.pause(); 
        this.#song_index += 1;
        this.#song_index %= this.#lofi_songs_count;
        this.#lofi_song = this.#all_lofi_songs[this.#song_index];
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

Merry Bay by Ghostrifter Official | https://soundcloud.com/ghostrifter-official
Music promoted by https://www.chosic.com/free-music/all/
Creative Commons CC BY-SA 3.0
https://creativecommons.org/licenses/by-sa/3.0/

Equinox by Purrple Cat | https://purrplecat.com/
Music promoted on https://www.chosic.com/free-music/all/
Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
https://creativecommons.org/licenses/by-sa/3.0/

Morning Routine by Ghostrifter Official | https://soundcloud.com/ghostrifter-official
Music promoted by https://www.chosic.com/free-music/all/
Creative Commons CC BY-SA 3.0
https://creativecommons.org/licenses/by-sa/3.0/

And So It Begins by Artificial.Music | https://soundcloud.com/artificial-music/
Licensed under Creative Commons: Attribution 3.0 Unported (CC BY 3.0)
https://creativecommons.org/licenses/by/3.0/
Music promoted by https://www.chosic.com/free-music/all/

Still Awake by Ghostrifter Official | https://soundcloud.com/ghostrifter-official
Music promoted by https://www.chosic.com/free-music/all/
Creative Commons CC BY-SA 3.0
https://creativecommons.org/licenses/by-sa/3.0/

Midnight Stroll by Ghostrifter Official | https://soundcloud.com/ghostrifter-official
Music promoted by https://www.chosic.com/free-music/all/
Creative Commons CC BY-SA 3.0
https://creativecommons.org/licenses/by-sa/3.0/

Afternoon Nap by Ghostrifter Official | https://soundcloud.com/ghostrifter-official
Music promoted by https://www.chosic.com/free-music/all/
Creative Commons CC BY-SA 3.0
https://creativecommons.org/licenses/by-sa/3.0/

Calm Waters by Purrple Cat | https://purrplecat.com/
Music promoted on https://www.chosic.com/free-music/all/
Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
https://creativecommons.org/licenses/by-sa/3.0/

Floating Castle by Purrple Cat | https://purrplecat.com/
Music promoted on https://www.chosic.com/free-music/all/
Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
https://creativecommons.org/licenses/by-sa/3.0/

Coral by LiQWYD | https://soundcloud.com/liqwyd/
Music promoted by https://www.chosic.com/free-music/all/
Licensed under Creative Commons: Attribution 3.0 Unported (CC BY 3.0)
https://creativecommons.org/licenses/by/3.0/

Field Of Fireflies by Purrple Cat | https://purrplecat.com/
Music promoted on https://www.chosic.com/free-music/all/
Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
https://creativecommons.org/licenses/by-sa/3.0/

Japan by Uniq | https://soundcloud.com/uniqofficial/
Music promoted by https://www.chosic.com/free-music/all/
Attribution 4.0 International (CC BY 4.0)
https://creativecommons.org/licenses/by/4.0/

Lullaby by Purrple Cat | https://purrplecat.com/
Music promoted on https://www.chosic.com/free-music/all/
Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
https://creativecommons.org/licenses/by-sa/3.0/

*/