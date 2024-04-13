import React from 'react';
import { useState } from 'react';
import { supabase } from '../client';

const CreateCharacter = () => {
    const [character, setCharacter] = useState({name: "", attackDmg: -1, health: 0, type: "Select a Type"});
    const types = ["Select a Type", "Water", "Fire", "Earth", "Air"];

    const createCharacter = async (event) => {
        event.preventDefault();

        if (character.type === "Select a Type") {
            alert("Please select a type!");
            return;
        } else if (character.name === "") {
            alert("Please enter a name!");
            return;
        } else if (character.attackDmg <= -1) {
            alert("Please enter an attack damage!");
            return;
        } else if (character.health <= 0) {
            alert("Please enter a health value above 0!");
            return;
        }

        await supabase
            .from('Characters')
            .insert({name: character.name, attackDmg: character.attackDmg, type: character.type, health: character.health})
            .select();
        
        window.location = "/";
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCharacter( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div>
            <h1>Create Your Stick Fighter!</h1>
            <form>
                <label htmlFor="name">Name</label> <br />
                <input type="text" id="name" name="name" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="attackDmg">Attack Damage</label><br />
                <input type="number" id="attackDmg" name="attackDmg" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="health">Health</label><br />
                <input type="number" id="health" name="health" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="type">Type</label><br />
                <select id="type" name="type" onChange={handleChange} style={{marginBottom: "10px"}}>
                    {types.map((type) => <option value={type}>{type}</option>)}
                </select>
                <br/>
                <input type="submit" value="Submit" onClick={createCharacter} />
            </form>
        </div>
    );

}

export default CreateCharacter;