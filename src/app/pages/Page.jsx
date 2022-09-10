import React from 'react';
import { Outlet } from 'react-router-dom';

const Page = () => {
  return (
    <div className='container-view'>
      <Outlet />
    </div>
  );
};

export default Page;
