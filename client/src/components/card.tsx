import React from 'react';
import { useNavigate } from 'react-router-dom';
function CardOne({name,Token,Username,RoutePath}) {
  const navigate = useNavigate();

  const navigateTo = () => {
    // const navString = `/home/${name}`;
    // console.log(navString);
    navigate(RoutePath,{ state: {Token,Username} });//the token is put to the navigate wala so that we can access it in it and sent a request to home so that only then can access it
  };
  return (
    <div className="relative h-[180px] w-[180px] rounded-md shadow-lg hover:transform hover:scale-105 transition-transform duration-300 hover:bg-blue-500">
      <img
        src="/news.jpg"
        alt={name}
        className="z-0 h-full w-full rounded-md object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-left">
        <button className="mt-1 inline-flex cursor-pointer items-center text-sm font-semibold text-white rounded-md shadow-md bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={navigateTo}>
          {name} &rarr;
        </button>
      </div>
    </div>
  );
}

export default CardOne;
