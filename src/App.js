import { useState, useEffect } from "react";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
	const [searchField, setSearchField] = useState("");
	const [title, setTitle] = useState("");
	const [monsters, setMonsters] = useState([]);
	const [filteredMonsters, setFilteredMonsters] = useState(monsters);

	console.log("rendered");

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((users) => setMonsters(users));
	}, []);

	useEffect(() => {
		const newFilteredMonsters = monsters.filter((monster) => {
			return monster.name.toLowerCase().includes(searchField);
		});
		setFilteredMonsters(newFilteredMonsters);
	}, [monsters, searchField]);

	const onSearchChange = (event) => {
		const searchFieldString = event.target.value.toLowerCase();
		setSearchField(searchFieldString);
	};

	const onTitleChange = (event) => {
		const searchFieldString = event.target.value.toLowerCase();
		setTitle(searchFieldString);
	};

	return (
		<div className="App">
			<h1 className="app-title">{title}</h1>

			<SearchBox
				onChangeHandler={onSearchChange}
				placeholder="Search monsters"
				className="search-box"
			/>
			<br />
			<SearchBox
				onChangeHandler={onTitleChange}
				placeholder="Set title"
				className="search-box"
			/>

			<CardList monsters={filteredMonsters} key={monsters.id} />
		</div>
	);
};

export default App;
