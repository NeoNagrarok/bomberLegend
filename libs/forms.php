<?php

include_once 'libs/tools.php';

function makeSelectNumbers($name, $id, $min, $max, $default)
{
	$select = '<select name="' . $name . '" id="' . $id . '">';

	$min = getMin($min, $max);
	$max = getMax($min, $max);

	for ($i = $min; $i <= $max; $i++)
		if ($i == $default)
			$select .= '<option value="' . $i . '" selected>'
				. $i . '</option>';
		else
			$select .= '<option value="' . $i . '">' . $i . '</option>';
	$select .= '</select>';
	return $select;
}

function makeSelectRange($min, $max, $tab, $default, $label)
{
	$min = getMin($min, $max);
	$max = getMax($min, $max);
	$result = '';
	
	for ($i = $min; $i <= $max; $i++)
	{
		$j = 'p' . $i;
		$result .= makeSelect($j, $j, $tab, $default, $label . $i) . '<br class="hidden" />';
	}
	return $result;
}

function makeSelect($name, $id, $tab, $default, $label)
{
	$select = '<label class="hidden" for="' . $id . '">' . $label . ' </label>';
	$select .= '<select class="hidden" name="' . $name . '" id="' . $id . '">';
	
	foreach ($tab as $value)
		if ($value == $default)
			$select .= '<option value="' . $value . '" selected>'
				. $value . '</option>';
		else
			$select .= '<option value="' . $value . '">' . $value . '</option>';
	
	$select .= '</select>';
	return $select;
}

?>
