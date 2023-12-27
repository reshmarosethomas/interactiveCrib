let serial; //for serial port
let val = "0"; //input value from serial port
let audioClips = [5];
let isAudioPlaying = false;
let currentClipID = null;

let playButton;

function setup() {
    createCanvas(windowWidth, windowHeight);

    background(40);
    colorMode(HSB, 100);
    fill(0);
    noStroke();

    //noLoop();
    setupSerialPort(); 
    playButton = new button(null, "Start Program", width - 200, 96, 160, 48, 16, "White", LEFT); 

    
    for (let i = 0; i < 5; i++) {
        let clipPath = `audio/A${i+1}.mp3`;
        audioClips[i] = createAudio(clipPath, () => {
            audioClips[i].autoplay(false);
            audioClips[i].noLoop();
            audioClips[i].hideControls();
        });
    }
    
}

function draw(){
    background(40);
    playButton.displayButton();
    playButton.hover(); 
    //console.log(isAudioPlaying);

    if (isAudioPlaying == false) {
        let temp = val;
        //console.log(val);
        if (temp=="s1") {
            console.log("playing 1");
            currentClipID = 0;
            audioClips[0].play();
            audioClips[0].volume(1);
            isAudioPlaying = true;
            setTimeout( function() {
                isAudioPlaying = false;
                val = 0;
            }, audioClips[0].duration())
            //audioClips[0].onended( endAudioClip() );

        } else if (temp=="s2") {
            console.log("playing 2");
            currentClipID = 1;
            audioClips[1].play();
            audioClips[1].volume(1);
            isAudioPlaying = true;
            setTimeout( function() {
                isAudioPlaying = false;
                val = 0;
            }, audioClips[1].duration() + 1000)
            //audioClips[1].onended( endAudioClip() );

        } else if (temp=="s3") {
            console.log("playing 3");
            currentClipID = 2;
            audioClips[2].play();
            audioClips[2].volume(1);
            isAudioPlaying = true;
            setTimeout( function() {
                isAudioPlaying = false;
                val = 0;
            }, audioClips[2].duration() + 1000)
            //audioClips[2].onended( endAudioClip() );

        } else if (temp=="s4") {
            console.log("playing 4");
            currentClipID = 3;
            audioClips[3].play();
            audioClips[3].volume(1);
            isAudioPlaying = true;
            setTimeout( function() {
                isAudioPlaying = false;
                val = 0;
            }, audioClips[3].duration() + 1000)
            //audioClips[3].onended( endAudioClip() );

        } else if (temp=="s5") {
            console.log("playing 5");
            currentClipID = 4;
            audioClips[4].play();
            audioClips[4].volume(1);
            isAudioPlaying = true;
            setTimeout( function() {
                isAudioPlaying = false;
                val = 0;
            }, audioClips[4].duration() + 1000)
            //audioClips[4].onended( endAudioClip() );

        } else {

        }
    }
}

function mousePressed() {
    playButton.clickedIt();
}

function endAudioClip() {
    val = "0";
    setTimeout(function(){ isAudioPlaying = false; console.log("timeout over"); }, 1000);
    console.log(val);
    //audioClips[currentClipID].volume(0);
}

function writeText(str, x, y, w, h, fontSize, fillVal=244, horAlign=CENTER) {
    textAlign(horAlign, CENTER);
    push();
    textSize(fontSize); 
    fill(fillVal); 
    noStroke();
    text(str, x, y, w, h);
    pop();
}

//SERIAL PORT FUNCTIONS
function setupSerialPort() {
    // Instantiate our SerialPort object
    serial = new p5.SerialPort();
  
    // Let's list the ports available
    let portlist = serial.list();
    //serial.open('/dev/cu.usbmodem11401');
    //serial.open('/dev/tty.usbmodem11401');
    //serial.open('/dev/tty.usbmodem11201');
    //serial.open('/dev/tty.usbmodem1201');
    //serial.open('/dev/tty.usbmodem11101');
    serial.open('/dev/tty.usbmodem1101');
    ///

    // Register some callbacks
  
    // When we connect to the underlying server
    serial.on('connected', serverConnected);
  
    // When we get a list of serial ports that are available
    serial.on('list', gotList);
  
    // When we some data from the serial port
    serial.on('data', gotData);
  
    // When or if we get an error
    serial.on('error', gotError);
  
    // When our serial port is opened and ready for read/write
    serial.on('open', gotOpen);
  }
  
  // We are connected and ready to go
  function serverConnected() {
    print('We are connected!');
  }
  
  // Got the list of ports
  function gotList(thelist) {
    // theList is an array of their names
    for (let i = 0; i < thelist.length; i++) {
      // Display in the console
      print(i + ' ' + thelist[i]);
    }
  }
  
  // Connected to our serial device
  function gotOpen() {
    print('Serial Port is open!');
  }
  
  // Ut oh, here is an error, let's log it
  function gotError(theerror) {
    print(theerror);
  }
  
  // There is data available to work with from the serial port
  function gotData() {
    let currentString = serial.readStringUntil('\r\n');
    //console.log(currentString);
    //val = parseInt(currentString, 10);
    val = currentString;
    console.log(val);
  }
  

  class button {
    constructor (clipNum = null, str, x, y, btnW, btnH, Tsize, Col) {
      this.x = x;
      this.y = y;
      this.clipNum = clipNum;
      
      this.str = str; //The button text
      this.textSize = Tsize; //this.font = "Courier";

      this.w = btnW; //this.w = textWidth(str)*2 + 10;
      this.h = btnH;
      
      this.col = Col;
      this.BGcolor = "rgb(60,60,60)";
      this.textColor = Col;

      this.active = false;
      this.clicked = false; 
      this.hoverStatus = false;
      this.destroy = false;
    }
    
    displayButton () {
      
      push();

      if (this.destroy) {
        this.BGcolor = this.clipNum != null ? "rgba(0, 0, 0, 0.3)": "rgba(0, 0, 0, 1)";
        this.textColor = "rgb(40, 40, 40)";
        noStroke();
      }
      else if (this.active) {
        this.BGcolor = this.clipNum != null ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 1)";
        this.textColor = "rgb(180, 180, 180)";
        noStroke();
      }
      else if (this.hoverStatus) {
        this.BGcolor = this.clipNum != null ? "rgba(60, 60, 60, 0.3)" : "rgba(60, 60, 60, 1)" ;
        this.textColor = this.col;
        noStroke();
      }
      else if (this.clicked) {
        this.BGcolor = this.clipNum != null ? "rgba(40, 40, 40, 0.9)" : "rgba(40, 40, 40, 1)";
        this.textColor = this.col;
        noStroke();
      }
      else {
        this.BGcolor = this.clipNum != null ? "rgba(40, 40, 40, 0.9)" : this.col;
        this.textColor = "rgb(20,20,20)";
        noStroke();
      }

      fill(this.BGcolor);

      if (this.clipNum !=null) {
        let img = blurredThumbs[this.clipNum];
        image(img, this.x, this.y, this.w, this.h);
      }
      
      rect(this.x, this.y, this.w, this.h, 0);
  
      textStyle(BOLD); //textFont(descriptionFont);
      textSize(this.textSize);
      fill(this.textColor); 
      noStroke();
      textAlign(CENTER, CENTER); //textFont(buttonFont);
      text(this.str, this.x, this.y, this.w, this.h);

      pop();
    }

    hover() {
      if (
        mouseX > this.x &&
        mouseX < this.x + this.w &&
        mouseY > this.y &&
        mouseY < this.y + this.h
      ) {
        this.hoverStatus = true;
        
      } else {
        this.hoverStatus = false;
      }
    }

    clickedIt() {
      if (
        mouseX > this.x &&
        mouseX < this.x + this.w &&
        mouseY > this.y &&
        mouseY < this.y + this.h
      ) {
        this.clicked = true;
        
      } else {
        this.clicked = false;
      }
    }

  }