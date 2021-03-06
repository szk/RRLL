class Sound {
    constructor() {
    }

    init() {
        this.audio = new Audio;

        if(this.audio.canPlayType)
        {
            var canPlayOgg = ("" != this.audio.canPlayType("audio/ogg"));
            var canPlayMp3 = ("" != this.audio.canPlayType("audio/mpeg"));
            if(canPlayOgg){
                // ogg supported
                this.audio.src = "./sound/test.ogg";
            }
            else if(canPlayMp3)
            {
                // mp3 supported
                this.audio.src = "./sound/test.mp3";
            }
            else
            {
                // no audio
            }
        }
        else
        {
        };
    }

    get_audio() { return this.audio; }
}
