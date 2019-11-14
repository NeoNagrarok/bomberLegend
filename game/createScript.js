let nbPlayersSelect = document.getElementById("nbPlayers");
let value = nbPlayersSelect.value;
for (let i = 1; i <= value; i++)
{
	let node = document.getElementById('p' + i);
	node.className = "show";
	node.previousSibling.className = "show";
	node.nextSibling.className = "show";
}
let buffer = parseInt(value);

function getValue()
{
	/* TO DO don't forget label node wich is previous lement than nbPlayersSelect */
	value = parseInt(nbPlayersSelect.value);
	//console.log("value " + value);
	for (i = 3; i <= value; i++)
	{
		let node = document.getElementById('p' + i);
		node.className = "show";
		node.previousSibling.className = "show";
		node.nextSibling.className = "show";
	}
	//console.log("buffer " + buffer);
	if (value < buffer)
		for (i = buffer; i > value; i--)
		{
			let node = document.getElementById('p' + i);
			node.className = "hidden";
			node.previousSibling.className = "hidden";
			node.nextSibling.className = "hidden";
		}
	buffer = value;
}

nbPlayersSelect.addEventListener('change', getValue);

/*************************************************************/

let nbRoundNode = document.getElementById("nbRound");
let node = document.getElementById("superBomber");
allowSuper();

function allowSuper()
{
	nbRound = nbRoundNode.value;
	if (nbRound > 1)
		node.className = "show";
	else
		node.className = "hidden";
}

nbRoundNode.addEventListener('change', allowSuper);
