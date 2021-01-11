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

use AcMarche\Bottin\Repository\BottinRepository;

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
		$bottinRepository = new BottinRepository();
		$fiches           = $bottinRepository->getFicheById($att['ficheObj']['id']);
		$societe = $fiches->societe;
		$email = $fiches->email;
		$telephone = $fiches->telephone;
		$localite = $fiches->localite;
		$rue = $fiches->rue;
		$numero = $fiches->numero;
		$website = $fiches->website;
		$slug_fiche = $fiches->slug;
		$current_blog_id = get_current_blog_id();
		$site_url = get_blog_details($current_blog_id)->path;
		$linkToFiche = "https://new.marche.be" . $site_url . "/bottin/fiche/" . $slug_fiche;

		// var_dump($fiches);


		$html = " 
		<h2>$societe</h2>
        <p>$email</p>
        <p>$telephone</p>
        <p>$localite</p>
        <p>$rue</p>
        <p>$numero</p>
        <p>
          <a href='$website' target='_blank'>Site Web</a>
        </p>
        <p>
		  <a href='$linkToFiche' target='_blank'>
            Voir la fiche complete
          </a>
        </p>";

		return $html;
	}

	register_block_type('bottin-block-plugin/bottin-block', array(
		'editor_script' => 'bottin-block-block-editor',
		'editor_style'  => 'bottin-block-block-editor',
		'style'         => 'bottin-block-block',
		'attributes'	=> 	[
			'bottinSociete' => ['type' => 'string'],
			'ficheObj' => ['type' => 'object'],
			'fullVersionChecked' => ['type' => 'boolean']
		],
		'render_callback' => 'block_dynamic_render_cb'
	));
}




add_action('init', 'bottin_block_block_init');
