import React, { useEffect, useState } from "react";
import { ALL, DOMESTRIC, INTERNATIONAL, LIVE, RESULTS, UPCOMING } from "./constants/contants";
import "./index.css";
import ProgressBar from "./ProgressBar";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { URI } from './apis/config';
import { newSchedule } from "./apis/quieries";
import ArrowIcon from './assets/arrow.svg';
import NotifIcon from './assets/notif_icon.svg';
import LocationIcon from './assets/location_icon.svg';

const App = () => {
  const [ activeTab, setActiveTab ] = useState( UPCOMING );
  const [ activeType, setActiveType ] = useState( ALL );
  const [ matchData, setMatchData ] = useState( [] );

  const httpLink = new HttpLink( {
    uri: URI,
  } );

  const client = new ApolloClient( {
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      // watchQuery: {
      //   fetchPolicy: 'cache-and-network',
      // },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  } );

  useEffect( () => {
    client
      .query( {
        query: newSchedule,
        variables: { type: activeType, status: activeTab, page: 1 },
      } )
      .then( ( res ) => {
        setMatchData( res?.data?.newSchedule ? res?.data?.newSchedule : [] );
      } ).catch( e => {
        console.log( 'error===>', e );
      } );
  }, [ activeTab, activeType ] );

  return (
    <div className={ `bg-white-800 text-gray-100 scrollbar-hide flex flex-col  text-2xl` }>
      <div className={ `bg-slate-800 ${ matchData?.length === 0 ? 'h-screen' : ' h-[ 100 %]' } scrollbar-hide` }>
        <p className="justify-center items-center text-xl font-semibold ml-5 mt-2">Schedule</p>

        <div className="mt-5 flex w-[100%] border-1 overscroll-none">
          <div onClick={ () => setActiveTab( UPCOMING ) } className={ `w-[33%] flex flex-col items-center border-b-4 pb-2 ${ activeTab === UPCOMING ? 'border-cyan-700 ' : ' border-slate-600' }` }>
            <p className={ `justify-center items-center text-base ${ activeTab === UPCOMING ? 'text-cyan-600 ' : '  text-gray-500 ' }` } >Upcoming</p>
          </div>

          <div onClick={ () => setActiveTab( LIVE ) } className={ `w-[33%] flex flex-col items-center border-b-4 pb-2 ${ activeTab === LIVE ? 'border-cyan-700' : 'border-slate-600' }` }>
            <p className={ `justify-center items-center text-base ${ activeTab === LIVE ? 'text-cyan-600 ' : '  text-gray-500 ' }` }>Live</p>
          </div>
          <div onClick={ () => setActiveTab( RESULTS ) } className={ `w-[33%] flex flex-col items-center border-b-4 pb-2 ${ activeTab === RESULTS ? 'border-cyan-700' : 'border-slate-600' }` }>
            <p className={ `justify-center items-center text-base ${ activeTab === RESULTS ? 'text-cyan-600 ' : '  text-gray-500 ' }` }>Results</p>
          </div>
        </div>

        <div className="mx-4 mt-2 mb-4 flex bg-gray-700 p-0.5 rounded-full" >
          <div onClick={ () => setActiveType( ALL ) } className={ `w-[33%] flex flex-col justify-center items-center py-3  ${ activeType === ALL ? 'border-2 border-green-700 rounded-full bg-slate-800' : null }` }>
            <p className={ `justify-center items-center text-xs font-medium ` } >ALL</p>
          </div>

          <div onClick={ () => setActiveType( INTERNATIONAL ) } className={ `w-[33%] flex flex-col items-center py-3 ${ activeType === INTERNATIONAL ? 'border-2 border-green-700 rounded-full bg-slate-800' : null }` }>
            <p className={ `justify-center items-center text-xs font-medium ` }>INTERNATIONAL</p>
          </div>
          <div onClick={ () => setActiveType( DOMESTRIC ) } className={ `w-[33%] flex flex-col items-center py-3 ${ activeType === DOMESTRIC ? 'border-2 border-green-700 rounded-full bg-slate-800' : null }` }>
            <p className={ `justify-center items-center text-xs font-medium` }>DOMESTRIC</p>
          </div>
        </div>

        <div className=" mb-10 ">
          { matchData.length !== 0 && matchData.map( ( series ) => (
            <>
              <div className={ `mt-6 mb-2 mx-2 bg-gray-700 flex items-center justify-between rounded-2xl p-3 w-'100% ` }>
                <div className="flex items-center ">
                  <div className="h-7 w-11 bg-red-500 rounded-md flex justify-center items-center" >
                    <p className="text-sm font-medium">{ series.league.slice( 0, 3 ).toUpperCase() }</p>
                  </div>
                  <p className="text-sm	ml-2 font-semibold" >{ series.seriesName }</p>
                </div>

                {/* <div className="w-6 h-0.5 bg-green-500 mr-5" ></div> */ }
                <img src={ ArrowIcon } />
              </div>

              <div className="flex overflow-x-scroll mt-3 scrollbar-hide">
                { series?.matches?.length !== 0 && series?.matches.map( ( match ) => (
                  <div className="bg-gray-700 shrink-0 p-4 w-80 ml-2 mr-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="">
                        <div className="flex">
                          <p className="text-gray-400	text-lg flex items-center">{ match.matchType }</p>
                          <div className="py-1 px-2 flex items-center border-2	border-cyan-500 ml-3 rounded-full ">
                            <div className="bg-cyan-500 w-2 h-2 rounded-full " />
                            <p className="text-cyan-500 text-sm pl-1.5" >{ match.matchStatus.toUpperCase() }</p>
                          </div>
                        </div>

                        <div className="flex items-center mt-2">
                          <img src={ LocationIcon } />
                          <p className="text-gray-400	text-sm ml-2">{ match.venue }</p>
                        </div>
                      </div>

                      <div className="h-10 w-10 rounded-md flex justify-center items-center bg-gray-800 ">
                        <img src={ NotifIcon } />
                      </div>
                    </div>

                    <div className="pt-3 pb-6 bg-gray-800 mt-2 rounded flex justify-between px-3">
                      <div className="flex items-center ">
                        <div className="w-10 h-6 bg-red-500"></div>
                        <p className="text-base ml-2">{ match.homeTeamName }</p>
                      </div>

                      <div className="border-2 border-lime-600 px-2 rounded-full">
                        <p className="text-base text-lime-600">{ match.matchType }</p>
                      </div>

                      <div className="flex items-center ">
                        <p className="text-base mr-2">{ match.awayTeamName }</p>
                        <div className="w-10 h-6 bg-green-900"></div>
                      </div>
                    </div>

                    <div className="my-3 p-2 flex justify-center bg-gray-800 items-center rounded">
                      <p className="text-gray-50 font-medium text-sm">{ match.matchdate }</p>
                    </div>

                    <div className="mt-5">
                      <p className="text-gray-400 text-sm">WIN PERCENTAGE</p>
                      <ProgressBar percentage='54' />
                    </div>
                  </div>
                ) ) }
              </div>
            </>
          ) )
          }
        </div>
      </div>
    </div>
  );
};

export default App;
