import './site';

const download = document.querySelector<HTMLAnchorElement>('#install-download')!;
const status = document.querySelector<HTMLElement>('#install-status')!;

if (new URLSearchParams(location.search).get('download') === '1') {
  download.click();
  status.textContent = 'Your extension ZIP download has started.';
  history.replaceState(null, '', '/install/');
}
