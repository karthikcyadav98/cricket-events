import React from 'react';

const ProgressBar = ( { homeTeam, awayTeam, percentage } ) => {
  return (
    <div>
      <div className='flex mt-2.5'>
        <div style={ { width: `${ ( percentage ) }%` } } className={ `h-2 bg-lime-500 rounded-l-full` }></div>
        <div style={ { width: `${ ( 100 - percentage ) }%` } } className={ `h-2 bg-gray-50 rounded-r-full ` }></div>
      </div>

      <div className='flex justify-between mt-3 mb-2'>
        <div className='flex items-center'>
          <div className='w-1.5 h-1.5 bg-lime-500 rounded-full'></div>
          <p className='text-sm ml-1 text-gray-400'>{ homeTeam }({ percentage }%)</p>
        </div>

        <div className='flex items-center'>
          <div className='w-1.5 h-1.5 bg-gray-50 rounded-full'></div>
          <p className='text-sm ml-1 text-gray-400'>{ awayTeam }({ 100 - percentage }%)</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;