// styles
import './style.css';

// functions
import {
	configureMainWagmi,
	setupConnect,
	watchAccountSetup,
	setupDisconnect,
} from './functions';

// HTML part
document.querySelector<HTMLDivElement>('#app')!.innerHTML = /* html */ `
  <div>
    <button id='connectBtn'>Connect</button>
    <button id='disconnectBtn'>Disconnect</button>
    <div id='address'></div>
  </div>
`;

// JS part
configureMainWagmi();
watchAccountSetup(
	document.querySelector<HTMLButtonElement>('#connectBtn')!,
	document.querySelector<HTMLButtonElement>('#disconnectBtn')!,
	document.querySelector<HTMLButtonElement>('#address')!
);
setupConnect(document.querySelector<HTMLButtonElement>('#connectBtn')!);
setupDisconnect(document.querySelector<HTMLButtonElement>('#disconnectBtn')!);
