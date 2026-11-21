(function(){
  var pages = ['home', 'about', 'services', 'contact', 'terms'];
  var nav = document.getElementById('nav');

  function route(){
    var h = (location.hash.replace('#/', '') || 'home');
    if (pages.indexOf(h) < 0) h = 'home';
    pages.forEach(function(p){
      document.getElementById(p).classList.toggle('on', p === h);
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.classList.toggle('on', a.getAttribute('href') === '#/' + h);
    });
    nav.classList.remove('open');
    window.scrollTo(0, 0);
    reveal();
  }

  var io;
  function reveal(){
    if (io) io.disconnect();
    io = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (e.isIntersecting){
          e.target.classList.add('vis');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.page.on .rv').forEach(function(el){
      el.classList.remove('vis');
      io.observe(el);
    });
  }

  window.addEventListener('hashchange', route);
  route();

  document.getElementById('bg').onclick = function(){
    nav.classList.toggle('open');
  };

  document.getElementById('f').onsubmit = function(e){
    e.preventDefault();
    document.getElementById('ok').style.display = 'block';
    e.target.reset();
  };
})();
