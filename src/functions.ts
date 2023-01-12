import {
	createClient,
	configureChains,
	mainnet,
	watchAccount,
	disconnect,
} from '@wagmi/core';
import { publicProvider } from '@wagmi/core/providers/public';
import { connect } from '@wagmi/core';
import { InjectedConnector } from '@wagmi/core/connectors/injected';

// main wagmi configuration setup
export function configureMainWagmi() {
	const { provider, webSocketProvider } = configureChains(
		[mainnet],
		[publicProvider()]
	);

	const client = createClient({
		autoConnect: true,
		provider,
		webSocketProvider,
	});
}

export function setupConnect(element: HTMLButtonElement) {
	element.addEventListener('click', () => connectWallet());
}

export function setupDisconnect(element: HTMLButtonElement) {
	element.addEventListener('click', () => disconnect());
}

export async function connectWallet() {
	try {
		const result = await connect({
			connector: new InjectedConnector(),
		});
		console.log(result);
		return result;
	} catch (error) {
		console.log(error);
	}
}

export function watchAccountSetup(
	connectElement: HTMLButtonElement,
	disconnectElement: HTMLButtonElement,
	addressElement: HTMLButtonElement
) {
	// setup event listener for account changes
	const unwatch = watchAccount(
		({ address, isConnected, isConnecting, status }) => {
			// hide and show buttons depending on connected state
			if (status === 'connected') {
				connectElement.style.display = 'none';
				disconnectElement.style.display = 'block';
			} else {
				connectElement.style.display = 'block';
				disconnectElement.style.display = 'none';
			}

			addressElement.innerHTML = `${address ? address : 'not connected'}`;
		}
	);
}

// export function setupCounter(element: HTMLButtonElement) {
//   let counter = 0
//   const setCounter = (count: number) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }
