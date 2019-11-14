<?php

/*include_once 'libs/parser/parser.php';
include_once 'libs/menu/menu.php';
include_once 'libs/admin/admin.php';*/

class RequestHandler
{
	public function __construct()
	{
		$basepath = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)) . '/';
		$this->route = substr($_SERVER['REQUEST_URI'], strlen($basepath));
		$this->getParameters = '';
		if (strstr($this->route, '?'))
		{
			$this->getParameters = substr($this->route, strpos($this->route, '?') + 1, strlen($this->route));
			$this->route = substr($this->route, 0, strpos($this->route, '?'));
		}
		$this->route = '/' . trim($this->route, '/');
		$this->routeTab = array();
		$routes = explode('/', $this->route);
		$this->prev = '';
		foreach($routes as $route)
		{
			if(trim($route) != '')
			{
				array_push($this->routeTab, $route);
				$this->prev .= '../';
			}
		}
	}

	public function getRouteTab()
	{
		return $this->routeTab;
	}

	public function getPrev()
	{
		return $this->prev;
	}
	
	public function pushContext($condition, $localisation)
	{
		$this->contextList[$condition] = $localisation;
	}
	
	public function getContext($condition)
	{
		include_once 'defaultMeta.php'; // Out of context
		if (isset($this->contextList[$condition]))
			include_once $this->contextList[$condition];
		else
			include_once 'mainContext.php';
		return $this->context;
	}
	
	public function getMetaTitle()
	{
		return $this->metaTitle;
	}
	
	public function getMetaDescription()
	{
		return $this->metaDescription;
	}
	
	public function getMetaStyle()
	{
		return $this->metaStyle;
	}
	
	public function getScript()
	{
		if (isset($this->script))
			return '<script src="' . $this->script . '"></script>';
		return '';
	}

	private $route;
	private $getParameters;
	private $routeTab;
	private $prev;
	private $contextList;

	private $context;
	private $metaTitle;
	private $metaDescription;
	private $metaStyle;
	
	private $script;
}

?>
