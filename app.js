// ES6
// import express from 'express';
// import http from 'http';
// import socketIO from 'socket.io';
// import axios from 'axios';

// ES5
var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var axios = require('axios');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(__dirname));

// hidden
var OPENAI_API_KEY = '*********';

io.on('connection', function(socket) {
    console.log('User connected');

    socket.on('startRecording', function() {
        console.log('Recording started');
        socket.broadcast.emit('startRecording');

        socket.on('audioChunk', function(chunk) {
            axios.post('https://api.openai.com/v1/engines/whisper/transcriptions', {
                audio: chunk,
                language: 'en'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + OPENAI_API_KEY
                }
            })
            .then(function(response) {
                var transcription = response.data.transcriptions[0].text;
                io.emit('transcription', transcription);
            })
            .catch(function(error) {
                console.error('Error transcribing audio:', error.message);
            });
        });

        socket.on('endRecording', function() {
            socket.broadcast.emit('endRecording');
        });
    });

    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
});

server.listen(3000, function() {
    console.log('Server listening on port 3000');
});

