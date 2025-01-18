'use client';

import React, { lazy, Suspense, useState } from 'react';
import Link from 'next/link';
import routes from '@/data/routes';

const Menu = lazy(() => import('react-burger-menu/lib/menus/slide.js'));

const Hamburger = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="hamburger-container">
      <nav className="main" id="hambuger-nav">
        <ul>
          {open ? (
            <li className="menu close-menu">
              <div onClick={() => setOpen(!open)} className="menu-hover">
                &#10005;
              </div>
            </li>
          ) : (
            <li className="menu open-menu">
              <div onClick={() => setOpen(!open)} className="menu-hover">
                &#9776;
              </div>
            </li>
          )}
        </ul>
      </nav>
      <Suspense fallback={<></>}>
        <Menu right isOpen={open}>
          <ul className="hamburger-ul">
            {routes.map(l => (
              <li key={l.label}>
                <Link href={l.path} onClick={() => setOpen(!open)}>
                  <h3 className={l.index ? 'index-li' : undefined}>{l.label}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </Menu>
      </Suspense>
    </div>
  );
};

export default Hamburger;
