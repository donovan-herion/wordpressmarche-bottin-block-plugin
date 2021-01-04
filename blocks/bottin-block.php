<?php

/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package bottin-block-plugin
 */

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function bottin_block_block_init()
{
	// Skip block registration if Gutenberg is not enabled/merged.
	if (!function_exists('register_block_type')) {
		return;
	}
	$dir = dirname(__FILE__);

	$index_js = 'bottin-block/build/index.js';
	wp_register_script(
		'bottin-block-block-editor',
		plugins_url($index_js, __FILE__),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-editor',
			'wp-components',
		),
		filemtime("$dir/$index_js")
	);

	$editor_css = 'bottin-block/editor.css';
	wp_register_style(
		'bottin-block-block-editor',
		plugins_url($editor_css, __FILE__),
		array(),
		filemtime("$dir/$editor_css")
	);

	$style_css = 'bottin-block/style.css';
	wp_register_style(
		'bottin-block-block',
		plugins_url($style_css, __FILE__),
		array(),
		filemtime("$dir/$style_css")
	);

	function block_dynamic_render_cb($att)
	{
		$bottin_societe = $att['bottinSociete'];

		// var_dump($att['ficheObj']);

		$email = $att['ficheObj']['email'];
		$fax = $att['ficheObj']['fax'];
		$gsm = $att['ficheObj']['gsm'];

		$html = "<h1>$bottin_societe</h1> <p>$email</p> <p>$fax</p> <p>$gsm</p>";

		return $html;
	}

	register_block_type('bottin-block-plugin/bottin-block', array(
		'editor_script' => 'bottin-block-block-editor',
		'editor_style'  => 'bottin-block-block-editor',
		'style'         => 'bottin-block-block',
		'attributes'	=> 	[
			'bottinSociete' => ['type' => 'string'],
			'ficheObj' => ['type' => 'object']
		],
		'render_callback' => 'block_dynamic_render_cb'
	));
}




add_action('init', 'bottin_block_block_init');
