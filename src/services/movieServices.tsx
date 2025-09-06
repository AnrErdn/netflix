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