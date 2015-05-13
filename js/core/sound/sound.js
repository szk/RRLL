function Sound() {
}

Sound.prototype.init = function() {
    this.audio = new Audio;

    if(this.audio.canPlayType)
    {
        var canPlayOgg = ("" != this.audio.canPlayType("audio/ogg"));
        var canPlayMp3 = ("" != this.audio.canPlayType("audio/mpeg"));
        if(canPlayOgg){
            // oggをサポートしている
            this.audio.src = "./sound/test.ogg";
        }
        else if(canPlayMp3)
        {
            // mp3をサポートしている
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
};

Sound.prototype.get_audio = function() { return this.audio; };
