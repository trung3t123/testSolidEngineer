import React, { Component, useEffect, useState } from 'react';
import { fetchHeroes } from './control';
import { fetchHeroesStats } from './control';

import { useParams } from 'react-router';
import PageLayout from 'components/PageLayout';
import redDot from '../../redAttributeDots.png'
import greenDot from '../../greenAttributeDots.png'
import blueDot from '../../blueAttributeDots.png'

import './HeroDetails.css'

function HeroDetails() {
    const [name, setName] = useState(useParams());
    const [hero, setHero] = useState([]);
    const [heroImage, setHeroImage] = useState('')
    const [strColor, setStr] = useState('#b5b5b5')
    const [agiColor, setAgi] = useState('#b5b5b5')
    const [intelColor, setInt] = useState('#b5b5b5')

    useEffect(() => {
        fetchHeroes().then((result) => {
            result.map(data => {
                if (data.name == name.heroname) {
                    setHero(data)
                    if (data.primary_attr == 'str') {
                        setStr('#f33b2f')
                    }
                    if (data.primary_attr == 'agi') {
                        setAgi('#31ce02')
                    }
                    if (data.primary_attr == 'int') {
                        setInt('#009ff2')
                    }
                    console.log(data);
                }
            })
        });
        fetchHeroesStats().then((result) => {
            result.map(data => {
                if (data.name == name.heroname) {
                    setHeroImage(data.img)
                }
            })
        });
    }, []);
    return (
        <PageLayout>
            <div className="container">
                <div className="heroDetails-container">
                    <div className='cover-image-container'>
                        <div className='cover-image' style={{
                            backgroundImage: "url(" + `https://api.opendota.com${heroImage}` + ")",
                            backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', width: '100%', height: '100%',
                        }} >

                        </div>

                    </div>
                    <div className="hero-details-stats-container" >
                        <img className='hero-avatar' src={`https://api.opendota.com${heroImage}`} />
                        <div className="hero-type-name">
                            <span style={{ fontSize: 40, fontWeight: 630 }}>{hero.localized_name}</span>
                            <span style={{ textTransform: 'uppercase', fontSize: 15, fontWeight: 500 }} >{hero.attack_type} - {` ${hero.roles}  `}</span>
                        </div>
                        <div className='stats-atributes-container' >

                            <div className="attribute" style={{ color: strColor }} ><img className='dot' src={redDot}></img> 23 +1.3</div>
                            <div className="attribute" style={{ color: agiColor }} ><img className='dot' src={greenDot}></img>24+3</div>
                            <div className="attribute" style={{ color: intelColor }} ><img className='dot' src={blueDot}></img>12+1.8</div>
                        </div>
                    </div>
                    <div className='hero-details'>
                        <div className='details-col1' >
                            <div className='details-row1'><span className='category-style' >BASE ATTACK : </span><span className='category-style'>29-33</span></div>
                            <div className='details-row2'><span className='category-style' >ATTACK RANGE : </span><span className='category-style'>150</span></div>
                            <div className='details-row1'><span className='category-style' >ATTACK SPEED : </span > -</div>
                            <div className='details-row2'><span className='category-style' >PROJECTILE SPEED : </span> - </div>

                        </div>

                        <div className='details-col2' >
                            <div className='details-row1'><span className='category-style' >HEALTH : </span><span>200</span></div>
                            <div className='details-row2'><span className='category-style' >HEALTH REGEN : </span><span>0.25</span></div>
                            <div className='details-row1'><span className='category-style' >MANA : </span> <span>75</span> </div>
                            <div className='details-row2'><span className='category-style' >MANA REGEN : </span><span>0</span> </div>

                        </div>
                        <div className='details-col3' >
                            <div className='details-row1'><span className='category-style' >BASE ARMOR : </span><span>-</span></div>
                            <div className='details-row2'><span className='category-style' >MAGIC RESISTANCE : </span><span>150</span></div>
                            <div className='details-row1'><span className='category-style' >MOVE SPEED : </span> <span>310</span> </div>
                            <div className='details-row2'><span className='category-style' >TURN SPEED : </span> <span>0.5</span> </div>

                        </div>
                        <div className='details-col4' >
                            <div className='details-row1'><span className='category-style' >NUMBER OF LEGS : </span><span>{hero.legs}</span></div>
                            <div className='details-row2'><span className='category-style' >CM ENABLE : </span><span>yes</span></div>


                        </div>

                    </div>
                    <div>

                    </div>
                </div>

            </div>

        </PageLayout>
    );

}

export default HeroDetails;
