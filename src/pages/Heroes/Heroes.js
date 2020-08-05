// import React, { useState, useEffect, memo } from 'react';
import PageLayout from 'components/PageLayout';
import { fetchHeroes } from './control';
import './index.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Heroes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      heroes: [],
      isLoaded : false

    }
  }
  componentDidMount = () => {
    fetchHeroes().then((result) => {
      this.setState({ heroes: result,isLoaded: true })
    });
  }

  render() {
    const { heroes,isLoaded } = this.state
    return (
      <PageLayout>
        <div className='container'>
          <div className="heroes-table-container">
            <div className='table-headers'>
              *in last 30 days
          </div>

            <table className='heroes-table' width="100%">
              <tbody>
                <tr >
                  <th width="50%" >Hero</th>
                  <th width="25%">Pro Picks/Bans</th>
                  <th width="25%">Pro Wins</th>
                </tr>
                {heroes.map((hero, index) => {
                  if (index % 2 == 0)
                    return (
                      <tr className="row1" key={hero.id}>

                        <td style={{ display: 'flex', alignItems: 'center' }} >
                          <img style={{ paddingRight: 10 }} src={`https://api.opendota.com` + hero.icon}>
                          </img>

                          <span ><Link className='hero-name' to={'/hero/' + hero.name}>{hero.localized_name}</Link></span></td>
                        <td >{`${hero.pro_pick} / ${hero.pro_ban}`}</td>
                        <td >{hero.pro_win}</td>
                      </tr>)
                  else
                    return (
                      <tr className="row2" key={hero.id}>
                        <td style={{ display: 'flex', alignItems: 'center' }} >
                          <img style={{ paddingRight: 10 }} src={`https://api.opendota.com` + hero.icon}>
                          </img>
                          <span ><Link className='hero-name' to={'/hero/' + hero.name}>{hero.localized_name}</Link></span></td>
                        <td >{`${hero.pro_pick} / ${hero.pro_ban}`}</td>
                        <td >{hero.pro_win}</td>
                      </tr>)
                })}
              </tbody>
            </table>
          </div>
        </div>
      </PageLayout>
    );
  }
}

export default Heroes;
