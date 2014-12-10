
<?php
    $production = false;
    $theme = get_template_directory_uri();

    // if we're in production mode, include minified concatenated script
    // if not then pull them in unminified individually for easier debugging
    if ($production) {

        echo '<script src ="' . $theme . '/js/production.js"></script>';

    } else {


        echo '<script src ="' . $theme . '/js/bower/jquery/dist/jquery.js"></script>';
        echo '<script src ="' . $theme . '/js/bower/gsap/src/uncompressed/plugins/CSSPlugin.js"></script>';
        echo '<script src ="' . $theme . '/js/bower/gsap/src/uncompressed/jquery.gsap.js"></script>';
        echo '<script src ="' . $theme . '/js/bower/gsap/src/uncompressed/TweenMax.js"></script>';
        echo '<script src ="' . $theme . '/js/bower/gsap/src/uncompressed/TimelineMax.js"></script>';
        echo '<script src ="' . $theme . '/js/project.js"></script>';

    }
?>
<?php wp_footer(); ?>


</body>
</html>
