"use server";

import React from "react";
import axios from "axios";

export async function getAllMovies() {
    try {
        const apiUrl = process.env.API_URL_WITH_KEY;
        if (!apiUrl || apiUrl.includes('YOUR_API_KEY_HERE')) {
            console.error('API key not configured. Please add your TMDB API key to .env.local');
            return { results: [] };
        }
        
        const res = await axios.get(apiUrl);
        const result = res.data;
        return result;
    } catch (error) {
        console.error('Failed to fetch movies:', error);
        return { results: [] };
    }
}

export async function getMovieById(id: string) {
    try {
        const apiKey = 'cafcc772ee4c70c2ec5b8fcf2f41e547';
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch movie:', error);
        return null;
    }
}