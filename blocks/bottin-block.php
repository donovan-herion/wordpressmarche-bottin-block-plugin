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
			'wp-components'
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

	register_block_type('bottin-block-plugin/bottin-block', array(
		'editor_script' => 'bottin-block-block-editor',
		'editor_style'  => 'bottin-block-block-editor',
		'style'         => 'bottin-block-block',
		'attributes'	=> 	[
			'bottinSociete' => ['type' => 'string']
		],
		'render_callback' => 'bottin_block_render'
	));
}

function bottin_block_render(array $attributes)
{
	return <<<HTML
	<div>
	completer ici
	</div>
HTML;
}

add_action('init', 'bottin_block_block_init');
