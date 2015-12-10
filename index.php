<?php get_header(); ?>
<div class="party">
    <div class="bg"></div>
    <div class="bg bgoriginal"></div>

    <div class="timer-outer-wrapper">
        <div class="timer-wrapper">
            <div class="timer"></div>
        </div>
    </div>

    <div class="bird"></div>

    <div class="outer-machine">
        <div class="machine">
            <div class="inner" id="inner">
                <?php
                    $args = array('numberposts' => 8, 'category' => '2', 'orderby' => 'rand');
                    $lastposts = get_posts( $args );
                    foreach($lastposts as $post) : setup_postdata($post);
                ?>

                    <?php if (has_post_thumbnail( $post->ID ) ): ?>
                    <?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
                        <div class="panel" style="background-image: url('<?php echo $image[0]; ?>')" data-name="<?php the_title(); ?>"></div>
                    <?php endif; ?>

                <?php
                    endforeach;
                    wp_reset_query();
                ?>
            </div>
            <div class="mask"></div>
        </div>
        <div class="light"></div>
        <div class="light light2"></div>
        <div class="light light3"></div>
        <div class="light light4"></div>
        <div class="light light5"></div>
    </div>

    <div class="pole"></div>

    <div class="winner"></div>

    <div class="choice"></div>
    <button class="choice-shot" data-action="shot"></button>
    <button class="choice-dare" data-action="dare"></button>

    <div class="flames"></div>

    <?php
        $args = array('numberposts' => 1, 'category' => '4', 'orderby' => 'rand');
        $lastposts = get_posts( $args );
        foreach($lastposts as $post) : setup_postdata($post);
    ?>
        <div class="the-dare" style="background-image:url(<?php bloginfo('template_url'); ?>/img/dareSkull.png);">
            <div class="text">
                <?php the_title(); ?>
            </div>
        </div>
    <?php
        endforeach;
        wp_reset_query();
    ?>

    <?php
        $args = array('numberposts' => 1, 'category' => '3', 'orderby' => 'rand');
        $lastposts = get_posts( $args );
        foreach($lastposts as $post) : setup_postdata($post);
    ?>
        <div class="the-shot" style="background-image:url(<?php bloginfo('template_url'); ?>/img/shotglass.png);">
            <div class="text">
                SHOT!<br>
                <?php the_title(); ?>
            </div>
        </div>
    <?php
        endforeach;
        wp_reset_query();
    ?>

    <div class="spotlight"></div>

    <div class="sprite-test"></div>

    <div class="reset"></div>

    <audio id="horn" src="<?php bloginfo('template_url'); ?>/audio/horn.mp3"></audio>
    <audio id="machine" src="<?php bloginfo('template_url'); ?>/audio/machine.mp3"></audio>
    <audio id="pop1" src="<?php bloginfo('template_url'); ?>/audio/pop1.mp3"></audio>
    <audio id="pop2" src="<?php bloginfo('template_url'); ?>/audio/pop2.mp3"></audio>
    <audio id="clap" src="<?php bloginfo('template_url'); ?>/audio/clap.mp3"></audio>
    <div class="bg bgmask"></div>
</div>

<?php get_footer(); ?>
