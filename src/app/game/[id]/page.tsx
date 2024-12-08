import { redirect } from "next/navigation";
import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import { Container } from "@/components/container";
import { Label } from "./components/label";
import { GameCard } from "@/components/gameCard";

import { Metadata } from "next";

interface PropsParams {
    params: {
        id: string;
    }
}

export async function generateMetadata({ params }: PropsParams): Promise<Metadata>{
    try {
        const response: GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`, {cache: "no-store"})
        .then((res) => res.json())
        .catch(() => {
            return {
                title: "Daly Games - Descubra games incriveis"
            }  
        })

        return {
            title: response.title,
            description: `${response.description.slice(0, 100)}....`,
            openGraph: {
                title: response.title,
                images: [response.image_url]
            },
            robots: {
                index: true,
                follow: true,
                nocache: true,
                googleBot: {
                  index: true,
                  follow: true,
                  noimageindex: true
                }
            }
        }


    } catch(err){
        return {
            title: "Daly Games - Descubra games incriveis"
        }
    }
}

async function getGameid(id: string){
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, {cache: "no-store"})
        return res.json();
    } catch(err){
        throw new Error("Failed " + err)
    }
}

async function getGamesSorted(){
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, {cache: "no-store"})
        return res.json();
    } catch(err){
        throw new Error("Failed " + err) 
    }
}


export default async function GameDetail({
    params: { id }
}: { params: {id: string}}){

    const game: GameProps = await getGameid(id)
    const sortedGame: GameProps = await getGamesSorted()

    if(!game){
        redirect('/')
    }

    return (
        <main className="w-full text-black">
            <div className="bg-black h-80 sm:h-96 w-full relative">
                <Image 
                    className="object-cover w-full h-80 sm:h-96 opacity-75"
                    src={game.image_url} 
                    alt={game.title} 
                    priority={true} 
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                />
            </div>

            <Container>
                <h1 className="font-bold text-xl my-4">{game.title}</h1>
                <p>{game.description}</p>

                <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
                <div className="flex gap-2 flex-wrap">
                    { game.platforms.map((item, i) => (
                        <Label key={item} name={item} />
                    ))}
                </div>

                <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
                <div className="flex gap-2 flex-wrap">
                    { game.categories.map((item, i) => (
                        <Label key={item} name={item} />
                    ))}
                </div>

                <p className="mt-7 mb-2"><strong>Data de lançamento:</strong> {game.release}</p>

                <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado</h2>
                <div className="flex">
                    <div className="flex-grow">
                        <GameCard data={sortedGame} />
                    </div>
                </div>
            </Container>
        </main>
    )
}