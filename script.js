const button = document.getElementById('button')
const audioElement = document.getElementById('audio')
// VoiceRSS Javascript SDK


//Toggle Tell Me A Joke Button by disabling/enabling only after auido tracks end
function toggleButton() {
    button.disabled = !button.disabled;
}

//Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'd712316987ff410c87ddedd0db4bda07',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
    // console.log('tell me: ', joke);

}

// Fetch jokes from joke API
async function getJokes() {
    let joke = ''
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,racist,sexist';
    try {
       const response = await fetch(apiUrl);
       const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable the Button
        toggleButton();
    } catch (error) {
        console.log('Whoops!, there\'s been some error : ', error);
    }
}


// Event Listener button
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);