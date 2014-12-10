<?php
    get_header();

        while ( have_posts() ) : the_post(); ?>

        <?php endwhile;

    ?>

<div class="wrap">
    <div class="inner" id="inner">
        <div class="panel" id="panel1"></div>
        <div class="panel" id="panel2"></div>
        <div class="panel" id="panel3"></div>
        <div class="panel" id="panel4"></div>
        <div class="panel" id="panel5"></div>
        <div class="panel" id="panel6"></div>
        <div class="panel" id="panel7"></div>
        <div class="panel" id="panel8"></div>
    </div>
</div>

<?php get_footer(); ?>
