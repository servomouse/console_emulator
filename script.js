testImg = "1  ==========================================================================  1\n"
+ "2                                                                              2\n"
+ "3                                                                              3\n"
+ "4                                                                              4\n"
+ "5                                                                              5\n"
+ "6                                                                              6\n"
+ "7                                                                              7\n"
+ "8                                                                              8\n"
+ "9                                                                              9\n"
+ "10                                                                            10\n"
+ "11                                                                            11\n"
+ "12                                 Test image                                 12\n"
+ "13                                   80x25                                    13\n"
+ "14                                                                            14\n"
+ "15                                                                            15\n"
+ "16                                                                            16\n"
+ "17                                                                            17\n"
+ "18                                                                            18\n"
+ "19                                                                            19\n"
+ "20                                                                            20\n"
+ "21                                                                            21\n"
+ "22                                                                            22\n"
+ "23                                                                            23\n"
+ "24                                                                            24\n"
+ "25 ========================================================================== 25";

document.getElementById('led1').style.backgroundColor = 'red';

// WebSocket setup
const socket = new WebSocket('ws://localhost:8765');
// Event listener for WebSocket connection open
// socket.addEventListener('open', function (event) {
//     console.log('WebSocket is connected.');
//     const led1 = document.getElementById('online-led');
//     led1.getElementsByClassName('led-name').innerHTML = 'ONLINE';
//     document.getElementById('led1').style.backgroundColor = 'green';
// });
// Event listener for receiving messages
// socket.addEventListener('message', function (event) {
//     console.log(event.data)
//     const data = JSON.parse(event.data);
//     const screen = document.getElementById('screen');
//     // Display the received text
//     if (data.text) {
//         screen.innerHTML = `<div>${data.text}</div>`;
//     }
//     // Update LED controls
//     if (data.controls) {
//         for (const [led, state] of Object.entries(data.controls)) {
//             const ledElement = document.getElementById(led);
//             if (state === 'on') {
//                 ledElement.classList.add('active');
//             } else if (state === 'off') {
//                 ledElement.classList.remove('active');
//             }
//         }
//     }
// });

socket.onmessage = (event) => {
    console.log(event.data)
    const data = JSON.parse(event.data);
    const screen = document.getElementById('screen');
    // Display the received text
    if (data.text) {
        screen.innerHTML = `<div>${data.text}</div>`;
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
};

socket.onopen = () => {
    console.log('WebSocket is connected.');
    const led1 = document.getElementById('online-led');
    led1.getElementsByClassName('led-name')[0].innerHTML = 'ONLINE';
    document.getElementById('led1').style.backgroundColor = 'green';
};

socket.onclose = () => {
    console.log('[close] Disconnected from server');
    const led1 = document.getElementById('online-led');
    led1.getElementsByClassName('led-name')[0].innerHTML = 'OFFLINE';
    document.getElementById('led1').style.backgroundColor = 'red';
};

socket.onerror = (error) => {
    console.log('WebSocket error:', error);
    const led1 = document.getElementById('online-led');
    led1.getElementsByClassName('led-name')[0].innerHTML = 'OFFLINE';
    document.getElementById('led1').style.backgroundColor = 'red';
};

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
            screen.innerHTML = `<div>${testImg}</div>`;
        }
    }
});
