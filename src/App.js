import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

import AuthProvider from './contexts/AuthContext'
import RequestProvider from './contexts/RequestContext'
import { isLogged } from './services/auth'

import Routes from './routes/Routes'

// Base Components
import { Template, Body } from './components/MainStyles'
import Footer from './components/Footer'
import Toolbar from './components/Toolbar'

const App = () => {

	const logged = isLogged()

	return (
		<BrowserRouter>
			<AuthProvider>
				<RequestProvider>

					<Template>

						{logged && <Toolbar />}

						<Body>

							<Routes />

						</Body>

						<Footer />

					</Template>

				</RequestProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App
