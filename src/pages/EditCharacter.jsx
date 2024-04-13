import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './EditCharacter.css';

const EditCharacter = ({data}) => {
    const {id} = useParams();
    const [character, setCharacter] = useState({name: "", attackDmg: 0, health: 0, type: "Select a Type"});
    const [updatedCharacter, setUpdatedCharacter] = useState({name: "", attackDmg: -1, health: 0, type: "Select a Type"});
    const types = ["Select a Type", "Water", "Fire", "Earth", "Air"];

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('Characters')
                .select('*')
                .eq('id', id);
            setCharacter(data[0]);
            console.log(data[0])
        }

        fetchData().catch(console.error);
    }, [data]);

    const updateCharacter = async (event) => {
        event.preventDefault();
        if (updatedCharacter.type === "Select a Type") {
            updatedCharacter.type = character.type;
        }

        if (updatedCharacter.name === "") {
            updatedCharacter.name = character.name;
        }

        if (updatedCharacter.attackDmg <= -1) {
            updatedCharacter.attackDmg = character.attackDmg;
        }
        
        if (updatedCharacter.health <= 0) {
            updatedCharacter.health = character.health;
        }

        await supabase
            .from('Characters')
            .update({ name: updatedCharacter.name, attackDmg: updatedCharacter.attackDmg, health: updatedCharacter.health, type: updatedCharacter.type })
            .eq('id', id);

        window.location = "/gallery";
    }

    const deleteCharacter = async (event) => {
        event.preventDefault();
        await supabase
            .from('Characters')
            .delete()
            .eq('id', id);

        window.location = "/gallery";
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUpdatedCharacter( (prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    return (
        <div>
            <h1>Edit Your Stick Fighter!</h1>
            <p>Any fileds that are not changed will stay the same!</p>


            {character ? 
                <div className='fighterCard'>
                    {character.type == 'Water' ? <img src='https://static.wikia.nocookie.net/animatorvsanimation/images/8/85/Stickfigurebluehd.png' width={"20%"} alt='Water Fighter' /> : null}
                    {character.type == 'Fire' ? <img src='https://static.wikia.nocookie.net/animatorvsanimation/images/c/c0/Stickfigurered.png' width={"20%"} alt='Fire Fighter' /> : null}
                    {character.type == 'Earth' ? <img src='https://static.wikia.nocookie.net/animatorvsanimation/images/0/0f/Green_render.png' width={"20%"} alt='Earth Fighter' /> : null}
                    {character.type == 'Air' ? <img src='https://static.wikia.nocookie.net/animatorvsanimation/images/9/9f/Stickfigureyellow.png' width={"20%"} alt='Air Fighter' /> : null}
                    <h2>{character.name}</h2>
                    <p>Attack Damage: {character.attackDmg}</p>
                    <p>Health: {character.health}</p>
                    <p>Type: {character.type}</p>
                </div>
            : null }

            <br />
            <form>
                <label htmlFor="name">Name</label> <br />
                <input type="text" id="name" name="name" value={updatedCharacter.name} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="attackDmg">Attack Damage</label><br />
                <input type="number" id="attackDmg" name="attackDmg" value={updatedCharacter.attackDmg} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="health">Health</label><br />
                <input type="number" id="health" name="health" value={updatedCharacter.health} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="type">Type</label><br />
                <select id="type" name="type" onChange={handleChange} style={{marginBottom: "10px"}}>
                    {types.map((type) => <option value={type}>{type}</option>)}
                </select>
                <br/>
                <input type="submit" value="Submit" onClick={updateCharacter} style={{marginBottom: "10px"}}/>
                <br />
                <button className="deleteButton" onClick={deleteCharacter}>Delete Fighter</button>
            </form>
        </div>
    );
}

export default EditCharacter;