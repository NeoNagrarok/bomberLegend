<?php

include_once 'libs/forms.php';
include_once 'game/glibs/Ia.php';

$this->context = '';

$nav = '<nav class="mainNav"><a href="' . $this->prev . 'menu">Retour</a></nav>';

$header = '<header>' . $nav . '</header>';

$main = '<main><form id="mainForm" action="' . $this->prev . 'play/" method="post">

		<section class="map">
			<h2>
				Map
			</h2>
			<h3>
				Taille
			</h3>
			<label for="size">Taille</label>
			<select name="size" id="size">
				<option selected disabled>Choisir</option>
				<optgroup label="Carrés">
					<option value="verySmallSquare">Très petit (5x5)</option>
					<option value="smallSquare">Petit (15x15)</option>
					<option value="normalSquare">Normal (27x27)</option>
					<option value="bigSquare">Grand (51x51)</option>
					<option value="veryBigSquare">Très grand (99x99)</option>
				</optgroup>
				<optgroup label="Rectangle">
					<option value="verySmallRect">Très petit (3x11)</option>
					<option value="smallRect">Petit (6x21)</option>
					<option value="normalRect">Normal (12x41)</option>
					<option value="bigRect">Grand (24x81)</option>
					<option value="veryBigRect">Très grand (48x161)</option>
				</optgroup>
				
			</select>
			<h3>
				Matériaux
			</h3>
			<label for="stone" title="Matériaux par défaut">Roche</label><input type="checkbox" id="stone" name="stone" checked="true" />
			<label for="sand" title="Les explosions passent au travers">Sable</label><input type="checkbox" id="sand" name="sand" />
			<label for="granite" title="Résiste à plusieurs explosions">Granit</label><input type="checkbox" id="granite" name="granite" />
			<label for="explosive" title="Explosent une deuxième fois">Explosif</label><input type="checkbox" id="explosive" name="explosive" />
			<h3>
				Type
			</h3>
			<label for="random">Aléatoire</label><input type="radio" id="random" name="mapType" value="random" checked />
			<label for="defined">Prédéfinie</label><input type="radio" id="defined" name="mapType" value="defined" disabled /><!-- TO DO make a defined list of maps ! -->
		</section>
		
		<section class="players">
			<h2>
				Players
			</h2>
			<h3>
				Participants
			</h3>
			<label for="nbPlayers">Nombre</label>
			' . makeSelectNumbers('nbPlayers', 'nbPlayers', 2, 30, 2) . '
			<h3>
				IAs
			</h3>
			' . makeSelectRange(1, 30, Ia::$level, "Joueur", "Joueur ") . '
		</section>
		
		<section class="bonus">
			<h2>
				Bonus
			</h2>
				<label for="speed">Vitesse</label>
				<input type="checkbox" name="speed" id="speed" /><br />
				<label for="nbBombs">Nombre de bombes</label>
				<input type="checkbox" name="nbBombs" id="nbBombs" /><br />
				<label for="lives">Vies</label>
				<input type="checkbox" name="lives" id="lives" /><br />
				<label for="rangeBombs">Portée des bombes</label>
				<input type="checkbox" name="rangeBombs" id="rangeBombs" /><br />
				<label for="pushBombs">Pousser les bombes</label>
				<input type="checkbox" name="pushBombs" id="pushBombs" /><br />
				<label for="manyBombs">Mettre plusieurs bombes en un coup</label>
				<input type="checkbox" name="manyBombs" id="manyBombs" /><br />
				<label for="commandBombs">Bombes à explosion commandées</label>
				<input type="checkbox" name="commandBombs" id="commandBombs" /><br />
				<label for="multyBoom">Bombes qui explosent plusieurs fois</label>
				<input type="checkbox" name="multyBoom" id="multyBoom" /><br />
			
		</section>
		
		<section class="malus">
			<h2>
				Malus
			</h2>
			<label for="slow">Perte de vitesse</label>
			<input type="checkbox" name="slow" id="slow" /><br />
			<label for="noBombs">Incapacité à poser une bombe</label>
			<input type="checkbox" name="noBombs" id="noBombs" /><br />
			<label for="tinyBombs">Diminution totale de la portée des bombes</label>
			<input type="checkbox" name="tinyBombs" id="tinyBombs" /><br />
		</section>
		
		<section class="misc">
			<h2>
				Misc
			</h2>
			Durée :
			<label for="yesDuration">Oui</label>
			<input type="radio" name="duration" id="yesDuration" value="yes" />
			<label for="noDuration">Non</label>
			<input type="radio" name="duration" id="noDuration" value="no" checked /><br />
			<label for="nbRound">Nombre de manches gagnantes</label>
			' . makeSelectNumbers('nbRound', 'nbRound', 1, 3, 1) . '<br />
			<span id="superBomber">Super bomberman :
			<label for="yesSuper">Oui</label>
			<input type="radio" name="superBomber" id="yesSuper" value="yes" />
			<label for="noSuper">Non</label>
			<input type="radio" name="superBomber" id="noSuper" value="no" checked /><br /></span>
			Revanche :
			<label for="yesRevange">Oui</label>
			<input type="radio" name="revange" id="yesRevange" value="yes" /><br />
			Brouillard de guerre :
			<label for="yesMist">Oui</label>
			<input type="radio" name="mist" id="yesMist" value="yes" />
			<label for="noMist">Non</label>
			<input type="radio" name="mist" id="noMist" value="no" checked /><br />
		</section>
		</form></main>';

$footer = '<footer>
			<input type="submit" value="Créer partie" form="mainForm" />
		</footer>';

$this->metaTitle = ' - Création de partie';
$this->metaDescription = 'Choisissez les paramètres de la partie que vous voulez créer.';
$this->metaStyle = $this->prev . 'css/gameCreate.css';

$this->script = $this->prev . 'game/createScript.js';

$this->context = $header . $main . $footer;

?>
