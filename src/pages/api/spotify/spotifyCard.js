import { Router } from 'next/router';
import querystring from 'querystring';
import  config  from '../../../../public/config.json';
import { useState } from 'react';

const {
    SPOTIFY_CLIENT_ID: client_id,
    SPOTIFY_CLIENT_SECRET: client_secret,
    SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const DEVİCE_ENDPOINT = `https://api.spotify.com/v1/me/player/devices`;
const USER_ENDPOINT = `https://api.spotify.com/v1/me`;

const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=track`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

 
 
 

const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token,
        }),
    });

    return response.json();
};
 
 
/* sample deneme */ 

export const getYoutube = async () => {
    const youtubeToken = process.env.YOUTUBE_ACCESS_TOKEN;
    if (!youtubeToken) {
        return null;
    }
    
    return fetch(`https://www.googleapis.com/youtube/v3/activities`, {
         headers: {
            Authorization: `Bearer ${youtubeToken}`,
        },
      })
};

export const getRecentlyPlayed = async () => {
    const { access_token } = await getAccessToken();
    return fetch(`https://api.spotify.com/v1/me/player/recently-played`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

  
export const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();

    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};



export const getUser = async () => {
    const { access_token } = await getAccessToken();

    return fetch(USER_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

export const getDevice = async () => {
    const { access_token } = await getAccessToken();

    return fetch(DEVİCE_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};


export const getSearchSong = async () => {
    const { access_token } = await getAccessToken();

    return fetch(SEARCH_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};


const handler = async (_, res) => {
    const response = await getNowPlaying();
    const device_response = await getDevice();
    const search_response = await getSearchSong();
    const youtube_response = await getYoutube();
    const user_response = await getUser();
    const lastPlayedData = await getRecentlyPlayed();
    const lastPlayed = await lastPlayedData.json();
const lastPlayedTrack = lastPlayed.items && lastPlayed.items.length > 0 ? lastPlayed.items[0].track : null;
// availableMarkets satırı kaldırıldı

    if (response.status === 204 || response.status > 400) {
        return res.status(200).json({ isPlaying: false, lastPlayed: lastPlayedTrack, lastSongImage: lastPlayedTrack ? lastPlayedTrack.album.images[0].url : null });
    }

  


    const song = await response.json();
    const device_sort = await device_response.json();
    const search_sort = await search_response.json();
    const youtube_sort = await youtube_response.json();
    const user_sort = await user_response.json();

     
    const isPlaying = song.is_playing;
     
    

    const title = song.item.name;
    const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;
    const deviceName = device_sort.devices[0] ? device_sort.devices[0].name : "Bilinmiyor";
    const deviceType = device_sort.devices[0] ? device_sort.devices[0].type : "Smartphone";
    const deviceTypeTR = deviceType.replace("Computer", "Bilgisayar").replace("Smartphone", "Akıllı Telefon").replace("Tablet", "Tablet").replace("Speaker", "Hoparlör").replace("TV", "Televizyon").replace("AVR", "AVR").replace("STB", "STB").replace("AudioDongle", "AudioDongle").replace("GameConsole", "Oyun Konsolu").replace("CastVideo", "CastVideo").replace("CastAudio", "CastAudio").replace("Automobile", "Otomobil").replace("Unknown", "Bilinmiyor");
    const prewiwUrl = song.item.preview_url;
    const uri = song.item.uri;
    const pro = user_sort.product;
    const { access_token } = await getAccessToken();

    return res.status(200).json({
        album,
        albumImageUrl,
    
        artist,
        isPlaying,
        songUrl,
        title,
        deviceName,
        deviceType,
        deviceTypeTR,
        prewiwUrl,
        uri,
        pro,
        youtube_sort,
        bruh: access_token,
        device_sort,
     
    });
};

export default handler;