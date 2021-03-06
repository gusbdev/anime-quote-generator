
import { useCallback, useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { animeTitles } from "./store";
import Homepage from "./pages/home";
import Animepage from "./pages/anime";

const App = () => {
	const setTitles = useSetRecoilState(animeTitles);

	const fetchAnimes = useCallback(async () => {
		try {
			const res = await axios.get(
				"https://animechan.vercel.app/api/available/anime"
			);

			setTitles(res?.data);
		} catch (error) {
			console.log(error?.response?.data?.error);
		}
	}, [setTitles]);

	useEffect(() => {
		fetchAnimes();
	}, [fetchAnimes]);

	return (
		<HashRouter>
			<Switch>
				<Route exact path="/" component={Homepage} />
				<Route exact path="/anime/:name" component={Animepage} />
			</Switch>
		</HashRouter>
	);
};

export default App;