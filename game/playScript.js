const BOMB_DURATION = 6;
const BOMB_POWER = 1;
const INTERVAL = 1; // The duration between each function for movement animation
const TIME_TO_RELOAD = 320; // The duration for the permission to make an other action
const ANIMATION_SPEED = 1; // The speed for movement animation in X or Y direction
const FRAME = 80; // Total duration of animation (used for destruction and may be dead animations
const ANIMATION_DESTRUCT = 1; // Interval for destruction animation
const ANIMATION_DESTRUCT_SPEED = Math.floor(FRAME / 5); // Speed of destruction animation based on FRAME const
const ANIMATION_DIE = 8;
const ANIMATION_DIE_SPEED = Math.floor(FRAME / 4);

function shuffle(array)
{
	array.sort(() => Math.random() - 0.5);
}

function shuffleReturn(array)
{
	let copy = array;
	copy.sort(() => Math.random() - 0.5);
	return copy;
}

function rdmBtw(min, max)
{
	return Math.floor(Math.random() * (max - min)) + min;
}

function getMin(a, b)
{
	if (a < b)
		return a;
	return b;
}

function getMax(a, b)
{
	if (a > b)
		return a;
	return b;
}

class Bomb
{
    constructor()
    {
        this.duration = BOMB_DURATION;
        this.power = BOMB_POWER;
        this.type = 'basic';
		this.imgOne = new Image();
		this.imgOne.src = '../game/images/bombs/bomb1.png';
		this.imgTwo = new Image();
		this.imgTwo.src = '../game/images/bombs/bomb2Bis.png';
		this.imgThree = new Image();
		this.imgThree.src = '../game/images/bombs/bomb3Bis.png';
		this.img = this.imgOne;
    }

    setBomb(bomb)
	{
		this.duration = bomb.duration;
		this.power = bomb.power;
		this.type = bomb.type;
	}

	getConsequences(map, bombObject, x, y)
	{
		let bomberTab = map.getBomberByPos(x, y);
		let newBombObject = map.getBombByPos(x, y);
		map.map[x][y].destruct(x, y);
		if (bomberTab !== null)
		{
			let bomberLength = bomberTab.length;
			for (let k = 0; k < bomberLength; k++)
				bomberTab[k].die(bombObject.bomberman);
		}
		if (newBombObject !== null && newBombObject.id != bombObject.id)
            newBombObject.bomb.explode(newBombObject);
	}

	explode(bombObject)
	{
		console.log('BOOM at x :' + bombObject.x, ' y : ' + bombObject.y);
		document.getElementById(bombObject.id).remove();
		let roseTab = [[1, bombObject.x],[-1, bombObject.x],[1, bombObject.y],[-1, bombObject.y]];
		let power = bombObject.bomb.power;
		let coord = null;
        let map = bombObject.bomberman.map;
        map.map[bombObject.x][bombObject.y].isBomb = false;
        map.bombTab.splice(map.bombTab.indexOf(bombObject), 1);
		this.getConsequences(map, bombObject, bombObject.x, bombObject.y);
		for (let i = 0; i < 4; i++)
			for (let j = 0; j < power; j++)
			{
				if (i < 2)
					coord = [roseTab[i][1] + ((j + 1) * roseTab[i][0]), bombObject.y];
				else
					coord = [bombObject.x, roseTab[i][1] + ((j + 1) * roseTab[i][0])];
				let x = coord[0];
				let y = coord[1];
				console.log('Also boom At : ' + x + ' : ' + y);
                let maxX = parseInt(bombObject.bomberman.map.x);
                let maxY = parseInt(bombObject.bomberman.map.y);
                if (x >= 0 && x < maxX && y >= 0 && y < maxY)
    				this.getConsequences(map, bombObject, x, y);
			}
        bombObject.bomberman.maxBombs++;
	}
}

class Bomberman
{
	constructor(player, x, y, map)
	{
		this.player = player;
		this.x = parseInt(x);
		this.y = parseInt(y);
		this.map = map;
		this.alive = true;
		this.direction = 'bomberBottom';
		this.bomb = new Bomb();
		this.maxBombs = 5;
		this.startX = parseInt(x);
		this.startY = parseInt(y);
	}
	
	getPos()
	{
		return new Array(this.x, this.y);
	}

	putBomb()
	{
		let newBomb = new Bomb();
		newBomb.setBomb(this.bomb);
		console.log('x Bomb : ' + this.x + ' Y Bomb : ' + this.y);
		let top = (this.x - this.startX) * 64;
		let left = (this.y - this.startY) * 64;
		let newNode = document.createElement('span');
		newNode.id = 'bomb' + (this.map.idBomb);
		this.map.idBomb++;
		newNode.className = 'bomb';
		newNode.appendChild(newBomb.img);
		newNode.style.left = left.toString() + 'px';
		newNode.style.top = top.toString() + 'px';
		this.map.bombTab.push({'bomb' : newBomb, 'x' : this.x, 'y' : this.y, 'bomberman' : this, 'top' : top, 'left' : left, 'id' : newNode.id});
		this.map.map[this.x][this.y].isBomb = true;
		let parent = document.getElementById(this.player).parentNode;
		parent.appendChild(newNode);
		this.maxBombs--;
	}

	die(killer)
	{
		if (this.alive === true)
		{
			let pk = killer.player;
			if (pk != this.player)
				console.log('Bomberman ' + this.player + ' is dead killed by ' + pk);
			else
				console.log('It\'s so bad, ' + pk + ' killed himself ... ;)');
			let spanBomberman = document.getElementById(this.player);
			spanBomberman.innerHTML = '';
			let idPlayer = this.player.replace(' ', '_');
			let preloadedImgTab = new Array();
			preloadedImgTab[0] = new Image();
			preloadedImgTab[0].src = '../game/images/soul/004.png';
			preloadedImgTab[0].id = idPlayer + 'soul';
			preloadedImgTab[1] = new Image();
			preloadedImgTab[1].src = '../game/images/soul/003.png';
			preloadedImgTab[1].id = idPlayer + 'soul';
			preloadedImgTab[2] = new Image();
			preloadedImgTab[2].src = '../game/images/soul/002.png';
			preloadedImgTab[2].id = idPlayer + 'soul';
			preloadedImgTab[3] = new Image();
			preloadedImgTab[3].src = '../game/images/soul/001.png';
			preloadedImgTab[3].id = idPlayer + 'soul';
			let frame = FRAME;
			let id = setInterval(dieAnimation, ANIMATION_DIE);
			let top = (this.x - this.startX) * 64;
			let left = (this.y - this.startY) * 64;
			function dieAnimation()
			{
				let index = Math.ceil(frame / ANIMATION_DIE_SPEED)
				let playerSoul = document.getElementById(idPlayer + 'soul');
				if (playerSoul !== null)
					playerSoul.remove();
				if (index == 0)
					clearInterval(id);
				else
				{
					top -= 0.5;
					spanBomberman.appendChild(preloadedImgTab[index - 1]);
					spanBomberman.style.top = top + 'px';
					spanBomberman.style.left = left + 'px';
				}
				frame--;
				console.log('Die index : ' + index);
			}
			this.alive = false;
		}
	//	TODO don't forget to add an animation for the dead of the bomberman
	}
}

class CaseMap
{
	constructor(type)
	{
		this.allTypes = ["block", "stone", "sand", "granite", "explosive", "empty"];
		this.allDraw = [this.drawBlock,
						this.drawStone,
						this.drawSand,
						this.drawGranite,
						this.drawExplosive,
						this.drawEmpty];
		this.type = type;
		this.map;
		this.startPoint = false;
		this.bomberman = '';
		this.isBomb = false;
	}
	
	drawCase()
	{
		let html = '';
		let index = this.allTypes.indexOf(this.type);
		if (index == -1)
		{
			this.type = 'empty';
			index = 5;
		}
		html += this.allDraw[index]();
		return html;
	}
	
	drawBlock()
	{
		return 'block';
	}
	
	drawStone()
	{
		return 'stone';
	}
	
	drawSand()
	{
		return 'sand';
	}
	
	drawGranite()
	{
		return 'granite';
	}
	
	drawExplosive()
	{
		return 'explosive';
	}
	
	drawEmpty()
	{
		return 'empty';
	}

	destruct(x, y)
	{
		if (this.type != 'empty' && this.type != 'block')
		{
			console.log('I am desctructed ! My previous type was : ' + this.type);
			this.type = 'empty';
			let caseDestructed = document.getElementById('case' + x + '_' + y);
			caseDestructed.className = 'empty';
            let prelodedImgTab = new Array();
            prelodedImgTab[4] = new Image();
            prelodedImgTab[4].src = '../game/images/caseDestruction/001.png';
            prelodedImgTab[4].id = 'destruct' + x + '_' + y;
            prelodedImgTab[3] = new Image();
            prelodedImgTab[3].src = '../game/images/caseDestruction/002.png';
            prelodedImgTab[3].id = 'destruct' + x + '_' + y;
            prelodedImgTab[2] = new Image();
            prelodedImgTab[2].src = '../game/images/caseDestruction/003.png';
            prelodedImgTab[2].id = 'destruct' + x + '_' + y;
            prelodedImgTab[1] = new Image();
            prelodedImgTab[1].src = '../game/images/caseDestruction/004.png';
            prelodedImgTab[1].id = 'destruct' + x + '_' + y;
            prelodedImgTab[0] = new Image();
            prelodedImgTab[0].src = '../game/images/caseDestruction/005.png';
            prelodedImgTab[0].id = 'destruct' + x + '_' + y;
            let frame = FRAME;
            let id = setInterval(desctructAnim, ANIMATION_DESTRUCT);
            function desctructAnim()
            {
                let index = Math.ceil(frame / ANIMATION_DESTRUCT_SPEED);
                let element = document.getElementById('destruct' + x + '_' + y);
                if (element !== null)
                    element.remove();
                if (index == 0)
                    clearInterval(id);
                else
                    caseDestructed.appendChild(prelodedImgTab[index - 1]);
                frame--;
                console.log('case destruction index : ' + index);
            }
        }
	//	TODO don't forget to implement many behaviors dependent of what type is the block destructed !
	}
}

class MapGenerator
{
    constructor(postTab, playerTab, connectedPlayers)
    {
        this.postTab = postTab;
        this.playerTab = playerTab;
        this.connectedPlayers = connectedPlayers;
        for (let i = 0; i < this.playerTab.length; i++)
        	if (typeof(this.playerTab[i]) !== 'undefined')
				if (typeof(this.connectedPlayers[i]) !== 'undefined')
					this.playerTab[i] = this.connectedPlayers[i];
        console.log('-------------------------------');
        //this.allTypes = ["block", "stone", "sand", "granite", "explosive", "empty"];
        this.probaTypes = [0, 100, 8, 8, 1, 4];
		let probaLength = this.probaTypes.length;
        this.allTypes = new Array();
        this.allTypes.push('block');
        if ("stone" in postTab)
        	this.allTypes.push('stone');
        if ("sand" in postTab)
        	this.allTypes.push('sand');
        if ("granite" in postTab)
        	this.allTypes.push('granite');
        if ("explosive" in postTab)
        	this.allTypes.push('explosive');
        let currentLength = this.allTypes.length;
        let diff = probaLength - currentLength;
        console.log('diff : ' + diff);
        if (diff)
        	for (let i = diff; i > 1; i--)
        		this.allTypes.push(this.allTypes[Math.floor(Math.random() * (currentLength - 1)) + 1]);
        this.allTypes.push('empty');
        console.log(this.allTypes);
		//console.log("probalength : " + probaLength);
		this.allTypesProba = new Array();
		for (let i = 0; i < probaLength; i++)
			for (let j = this.probaTypes[i]; j > 0; j--)
				this.allTypesProba.push(this.allTypes[i]);
		shuffle(this.allTypesProba);
		console.log('allTypesProba : ' + this.allTypesProba);
        this.sizeTab = {"verySmallSquare" : "5x5",
					"smallSquare" : "15x15",
					"normalSquare" : "27x27",
					"bigSquare" : "51x51",
					"veryBigSquare" : "99x99x",
					"verySmallRect" : "3x11",
					"smallRect" : "6x21",
					"normalRect" : "12x41",
					"bigRect" : "24x81",
					"veryBigRect" : "48x161"};
		this.size = this.setSize();
		let tabSize = this.size.split('x');
   		this.x = parseInt(tabSize[0]);
   		this.y = parseInt(tabSize[1]);
   		this.map = new Array(this.x);
   		for (let i = 0; i < this.x; i++)
   			this.map[i] = new Array(this.y);
   			
   		this.tabPlayers = new Array();
   		this.nbPlayers = this.setNbPlayers();
   		for (let i = 0; i < this.nbPlayers; i++)
   		{
   			let j = i + 1;
   			this.tabPlayers[i] = postTab['p' + j];
   		}
   		this.tabStartPoint = new Array();
   		this.tabBomberman = new Array();
   		this.bombTab = new Array();
   		this.idBomb = 0;
    }
    
    setNbPlayers()
    {
    	let nbPlayers = 2;
    	if ("nbPlayers" in this.postTab)
    		nbPlayers = this.postTab["nbPlayers"];
    	return nbPlayers;
    }
    
   	setSize()
   	{
   		let size = 'normalSquare';
		if ("size" in this.postTab)
			size = this.postTab["size"];
   		return this.sizeTab[size];
   	}
   	
   	classicRandomLoading(x, y)
   	{
   		if (x % 2 != 0 && y % 2 != 0)
   			return new CaseMap("block");
   		else
   		{
   			let type = Math.floor(Math.random() * this.allTypesProba.length);
   			return new CaseMap(this.allTypesProba[type]);
   		}
   		return new CaseMap("empty");
   	}
   	
   	calculRandomCoordinate(originX, originY, directionX, directionY, maxX, maxY)
   	{
   		console.log(originX + ' : ' + originY + ' : ' + directionX + ' : ' + directionY + ' : ' + maxX + ' : ' + maxY);
   		let tmp;
   		if (directionX == '-')
   		{
   			tmp = originX;
   			originX = originX - maxX;
   			maxX = tmp;
   		}
   		else
   			maxX = maxX + originX;
   		if (directionY == '-')
   		{
   			tmp = originY;
   			originY = originY - maxY;
   			maxY = tmp;
   		}
   		else
   			maxY = maxY + originY;
   		
   		let rdmX = rdmBtw(getMin(originX, maxX), getMax(originX, maxX));
   		let rdmY = rdmBtw(getMin(originY, maxY), getMax(originY, maxY));
   		if (rdmX % 2 != 0 && rdmY % 2 != 0)
   		{
   			let rdmChange = Math.floor(Math.random() * 2);
   			if (rdmChange % 2 == 0)
   				rdmX = rdmX - 1;
   			else
   				rdmY = rdmY - 1;
   				console.log('change coordinates');
   		}
   		let result = rdmX + ':' + rdmY;
   		console.log(result);
   		return result;
   	}
   	
   	setStartPoints()
   	{
   		let nbZone = (this.x * this.y) / this.nbPlayers;
   		console.log('nbZone : ' + nbZone);
   		let zoneX = Math.ceil(Math.sqrt(nbZone));
   		let zoneY = Math.ceil(Math.sqrt(nbZone));
   		let maxZone = Math.floor(((this.x + this.y) / 2) / 3);
  		if (zoneX > maxZone)
  			zoneX = maxZone;
  		if (zoneY > maxZone)
  			zoneY = maxZone;
   		console.log('zoneX : ' + zoneX + ' zoneY : ' + zoneY);
   		//alert('nbPlayers : ' + this.nbPlayers + ' Zone x : ' + zoneX + ' Zone y : ' + zoneY);
   		
   		/* An origin is a corner of the map. In order to set start point as equaly as possible,
   		this algorithm need to put start point since the origin to next zone again and again until
   		maxPlayersPerOrigin is done */
   		let maxPlayersPerOrigin = Math.ceil(this.nbPlayers / 4);
   		console.log('Max players per origine : ' + maxPlayersPerOrigin);
   		let origin = new Array();
   		origin[0] = '0:0:+:+';
   		origin[1] = this.x + ':' + this.y + ':-:-';
   		origin[2] = this.x + ':0:-:+';
   		origin[3] = '0:' + this.y + ':+:-';
   		let tabPos = new Array();
   		tabPos[0] = '0:0';
   		tabPos[1] = '1:0';
   		tabPos[2] = '0:1';
   		tabPos[3] = '2:0';
   		tabPos[4] = '1:1';
   		tabPos[5] = '0:2';
   		tabPos[6] = '2:1';
   		tabPos[7] = '1:2';
   		//alert('Max player per origin : ' + maxPlayersPerOrigin);
   		let startPointDone = 0;
   		for (let i = 0; i < 4 && startPointDone < this.nbPlayers; i++)
   			for (let j = 0; j < maxPlayersPerOrigin && startPointDone < this.nbPlayers; j++)
   			{   				
   				let tmpTab = origin[i].split(':');
   				let tmpPos = tabPos[j].split(':');
   				//console.log('tmpPosX : ' + tmpPos[0] + ' tmpPosY : ' + tmpPos[1]);
   				let originX = 0;
   				let originY = 0;
   				if (tmpTab[2] == '-')
	   				originX = parseInt(tmpTab[0]) - parseInt(tmpPos[0]) * zoneX;
	   			else
	   				originX = parseInt(tmpTab[0]) + parseInt(tmpPos[0]) * zoneX;
	   			if (tmpTab[3] == '-')
   					originY = parseInt(tmpTab[1]) - parseInt(tmpPos[1]) * zoneY;
   				else
   					originY = parseInt(tmpTab[1]) + parseInt(tmpPos[1]) * zoneY;
   				console.log('Current game state : Origin : ' + i + ' player : ' + j + ' originX : ' + originX + ' originY : ' + originY);
   				this.tabStartPoint.push(this.calculRandomCoordinate(originX, originY, tmpTab[2], tmpTab[3], zoneX, zoneY));
   				startPointDone++;
   			}
   	}

	chooseRandomCaseNear(tabCasesNear) // tabCasesNear == TCN in name of variables
	{
		let lengthTCN = tabCasesNear.length;
		let tabFinalToChoose = new Array();
		for (let i = 0; i < lengthTCN; i++)
			if (tabCasesNear[i][0] < parseInt(this.x) && tabCasesNear[i][0] >= 0)
				if (tabCasesNear[i][1] < parseInt(this.y) && tabCasesNear[i][1] >= 0)
					tabFinalToChoose.push(tabCasesNear[i]);
		console.log(tabFinalToChoose);
		let finalLength = tabFinalToChoose.length;
		let firstRandomCase = Math.floor(Math.random() * finalLength);
		console.log('random case : ' + tabFinalToChoose[firstRandomCase]);
		let x = tabFinalToChoose[firstRandomCase][0];
		let y = tabFinalToChoose[firstRandomCase][1]
		let caseMap = this.map[x][y];
		if (caseMap.type != 'empty')
			caseMap.type = "empty";
		let secondRandomCase;
		let otherCoordinates = new Array();
		let posiNeg = new Array(-1, 1);
		if (lengthTCN == 4)
		{
			for (let i = 0; i < finalLength; i++)
				if (x != tabFinalToChoose[i][0] && y != tabFinalToChoose[i][1])
					otherCoordinates.push(tabFinalToChoose[i]);
			secondRandomCase = Math.floor(Math.random() * otherCoordinates.length);
			caseMap = this.map[otherCoordinates[secondRandomCase][0]][otherCoordinates[secondRandomCase][1]];
			if (caseMap.type != 'empty')
				caseMap.type = 'empty';
			console.log('case one');
		}
		else if (tabCasesNear[0][1] == tabCasesNear[1][1])
		{
			if (y == 0)
				y++;
			else if (y == parseInt(this.y) - 1)
				y--;
			else
				y = y + posiNeg[Math.floor(Math.random() * 2)];
			caseMap = this.map[x][y];
			if (caseMap.type != 'empty')
				caseMap.type = 'empty';
			console.log('case two');
		}
		else
		{
			if (x == 0)
				x++;
			else if (x == parseInt(this.x) - 1)
				x--;
			else
				x = x + posiNeg[Math.floor(Math.random() * 2)];
			caseMap = this.map[x][y];
			if (caseMap.type != 'empty')
				caseMap.type = 'empty';
			console.log('case three');
		}
	}

	setNearCases(x, y)
	{
		let tabPos = new Array();
		x = parseInt(x);
		y = parseInt(y);
		if (x > 0 && y > 0) // Add to tabPos left-top corner
		{
			tabPos.push(new Array(x - 1, y - 1)); // Left-top case
			tabPos.push(new Array(x, y - 1)); // Top case
			tabPos.push(new Array(x - 1, y)); // Left case
		}
		else if (x > 0 && y == 0) // Add to tabPos left-bottom corner
		{
			tabPos.push(new Array(x - 1, y + 1)); // Left-bottom case
			tabPos.push(new Array(x, y + 1)); // Bottom case
			tabPos.push(new Array(0, 0));
		}
		else if (x == 0 && y > 0) // Add to tabPos right-top corner
		{
			tabPos.push(new Array(x + 1, y - 1)); // Right-top case
			tabPos.push(new Array(0, 0));
			tabPos.push(new Array(x + 1, y)); // Right case
		}
		else // Add to tabPos right-bottom corner
		{
			tabPos.push(new Array(x + 1, y + 1)); // Right-bottom case
			tabPos.push(new Array(0, 0));
			tabPos.push(new Array(0, 0));
		}
		console.log(tabPos);
		if (this.map[tabPos[0][0]][tabPos[0][1]].type == "block") // case one
			this.chooseRandomCaseNear(new Array(new Array(x, y - 1), new Array(x + 1, y), new Array(x, y + 1), new Array(x - 1, y)));
		else if (this.map[tabPos[1][0]][tabPos[1][1]].type == "block") // case two
			this.chooseRandomCaseNear(new Array(new Array(x - 1, y), new Array(x + 1, y)));
		else // case three
			this.chooseRandomCaseNear(new Array(new Array(x, y - 1), new Array(x, y + 1)));
	}

	loadStartPoints(item, player)
	{
		let tmpTab = item.split(':');
		let itemX = tmpTab[0];
		let itemY = tmpTab[1];
		this.map[itemY][itemX].type = 'empty';
		this.setNearCases(itemY, itemX);
		this.tabBomberman.push(new Bomberman(player, itemY, itemX, this));
	}

   	loadMap()
   	{
   		this.tabStartPoint;
   		for (let i = 0; i < this.x; i++)
   			for (let j = 0; j < this.y; j++)
   				this.map[i][j] = this.classicRandomLoading(i, j);
   		this.setStartPoints();
   		console.log(this.tabStartPoint);
   		let length = this.tabStartPoint.length;
   		shuffle(this.playerTab);
   		for (let i = 0; i < length; i++)
   			this.loadStartPoints(this.tabStartPoint[i], this.playerTab[i]);
   	}

   	getBombByPos(x, y)
    {
        let length = this.bombTab.length;
        for (let i = 0; i < length; i++)
            if (this.bombTab[i].x == x && this.bombTab[i].y == y)
                return this.bombTab[i];
        return null;
    }

   	getBomberByPos(x, y)
   	{
   		let length = this.tabBomberman.length;
   		//console.log('nbBombers : ' + length);
   		let pos = new Array(x, y);
   		let result = new Array();
   		for (let i = 0; i < length; i++)
   		{
   			let gPos = this.tabBomberman[i].getPos();
   			if (pos[0] == gPos[0] && pos[1] == gPos[1])
   				result.push(this.tabBomberman[i]);
   		}
   		if (result.length > 0)
   			return result;
   		return null;
   	}
   	
   	getBomberByName(player)
   	{
   		let length = this.tabBomberman.length;
   		for (let i = 0; i < length; i++)
   		{
   			if (this.tabBomberman[i].player == player)
   				return this.tabBomberman[i];
   		}
   	}
   	
   	drawMap()
   	{
   		let html = '';
   		let playerHtml = '';
   		let nameTab = new Array();
   		let samePseudoNbTab = new Array();
   		
   		html += '<table>';
   		for (let i = 0; i < this.x; i++)
   		{
   			html += '<tr>';
   			for (let j = 0; j < this.y; j++)
   			{
   				html += '<td class="' + this.map[i][j].drawCase() + '" id="case' +  i +  '_' + j + '">';
   				let bomber = this.getBomberByPos(i, j);
   				if (bomber != null)
   					for (let k = 0; k < bomber.length; k++)
	   					if (bomber[k].player == pseudoSession)
	   						playerHtml += '<span class="bomber" id="' + bomber[k].player + '"><img src="' + bgBottom.src + '" /></span>';
	   					else
						{
							let index = nameTab.indexOf(bomber[k].player);
							if (index == -1)
							{
								nameTab.push(bomber[k].player);
								samePseudoNbTab.push(0);
							}
							else
							{
								samePseudoNbTab[index]++;
								bomber[k].player += ' (' + samePseudoNbTab[index].toString() + ')';
							}
			   				html += '<span class="bomber" id="' + bomber[k].player + '"><img src="../game/images/bomberman/bombermanBottomBase.png" /></span>'; /* TODO : See if we have also preloaded img ! */
						}
			   	html += playerHtml;
			   	playerHtml = '';
	   			html += '</td>';
   			}
   			html += '</tr>';
   		}
   		html +='</table>';
   		return html;
   	}
   	
   	drawPlayers()
   	{
   		let length = this.tabBomberman.length;
   		let divPlayerContent = '';
   		for (let i = 0; i < length; i++)
   		{
   			let bomber = this.tabBomberman[i];
   			divPlayerContent += bomber.player;
   			if (bomber.alive)
   				divPlayerContent += ' est en vie<br />X : ' + bomber.x + ', Y : ' + bomber.y;
   			else
   				divPlayerContent += ' est mort ...';
   			divPlayerContent += '<hr /><br />';
   		}
   		return divPlayerContent;
   	}
}

function verifyPossibleMove(bomberman, nextX, nextY)
{
	let map = bomberman.map;
	if (bomberman.alive == true)
		if (nextX >= 0 && nextX < map.x && nextY >= 0 && nextY < map.y)
			if (map.map[nextX][nextY].type == 'empty')
				if (!map.map[nextX][nextY].isBomb)
					return true;
	return false;
}

function getAction(event)
{
	// Don't forget condition for bomberman if they can move or not !!!
	/*
	* 
	* We have a problem when we re-draw the map. May be we need let cssX and cssY in this function but we
	* need to let the animation work before redraw map ! Else we have the impression the bomberman
	* teleport itself case by case ... It need to give the impression to move !
	* --> For this problem the display is almost correct. We have an impression of 'slow motion' wich break
	* the fluidity of the game (look next comment in this comment block)
	* 
	* 
	* Other problem : if we re-draw the map with new bomber position, we will have the impression they are
	* teleported. We need a list to movements to apply in client for the fluid display (almost solved. See
	* the previous comment in this comment block)
	* 
	* 
	* 
	*/
	// TODO may be we have again some problems with collisons and may be positions of the bomberman ... or not ?
	let spanBomberman = document.getElementById(pseudoSession);
	spanBomberman.style.zIndex = '2';
	let bomberman = Map.getBomberByName(pseudoSession);
	if (!bomberman.alive)
		return;
	console.log(event.keyCode);
	let key = event.keyCode;
	let pairing = 0;
	if (key == 38 || key == 90) // top arrow or z letter
	{
		spanBomberman.innerHTML = '';
		spanBomberman.appendChild(bgTop);
		bomberman.direction = 'bomberTop';
		let id = setInterval(goTop, INTERVAL);
		function goTop()
		{
			if (!verifyPossibleMove(bomberman, bomberman.x - 1, bomberman.y))
				return clearInterval(id);
			else if (cssX % 64 == 0 && bool)
			{
				console.log('go top');
				spanBomberman.innerHTML = '';
				spanBomberman.appendChild(bgTop);
				bomberman.x -= 1;
				pairing = 0;
				clearInterval(id);
                bool = false;
			}
			else
			{
				cssX -= ANIMATION_SPEED;
				//console.log('cssX : ' + cssX);
				spanBomberman.style.top = cssX.toString() + "px";
				spanBomberman.innerHTML = '';
				if (pairing >= 0 && pairing < 32)
					spanBomberman.appendChild(bgTopLeftFoot);
				else
					spanBomberman.appendChild(bgTopRightFoot);
				bool = true;
				pairing++;
			}
		}
	}
	else if (key == 40 || key == 83) // bottom arrow or s letter
	{
		spanBomberman.innerHTML = '';
		spanBomberman.appendChild(bgBottom);
		bomberman.direction = 'bomberBottom';
		let id = setInterval(goBottom, INTERVAL);
		function goBottom()
		{
			if (!verifyPossibleMove(bomberman, bomberman.x + 1, bomberman.y))
				return clearInterval(id);
            else if (cssX % 64 == 0 && bool)
			{
				console.log('go bottom');
				spanBomberman.innerHTML = '';
				spanBomberman.appendChild(bgBottom);
				bomberman.x += 1;
				pairing = 0;
				clearInterval(id);
                bool = false;
			}
			else
			{
				cssX += ANIMATION_SPEED;
				//console.log('cssX : ' + cssX);
				spanBomberman.style.top = cssX.toString() + "px";
				spanBomberman.innerHTML = '';
				if (pairing >= 0 && pairing < 32)
					spanBomberman.appendChild(bgBottomLeftFoot);
				else
					spanBomberman.appendChild(bgBottomRightFoot);
				bool = true;
				pairing++;
			}
		}
	}
	else if (key == 37 || key == 81) // left arrow or q letter
	{
		spanBomberman.innerHTML = '';
		spanBomberman.appendChild(bgLeft);
		bomberman.direction = 'bomberLeft';
		let id = setInterval(goLeft, INTERVAL);
		function goLeft()
		{
			if (!verifyPossibleMove(bomberman, bomberman.x, bomberman.y - 1))
				return clearInterval(id);
            else if (cssY % 64 == 0 && bool)
			{
				console.log('go left');
				spanBomberman.innerHTML = '';
				spanBomberman.appendChild(bgLeft);
				bomberman.y -= 1;
				pairing = 0;
				clearInterval(id);
                bool = false;
			}
			else
			{
				cssY -= ANIMATION_SPEED;
				//console.log('cssY : ' + cssY);
				spanBomberman.style.left = cssY.toString() + "px";
				spanBomberman.innerHTML = '';
				if (pairing >= 0 && pairing < 32)
					spanBomberman.appendChild(bgLeftLeftFoot);
				else
					spanBomberman.appendChild(bgLeftRightFoot);
				bool = true;
				pairing++;
			}
		}
	}
	else if (key == 39 || key == 68) // right arrow or d letter
	{
		spanBomberman.innerHTML = '';
		spanBomberman.appendChild(bgRight);
		bomberman.direction = 'bomberRight';
		let id = setInterval(goRight, INTERVAL);
		function goRight()
		{
			if (!verifyPossibleMove(bomberman, bomberman.x, bomberman.y + 1))
				return clearInterval(id);
            else if (cssY % 64 == 0 && bool)
			{
				console.log('go right');
				spanBomberman.innerHTML = '';
				spanBomberman.appendChild(bgRight);
				bomberman.y += 1;
				pairing = 0;
				clearInterval(id);
                bool = false;
			}
			else
			{
				cssY += ANIMATION_SPEED;
				//console.log('cssY : ' + cssY);
				spanBomberman.style.left = cssY.toString() + "px";
				spanBomberman.innerHTML = '';
				if (pairing >= 0 && pairing < 32)
					spanBomberman.appendChild(bgRightLeftFoot);
				else
					spanBomberman.appendChild(bgRightRightFoot);
				bool = true;
				pairing++;
			}
		}
	}
	else if (key == 32 || key == 13) // space or enter
	{
		if (!bomberman.map.map[bomberman.x][bomberman.y].isBomb && bomberman.maxBombs > 0) {
			console.log('put bomb');
			bomberman.putBomb();
			setTimeout(reloadListener, TIME_TO_RELOAD / 10);
			return;
		}
	}
	else // all other control
		console.log('do nothing');
		
	function reloadListener()
	{
		document.addEventListener('keydown', getAction, {once : true});
	}
	setTimeout(reloadListener, TIME_TO_RELOAD);
    console.log('Pos X : ' + bomberman.x);
    console.log('Pos Y : ' + bomberman.y);
}


let main = document.getElementById('main');
let divPlayer = document.getElementById('playerList');
let postBrut = main.innerHTML;
let tab = postBrut.split(' | ');
let length = tab.length;
let postTab = [];
let playerTab = [];
let j = 1;
let nbPlayers = 0;

tab.pop();

for (let i = 0; i < length - 1; i++)
{
	let tmpTab = tab[i].split(' : ');
	postTab[tmpTab[0]] = tmpTab[1];
	if (tmpTab[0] == 'nbPlayers')
		nbPlayers = parseInt(tmpTab[1]);
	if (tmpTab[0] == 'p' + j && j <= nbPlayers)
	{
		playerTab.push(tmpTab[1]);
		j++;
	}
}

main.innerHTML = "";

/* verification */
for(var key in postTab)
{
  var value = postTab[key];
  console.log(key + " = " + value);
}

/* Don't forget to set all elements of the game before launch the game (by exampe a waitting screen in order to wait other humans players) */

let waitingForPlayers = '<div>En attente des joueurs ...</div>';
let nbHumanPlayers = 0;
for (let i = 0; i < nbPlayers; i++)
{
	waitingForPlayers += '<div id="' + playerTab[i] + '">' + playerTab[i] + '</div>';
	if (playerTab[i] == 'Joueur')
		nbHumanPlayers++;
}

console.log(playerTab);

let connectedPlayers = [];

let pseudoSession = 'Nagrarok'; // TODO see the next comment !

connectedPlayers.push(pseudoSession); // Test line, TODO delete it after the system will be correctly coded !
// Normally we get session with ajax call and we put it also with ajax into the good php file wich it will be read by ajax call in drawScreen in order to now if all players are connected !

let connectedLength = 0;

let ID = null;


let Map = new MapGenerator(postTab, playerTab, connectedPlayers);
Map.loadMap();

let bgTop = new Image();
bgTop.src = '../game/images/bomberman/bombermanTopMain.png';
let bgTopLeftFoot = new Image();
bgTopLeftFoot.src = '../game/images/bomberman/bombermanTopMainLeftFoot.png';
let bgTopRightFoot = new Image();
bgTopRightFoot.src = '../game/images/bomberman/bombermanTopMainRightFoot.png';
let bgBottom = new Image();
bgBottom.src = '../game/images/bomberman/bombermanBottomMain.png';
let bgBottomLeftFoot = new Image();
bgBottomLeftFoot.src = '../game/images/bomberman/bombermanBottomMainLeftFoot.png';
let bgBottomRightFoot = new Image();
bgBottomRightFoot.src = '../game/images/bomberman/bombermanBottomMainRightFoot.png';
let bgLeft = new Image();
bgLeft.src = '../game/images/bomberman/bombermanLeftMain.png';
let bgLeftLeftFoot = new Image();
bgLeftLeftFoot.src = '../game/images/bomberman/bombermanLeftMainLeftFoot.png';
let bgLeftRightFoot = new Image();
bgLeftRightFoot.src = '../game/images/bomberman/bombermanLeftMainRightFoot.png';
let bgRight = new Image();
bgRight.src = '../game/images/bomberman/bombermanRightMain.png';
let bgRightLeftFoot = new Image();
bgRightLeftFoot.src = '../game/images/bomberman/bombermanRightMainLeftFoot.png';
let bgRightRightFoot = new Image();
bgRightRightFoot.src = '../game/images/bomberman/bombermanRightMainRightFoot.png';

let cssX = 0;
let cssY = 0;
let bool = false;
document.addEventListener('keydown', getAction, {once : true});

function explodeBombs()
{
	let length = Map.bombTab.length;
	for (let i = 0; i < length; i++)
	{
		let bombObject = Map.bombTab[i];
		if (typeof(bombObject) !== 'undefined')
		{
			console.log(bombObject);
			bombObject.bomb.duration--;
			console.log(bombObject.bomb.duration);
            let bombSpan = document.getElementById(bombObject.id);
			if (bombObject.bomb.duration == 0)
				bombObject.bomb.explode(bombObject);
			else if (bombObject.bomb.duration <= BOMB_DURATION / 2 && bombObject.bomb.duration > 1)
                bombObject.bomb.img = bombObject.bomb.imgTwo;
			else if (bombObject.bomb.duration == 1)
                bombObject.bomb.img = bombObject.bomb.imgThree;
			else
				bombObject.bomb.img = bombObject.bomb.imgOne;
            bombSpan.innerHTML = '';
            bombSpan.appendChild(bombObject.bomb.img);
		}
	}
}

function recurrentFunctions()
{
	divPlayer.innerHTML = Map.drawPlayers();
	explodeBombs();
}

function drawScreen()
{
	if (connectedLength < nbHumanPlayers)
	{
		main.innerHTML = waitingForPlayers;
		// get $_SESSION['pseudo'] with ajax callback add put in into connectedPlayers (with .push)
		// May be when we arrive in the play context, php function send $_SESSION['pseudo'] to a file wich will get by ajax in order to set players correctly
		connectedLength = connectedPlayers.length;
		console.log(connectedLength + ' : ' + nbHumanPlayers);
	}
	else
	{
		/* setInterval ou setTimeout pour lancer et relancer l'affichage de la map, histoire d'éviter de faire une boucle infinie */
		main.innerHTML = Map.drawMap();
		/* TODO write map in "php" file and read it in order to display it */
		/* Plus again ! We need to get a list of actions (by others bombermans and display it here in order to keep fluidity for the game. May be we will have a problem of synchronicity between each client per rapport to the server, mostly if one player is disconnected. Two option : he can't reconnected or he can. In this second case we will have a difficult to keep synchronicity ... */
		clearInterval(mainId); // it must stay here, we don't need to redraw the map !
		setInterval(recurrentFunctions, 600);
	}
}

mainId = setInterval(drawScreen, 320); // TODO set the good time in ms for redraw map !