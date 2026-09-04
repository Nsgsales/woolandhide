
document.addEventListener('click',(e)=>{
  const card=e.target.closest('.product');
  if(card){
    const modal=document.querySelector('.modal');
    const main=modal.querySelector('.modal-image');
    const thumbs=modal.querySelector('.modal-thumbs');
    const gallery=(card.dataset.gallery||card.dataset.image).split('|');

    main.src=gallery[0];
    modal.querySelector('.modal-title').textContent=card.dataset.title;
    modal.querySelector('.modal-desc').textContent=card.dataset.desc;
    modal.querySelector('.modal-material').textContent=card.dataset.material||'';

    if(thumbs){
      const labels=['Worn view','Product view','Material detail'];
      thumbs.innerHTML='';
      gallery.forEach((src,i)=>{
        const b=document.createElement('button');
        b.className='modal-thumb'+(i===0?' active':'');
        b.innerHTML=`<img src="${src}" alt=""><span class="view-label">${labels[i]||'View '+(i+1)}</span>`;
        b.addEventListener('click',(ev)=>{
          ev.stopPropagation();
          main.src=src;
          thumbs.querySelectorAll('.modal-thumb').forEach(x=>x.classList.remove('active'));
          b.classList.add('active');
        });
        thumbs.appendChild(b);
      });
      thumbs.style.display=gallery.length>1?'grid':'none';
    }

    modal.classList.add('open');
    document.body.style.overflow='hidden';
    return;
  }
  if(e.target.matches('.close')||e.target.classList.contains('modal')){
    document.querySelector('.modal')?.classList.remove('open');
    document.body.style.overflow='';
  }
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    document.querySelector('.modal')?.classList.remove('open');
    document.body.style.overflow='';
  }
});
