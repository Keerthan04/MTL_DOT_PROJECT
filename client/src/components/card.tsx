import React from 'react';

function CardOne(props) {
  return (
    <div className="relative h-[150px] w-[150px] rounded-md shadow-lg">
      <img
        src="/news.jpg"
        alt={props.name}
        className="z-0 h-full w-full rounded-md object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-left">
        <button className="mt-1 inline-flex cursor-pointer items-center text-sm font-semibold text-white rounded-md shadow-md bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {props.name} &rarr;
        </button>
      </div>
    </div>
  );
}

export default CardOne;
