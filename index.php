<?php get_header(); ?>

<div class="party">
    <div class="wrap">
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
    </div>

    <div class="winner"></div>

    <?php
        $args = array('numberposts' => 1, 'category' => '3', 'orderby' => 'rand');
        $lastposts = get_posts( $args );
        foreach($lastposts as $post) : setup_postdata($post);
    ?>

        <div class="dare">Shot or <?php the_title(); ?></div>

    <?php
        endforeach;
        wp_reset_query();
    ?>

    <div class="spotlight"></div>

    <div class="sprite-test"></div>

    <audio id="horn" src="<?php bloginfo('template_url'); ?>/audio/horn.mp3"></audio>
    <audio id="machine" src="<?php bloginfo('template_url'); ?>/audio/machine.mp3"></audio>
</div>

<?php get_footer(); ?>
