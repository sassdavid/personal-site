import React from 'react';
import Navigation from '@/components/template/Navigation';
import SideBar from '@/components/template/SideBar';

type MainProps = {
  children: React.ReactNode;
};

const Main: React.FC<MainProps> = ({ children }) => (
  <div id="wrapper">
    <Navigation />
    <div id="main">{children}</div>
    <SideBar />
  </div>
);

export default Main;
