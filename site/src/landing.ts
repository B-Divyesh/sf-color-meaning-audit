import './site';

if (new URLSearchParams(location.search).get('demo') === '1') {
  location.replace('/demo/?demo=1');
}
