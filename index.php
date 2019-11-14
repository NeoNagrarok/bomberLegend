<?php

// note javascript : document.querySelector('body .class #id etc?);

/*
* 
* This project has two objectives :
* First, it allow to work on the concept of context, where each context is independant of any others
* Second, the code design need to be done in two time. We need to create a basic implementation almost like a one page web site or similar thing, but after
* the game was created we certainly need to add more page, more functionnalities like route handler (example: if we have already some pages
* almost hard coded, we must have to keep them in the route handler handling)
* 
*/

?>

<?php
	include_once 'libs/RequestHandler.php';
	$RequestHandler = new RequestHandler();
	$prev = $RequestHandler->getPrev();
	$tabRoute = $RequestHandler->getRouteTab();
?>

<?php
	
	$RequestHandler->pushContext('acceuil', 'mainContext.php');
	$RequestHandler->pushContext('menu', 'game/menuContext.php');
	$RequestHandler->pushContext('create', 'game/createContext.php');
	$RequestHandler->pushContext('play', 'game/playContext.php');
	if (!isset($RequestHandler->getRouteTab()[0]))
		$context = $RequestHandler->getContext('acceuil');
	else
		$context = $RequestHandler->getContext($RequestHandler->getRouteTab()[0]);
	
	// TO DO include game context if we are in other context : if "any data" which define we need to change context then we change effectively the current context. Problematic : what happen if we need to keep some data for the previous context ? May be we can handle it by a file system like a "cache"
	
	include_once 'meta.php'; // template, out of context
?>

<!DOCTYPE html>
<html lang="fr">
	<head>
		<?php echo $meta; ?>
	</head>
	<body>
		<?php echo $context; ?>
		<?php
			echo $RequestHandler->getScript();
		?>
	</body>
</html>
