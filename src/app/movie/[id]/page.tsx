"use client"

import React,{use, useEffect, useState} from 'react';
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface MovieType {
    id: string;
    title: string;
    backdrop_path: string;
    poster_path: string;
    overview: string;
  }

function page({params}:{params:Promise<{id:string}>}) {

    const {id} = use(params);
    const [movie, setMovie] = useState<MovieType | null>(null);
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(()=>{
        if(id) {
            const fetchMovie = async()=>
            {
                try {
                    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2ea05c2f444f6fe57492711ba6641efa`);
                    const data = await res.json();
                    setMovie(data)
                }catch(error)
                {
                    console.log(error)
                }
            }
            fetchMovie();
        }
    },[id])

    if(!movie)
        return <div>Уншиж байна...</div>;
    console.log(`url(${process.env.IMAGE_PATH}${movie.backdrop_path})`)

    return (
        <div className="bg-black text-white min-h-screen">
            <Header />
            <div className="relative w-full h-[500px] bg-cover bg-center mt-16" style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-8 flex flex-col justify-end">
                    <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
                    <p className="text-lg max-w-xl">{movie.overview}</p>
                    <div className="mt-4">
                        <Link href={`/movie/${movie.id}`}>
                            <button onClick={()=>setShowTrailer(true)} className="bg-red-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-red-700">
                                Үзэх
                            </button>   
                        </Link>
                    </div>
                </div>
            </div>
            {showTrailer && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="relative w-3/4 h-3/4">
                        <iframe width={"100%"} height={"100%"} src={`https://www.youtube.com/embed/43R9l7EkJwE?si=MD-2_s4LzNwiuoJK`} title={movie.title} allowFullScreen className="rounded-lg"></iframe>
                        <button onClick={() => setShowTrailer(false)} className="absolute top-2 right-2 bg-red-600 text-white px-4 py-2 rounded-full">X</button>
                    </div>
                </div>
            )}
            <div className="p-8">
                <p className="w-2/3 text-justify opacity-65">
                It is the height of the war in Vietnam, and U.S. Army Captain Willard is sent by Colonel Lucas and a General to carry out a mission that, officially, 'does not exist - nor will it ever exist'. The mission: To seek out a mysterious Green Beret Colonel, Walter Kurtz, whose army has crossed the border into Cambodia and is conducting hit-and-run missions against the Viet Cong and NVA. The army believes Kurtz has gone completely insane and Willard's job is to eliminate him. Willard, sent up the Nung River on a U.S. Navy patrol boat, discovers that his target is one of the most decorated officers in the U.S. Army. His crew meets up with surfer-type Lt-Colonel Kilgore, head of a U.S Army helicopter cavalry group which eliminates a Viet Cong outpost to provide an entry point into the Nung River. After some hair-raising encounters, in which some of his crew are killed, Willard, Lance and Chef reach Colonel Kurtz's outpost, beyond the Do Lung Bridge. Now, after becoming prisoners of Kurtz, will Willard & the others be able to fulfill their mission?—Derek O'Cain
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default page