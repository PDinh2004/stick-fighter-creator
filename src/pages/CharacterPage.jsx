import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './CharacterPage.css';

const CharacterPage = ({data}) => {
    const {id} = useParams();
    const [character, setCharacter] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('Characters')
                .select('*')
                .eq('id', id);
            console.log(data[0]);
            setCharacter(data[0]);
        }

        fetchData().catch(console.error);
    }, [data]);

    return (
        <div>
            {character ? 
                <div>
                    <h1>{character.name}</h1>
                    {character.type == 'Water' ? <img src='https://static.wikia.nocookie.net/animatorvsanimation/images/8/85/Stickfigurebluehd.png' width={"50%"} alt='Water Fighter' /> : null}
                    {character.type == 'Fire' ? <img src='https://static.wikia.nocookie.net/animatorvsanimation/images/c/c0/Stickfigurered.png' width={"50%"} alt='Fire Fighter' /> : null}
                    {character.type == 'Earth' ? <img src='https://static.wikia.nocookie.net/animatorvsanimation/images/0/0f/Green_render.png' width={"50%"} alt='Earth Fighter' /> : null}
                    {character.type == 'Air' ? <img src='https://static.wikia.nocookie.net/animatorvsanimation/images/9/9f/Stickfigureyellow.png' width={"50%"} alt='Air Fighter' /> : null}
                    <h2>Attack Damage: {character.attackDmg}</h2>
                    <h2>Health: {character.health}</h2>
                    <h2>Type: {character.type}</h2>
                    {character.type == 'Water' ? <p>Water fighters are strong against Fire fighters, but weak against Earth fighters.</p> : null}
                    {character.type == 'Fire' ? <p>Fire fighters are strong against Air fighters, but weak against Water fighters.</p> : null}
                    {character.type == 'Earth' ? <p>Earth fighters are strong against Water fighters, but weak against Air fighters.</p> : null}
                    {character.type == 'Air' ? <p>Air fighters are strong against Earth fighters, but weak against Fire fighters.</p> : null}
                    <Link
                        to={'edit'}
                        style={{color: "white"}}
                    >
                        <h2 className="editButton" style={{color: 'black', backgroundColor: 'white', width: "25%"}}>Edit Fighter ✍️</h2>
                    </Link>
                </div>
            : null}
        </div>
    );
}

export default CharacterPage;