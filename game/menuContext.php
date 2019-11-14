<?php

$this->context = '';

$nav = '<nav class="mainNav"><a href="' . $this->prev . '">Retour</a></nav>';

$header = '<header>
				<h1>
					Bomber Legend
				</h1>
			</header>';

$main = '<main>
			<nav>
				<a href="#">Join</a>
				<a href="' . $this->prev . 'create">Create</a>
				<a href=#">Rules</a>
			</nav>
		</main>';

$footer = '<footer>test context</footer>';

$this->metaTitle = ' - Menu principal';
$this->metaDescription = 'A vos bombes ! Prêt ?! Partez !';
$this->metaStyle = $this->prev . 'css/gameMenu.css';

$this->context = $header . $nav . $main . $footer;

?>
