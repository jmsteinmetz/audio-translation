# Assignment

Assume you have to build a feature for Smarter Contact. It`s a voice-to-text transcription. Similar to iPhone dictation - the speech is converted to text.

Below is the approximate design of the feature. The user can insert and send a message within a conversation using voice.

(image)


## Summary

I have been using OpenAI for a whole so I used the "whisper" package as it does a great job of transcribing and supports multiple languages out of the box. Also played around with using the google transcribing API but it was much simpler to use OpenAI. Configurations were easier. 

Assumptions:
- UI out of scope (will not work in modern browsers) 
- ES5 - Can be converted to ES6 if necessary using browserfy or similar tech)
- uses microphone to input audio (can easily be adapted for audio upload)


``` 
\\ Create package.json
npm init -y 

\\ install dependencies
npm install express 
npm install socket.io 
npm axios

```

Socket.Io is a good, simple way to create bi-directional comms from client to server. There are many other options, chose this one for the simplicity of the exercise.

Next, created the index file (list/index.html). I just quickly created a react component to insert the content. 
``` 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Transcribe Audio</title>
</head>
<body>
    <div id="root"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.development.js"></script>
    <script>
        // React component
        class transcribe extends React.Component {
            render() {
                return (
                    <h1>Audio Capture and Transcription</h1>
                    <button id="startButton">Start Recording</button>
                    <button id="stopButton" disabled>Stop Recording</button>
                    <div id="transcription"></div>
                );
            }
        }

        // Mounting the React component
        ReactDOM.render(<transcribe />, document.getElementById('root'));
    </script>
    <script type="module" src="/socket.io/socket.io.js"></script>
    <script type="module" src="app.js"></script>
</body>
</html>
```

Next, created the dist/app.js file. 

```
\\ Takes all inputs, creates a socket stream and pushes the input to the server for translation. 
\\ Responds back with an approximation of transcription.  (see code)
```

Run the following command to start app
```
node dist/app.js
```

Open your browser and run 
```
# App is set to listen on port 3000 but can be configured as needed.
http://localhost:3000
```

## Notes

- Never send OpenAI for personally identifiable information or company proprietary info
- For microphone functionality to work, the app will need to be configured to run on ES6. If this is needed, I'll need a few more days since my node environment is not set up for that. In truth, it takes longer to set up the environment for that than it does to actually write the code.
