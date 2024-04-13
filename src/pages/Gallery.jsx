import React, { useEffect } from 'react';
import { useState } from 'react';
import { supabase } from '../client';
import './Gallery.css';
import { Link } from 'react-router-dom';
import more from './more.png'

const Gallery = (props) => {
    const [fightersList, setFightersList] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const {data} = await supabase
                .from('Characters')
                .select()
                .order('created_at', {ascending: true});
    
            setFightersList(data);
            console.log(data);
        };

        getData().catch(console.error);
    }, [props]);

    return (
        <div className="App">
            <h1>Fighter Gallery</h1>
            
            <div className="ReadGallery">
            {
                fightersList && fightersList.length > 0 ?
                fightersList.map((fighter) => 
                    <Link 
                        to={'/gallery/' + fighter.id}
                        style={{color: "white"}}
                    >
                        <div className='fighterCardGal'>
                            <Link to={fighter.id + '/edit'}><img className="moreButton" alt="edit button" src={more} /></Link>
                            {fighter.type == 'Water' ? <img src='https://static.wikia.nocookie.net/animatorvsanimation/images/8/85/Stickfigurebluehd.png' width={"20%"} alt='Water Fighter' /> : null}
                            {fighter.type == 'Fire' ? <img src='https://static.wikia.nocookie.net/animatorvsanimation/images/c/c0/Stickfigurered.png' width={"20%"} alt='Fire Fighter' /> : null}
                            {fighter.type == 'Earth' ? <img src='https://static.wikia.nocookie.net/animatorvsanimation/images/0/0f/Green_render.png' width={"20%"} alt='Earth Fighter' /> : null}
                            {fighter.type == 'Air' ? <img src='https://static.wikia.nocookie.net/animatorvsanimation/images/9/9f/Stickfigureyellow.png' width={"20%"} alt='Air Fighter' /> : null}
                            <h2>{fighter.name}</h2>
                            <p>Attack Damage: {fighter.attackDmg}</p>
                            <p>Health: {fighter.health}</p>
                            <p>Type: {fighter.type}</p>
                        </div>
                    </Link>
                ) : <h2>{'No Fighters Yet 😞'}</h2>
            }
            </div>
        </div>  
    );
}

export default Gallery;