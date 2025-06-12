import{a as u,S as d,i}from"./assets/vendor-CrlV4O_2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const p="50757194-f2b273e514caa2f992e1a47fc",f=async r=>{try{return(await u.get("https://pixabay.com/api/",{params:{key:p,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data.hits}catch(t){throw console.error("Error fetching data:",t),t}};let l;const y=r=>{const t=document.querySelector(".gallery"),a=r.map(s=>`
        <li class="gallery-item">
            <a href="${s.largeImageURL}" class="lightbox">
                <img src="${s.webformatURL}" alt="${s.tags}" />
            </a>
            <div class="image-info">
                <p><strong>Likes</strong> ${s.likes}</p>
                <p><strong>Views</strong> ${s.views}</p>
                <p><strong>Comments</strong> ${s.comments}</p>
                <p><strong>Downloads</strong> ${s.downloads}</p>
            </div>
        </li>
    `).join("");t.innerHTML=a,l?l.refresh():l=new d(".gallery a",{captionsData:"alt",captionDelay:250})},g=()=>{const r=document.querySelector(".gallery");r.innerHTML=""},m=()=>{const r=document.querySelector(".loader");r.style.display="block"},h=()=>{const r=document.querySelector(".loader");r.style.display="none"},c=document.querySelector(".form");document.querySelector(".gallery");c.addEventListener("submit",r=>{r.preventDefault();const t=c.elements["search-text"].value.trim();if(!t){i.error({title:"Error",message:"Please enter a search term",position:"topRight"});return}g(),m(),f(t).then(a=>{if(a.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(a)}).catch(a=>{i.error({message:"An error occurred while fetching images. Please try again later.",position:"topRight"})}).finally(()=>{h()}),c.elements["search-text"].value=""});
//# sourceMappingURL=index.js.map
