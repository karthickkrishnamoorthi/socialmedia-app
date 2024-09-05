import React from 'react';
import Posts from './Posts';
import MiniProfile from './MiniProfile';


const Feed = () => {
  return (
    <>
        <main className='grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto'>
            <section className='md:col-span-1'>
                <Posts/>
            </section>
            <section className='hidden md:lnline-grid md:col-span-1'>
                <MiniProfile/>
            </section>

        </main>
    
    </>
  )
}

export default Feed