import { useNavigate } from 'react-router-dom';
function Dropdown({name,Token,Username,RoutePath}) {
  const navigate = useNavigate();

  const navigateTo = () => {
    // const navString = `/home/${name}`;
    // console.log(navString);
    navigate(RoutePath,{ state: {Token,Username} });//the token is put to the navigate wala so that we can access it in it and sent a request to home so that only then can access it
  };
  return (
    <button onClick={navigateTo}>{name}</button>
  );
}

export default Dropdown;
