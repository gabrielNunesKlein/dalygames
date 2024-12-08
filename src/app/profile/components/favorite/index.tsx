"use client"

import { Metadata } from "next"
import { useState } from "react"
import { FiEdit, FiX } from "react-icons/fi"

export const metadata: Metadata = {
    title: "Meu perfil - Daly Games",
    description: "Perfil - sujeito programador"
}

export function FavaoriteCard(){

    const [input, setInput] = useState("")
    const [showInput, setShowInput]= useState(false)
    const [gameName, setGameName] = useState("")

    function handleShowInput(){
        setShowInput(!showInput)

        if(input !== ""){
            setGameName(input)
        }

        setInput("")
    }

    return (
        <div className="w-full bg-gray-900 p-2 h-44 text-white flex justify-between flex-col">
            { showInput ? (
                <div className="flex items-center justify-center gap-3">
                    <input 
                    className="w-full rounded-md h-8 text-black px-2"
                    type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button onClick={handleShowInput}>
                        <FiX  size={24} color="#fff" ></FiX>
                    </button>
                </div>
            ) : (
                <button onClick={handleShowInput} className="self-start hover:scale-110 duration-200 transition-all">
                    <FiEdit size={24} color="#fff" />
                </button>
            )}

            { gameName && 
                <div>
                    <span className="text-white">Jogo Favorito:</span>
                    <p className="font-bold text-white">{gameName}</p>
                </div>
            }

            { !gameName && (
                <p className="font-bold text-white">Adicionar Jogo</p>
            )}
            
        </div>
    )
}