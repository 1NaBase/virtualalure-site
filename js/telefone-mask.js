const telefone = document.getElementById('telefone');

telefone.addEventListener('input', function(e) {
  let x = e.target.value.replace(/\D/g, '').slice(0, 11);
  if(x.length > 0) x = '(' + x;
  if(x.length > 3) x = x.slice(0,3) + ') ' + x.slice(3);
  if(x.length > 10) x = x.slice(0,10) + '-' + x.slice(10);
  e.target.value = x;
});
