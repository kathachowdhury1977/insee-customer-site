import React, { useEffect, useState } from 'react'
import Loading from '../Loader/Loading';

const DbdLogo = () => { 
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=> {
        const scriptTag = document.createElement('script');
        scriptTag.src="https://www.trustmarkthai.com/callbackData/initialize.js?t=0923338ffb-17-5-d63345e769841adfef5b22d16b038d044f1";
        scriptTag.addEventListener('load', ()=>setIsLoading(true));
        document.body.appendChild(scriptTag);
        
    },[])
    useEffect(()=>{
        if(!isLoading)return;
    },[isLoading])
    return (
        <div className='dbdLogoLogin'>
            {
                isLoading ?<div id="Certificate-banners"></div> : ''
            }
            
        </div>
    )

}


export default (DbdLogo)