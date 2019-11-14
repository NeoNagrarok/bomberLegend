<?php

include_once 'game/glibs/Ia.php';

$this->context = '';

$nav = '<nav class="mainNav"><a href="' . $this->prev . 'create">Retour</a><div id="playerList"></div></nav>';

$header = '<header>' . $nav . '</header>';

$result = '';

foreach ($_POST as $key => $value)
	$result .= $key . ' : ' . $value . ' | ';

$main = '<main id="main">' . $result . '</main>';

$footer = '<footer><div id="preload"></div></footer>';

$this->metaTitle = ' - Play !';
$this->metaDescription = 'A vos bombes ! Prêt ?! Partez !';
$this->metaStyle = $this->prev . 'css/gamePlay.css';

$this->script = $this->prev . 'game/playScript.js';

$this->context = $header . $main . $footer;
