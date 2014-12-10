<?php

    // stop wordpress from loading it's own version of jQuery
    function wpstarter_custom_js() {
        wp_deregister_script('jquery');
    }
    if (!is_admin()) add_action('wpstarter_enqueue_scripts', 'wpstarter_custom_js', 11);

    // extend this file with www.wpfunction.me

    // Enable thumbnails
    add_theme_support( 'post-thumbnails' );
    set_post_thumbnail_size(200, 200, true); // Normal post thumbnails


    // Remove the admin bar from the front end
    add_filter( 'show_admin_bar', '__return_false' );

?>
