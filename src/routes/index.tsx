import React, { useEffect } from 'react';
import AuthStack from './authStack';
import MainStack from './mainStack';
// import { useDispatch, useSelector } from 'react-redux';

const Routes = () => {
// const { isLoggedIn } = useSelector((state: any) => state.user);

//   return <>{isLoggedIn ? <MainStack /> : <AuthStack />}</>;
return  <MainStack />
};

export default Routes;
