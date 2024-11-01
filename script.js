testImg = "1.============================================================================.1\n"
+ "2..............................................................................2\n"
+ "3..............................................................................3"
+ "4..............................................................................4"
+ "5..............................................................................5"
+ "6..............................................................................6"
+ "7..............................................................................7"
+ "8..............................................................................8"
+ "9..............................................................................9"
+ "10............................................................................10"
+ "11.................................Test image.................................11"
+ "12...................................80x25....................................12"
+ "13............................................................................13"
+ "14............................................................................14"
+ "15............................................................................15"
+ "16............................................................................16"
+ "17............................................................................17"
+ "18............................................................................18"
+ "19............................................................................19"
+ "20............................................................................20"
+ "21............................................................................21"
+ "22............................................................................22"
+ "23............................................................................23"
+ "24............................................................................24"
+ "25 ========================================================================== 25";

// WebSocket setup
const socket = new WebSocket('ws://localhost:8765');
// Event listener for WebSocket connection open
socket.addEventListener('open', function (event) { console.log('WebSocket is connected.'); });
// Event listener for receiving messages
socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    const screen = document.getElementById('screen');
    // Display the received text
    if (data.text) {
        screen.innerHTML += `<div>${data.text}</div>`;
    }
    // Update LED controls
    if (data.controls) {
        for (const [led, state] of Object.entries(data.controls)) {
            const ledElement = document.getElementById(led);
            if (state === 'on') {
                ledElement.classList.add('active');
            } else if (state === 'off') {
                ledElement.classList.remove('active');
            }
        }
    }
});

// Existing input handling code
document.getElementById('input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const input = event.target.value;
        const screen = document.getElementById('screen');
        screen.innerHTML += `<div>${input}</div>`;
        event.target.value = '';
        // Example command to toggle LEDs
        if (input === 'toggle led1') {
            document.getElementById('led1').classList.toggle('active');
        } else if (input === 'toggle led2') {
            document.getElementById('led2').classList.toggle('active');
        } else if (input === 'toggle led3') {
            document.getElementById('led3').classList.toggle('active');
        } else if (input === 'test image') {
            screen.innerHTML += `<div>${testImg}</div>`;
        }
    }
});
